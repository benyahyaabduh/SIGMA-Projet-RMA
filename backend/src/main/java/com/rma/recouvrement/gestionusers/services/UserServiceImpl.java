package com.rma.recouvrement.gestionusers.services;

import com.rma.recouvrement.gestionusers.dtos.UserCreateDto;
import com.rma.recouvrement.gestionusers.dtos.UserDto;
import com.rma.recouvrement.gestionusers.dtos.UserUpdateDto;
import com.rma.recouvrement.gestionusers.entities.*;
import com.rma.recouvrement.gestionusers.mapper.UserMapper;
import com.rma.recouvrement.gestionusers.pagination.PagedResult;
import com.rma.recouvrement.gestionusers.repositories.CodeGestionUsersRepository;
import com.rma.recouvrement.gestionusers.repositories.GestionIntermediaireRepository;
import com.rma.recouvrement.gestionusers.repositories.RoleRepository;
import com.rma.recouvrement.gestionusers.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private UserMapper userMapper;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper ) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Autowired
    GestionIntermediaireRepository gestionIntermediaireRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    CodeGestionUsersRepository codeGestionUsersRepository;


    private List<Long> getRoleIdsByNature(char nature) {

        List<Long> roleIds = new ArrayList<>();
        switch (Character.toUpperCase(nature)) {
            case 'A':
                roleIds.add(2600L);
                roleIds.add(2604L);
                break;
            case 'B':
                roleIds.add(2721L);
                break;
            case 'C':
                roleIds.add(2725L);
                break;
            case 'W':
                roleIds=roleRepository.findAll()
                        .stream()
                        .map(Role::getIdRole)
                        .collect(Collectors.toList());
                break;

            default:
                throw new IllegalArgumentException("Nature non reconnue : " + nature);

        }

        return roleIds;
    }

    public void affecterRolesParNature(char nature, User user, RoleRepository roleRepository) {
        List<Long> roleIds = getRoleIdsByNature(nature);

        if (!roleIds.isEmpty()) {
            List<Role> roles = roleRepository.findAllById(roleIds);
            user.setRoles(roles);
        }
    }

    public void setPasswordEncoder (User user, GestionIntermediaire gestionIntermediaire){
        if (gestionIntermediaire!= null){
            char nature = gestionIntermediaire.getNature();
            if (nature == 'A' || nature == 'B' || nature == 'C'){
                user.setPwdEncoder("$2a$10$7hyw/fc9u8kS6MMd4p0TW.S5JOmdXg1no4YQJopOB4LLA41KEBMv.");
            }
        }
    }

    public boolean verifierCompteEtIntermediaire(String compteNt, String intermediaire,
                                                 UserRepository userRepo,
                                                 GestionIntermediaireRepository gestionIntermediaireRepo) {
        if (intermediaire == null || intermediaire.length() < 5 ) {
            throw new IllegalArgumentException("Intermédiaire invalide : " + intermediaire);
        }
        // Extraire nature et code
        char nature = Character.toUpperCase(intermediaire.charAt(0));
        String codeStr = intermediaire.substring(intermediaire.length() - 4);

        int code;
        try {
            code = Integer.parseInt(codeStr);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Code invalide dans intermédiaire : " + intermediaire);
        }

        // Vérifier si nature + code existent dans la table REC_SYSCODESGESTIONSINTER
        boolean existe = gestionIntermediaireRepo.existsByNatureAndCode(nature, code);
        if (!existe) {
            throw new IllegalArgumentException("Intermédiaire introuvable : " + nature + " " + code);

        }
        return true;
    }


    private void creerCodeGestionUser(User user, String intermediaire) {
        try {
            // Extraire le code de l'intermédiaire
            String codeStr = intermediaire.substring(intermediaire.length() - 4);
            int code = Integer.parseInt(codeStr);
            char nature = Character.toUpperCase(intermediaire.charAt(0));


            // Vérifier que le GestionIntermediaire existe AVANT de créer CodeGestionUsers
            //Deja Verifier au niv de methode verifierCompteEtIntermediaire
            GestionIntermediaire gestionIntermediaire = gestionIntermediaireRepository
                    .findByNatureAndCode(nature, code)
                    .orElse(null);

            if (gestionIntermediaire == null) {
                System.err.println("GestionIntermediaire non trouvé pour nature: " + nature + ", code: " + code);
                return;
            }

            // Créer l'ID composite
            CodeGestionUsersId id = new CodeGestionUsersId();
            id.setIdUser(user.getIdUser());
            id.setCodeInter(code);

            // Créer l'entité CodeGestionUsers
            CodeGestionUsers codeGestionUsers = new CodeGestionUsers();
            codeGestionUsers.setId(id);
            codeGestionUsers.setUser(user);
            codeGestionUsers.setGestionIntermediaire(gestionIntermediaire); // Utiliser l'entité existante

            // Sauvegarder dans la table de jointure
            codeGestionUsersRepository.save(codeGestionUsers);

            System.out.println("CodeGestionUser créé pour User ID: " + user.getIdUser() + " et Code: " + code);

        } catch (Exception e) {
            System.err.println("Erreur lors de la création de CodeGestionUser: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public List<UserDto> importUsersFromExcel(MultipartFile file) throws IOException {
        List<UserCreateDto> userCreateDtos = parseExcelFile(file);
        return createAllUsers(userCreateDtos);
    }

    // Méthode pour parser le fichier Excel
    private List<UserCreateDto> parseExcelFile(MultipartFile file) throws IOException {
        List<UserCreateDto> users = new ArrayList<>();

        try (InputStream inputStream = file.getInputStream();
             Workbook workbook = WorkbookFactory.create(inputStream)) {

            Sheet sheet = workbook.getSheetAt(0);

            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row != null) {
                    UserCreateDto userDto = new UserCreateDto();

                    // Colonne A: Nom (String)
                    Cell nomCell = row.getCell(0);
                    if (nomCell != null) {
                        userDto.setNom(getCellValueAsString(nomCell));
                    }

                    // Colonne B: typeActeur (Integer avec validation)
                    Cell typeActeurCell = row.getCell(1);
                    if (typeActeurCell != null) {
                        Integer typeActeurValue = getCellValueAsInteger(typeActeurCell);
                        validateTypeActeur(typeActeurValue); // Validation 1-5
                        userDto.setTypeActeur(typeActeurValue);
                    }

                    // Colonne C: idInter (Integer)
                    Cell intermediaireCell  = row.getCell(2);
                    if (intermediaireCell  != null) {
                        userDto.setIntermediaire(getCellValueAsString(intermediaireCell));
                    }

                    // Colonne D: compteNt (String)
                    Cell compteNtCell = row.getCell(3);
                    if (compteNtCell != null) {
                        userDto.setCompteNt(getCellValueAsString(compteNtCell));
                    }
                    if (!verifierCompteEtIntermediaire(userDto.getCompteNt(), userDto.getIntermediaire(), userRepository, gestionIntermediaireRepository)) {
                        continue; // Ignore ce user
                    }

// Extraction du nature (1er caractère) pour affectation de rôle
                    char nature = userDto.getIntermediaire().charAt(0);
                    User user = new User();
                    affecterRolesParNature(nature, user, roleRepository);

                    users.add(userDto);
                }
            }
        }

        return users;
    }

    private String getCellValueAsString(Cell cell) {
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                return String.valueOf((long) cell.getNumericCellValue());
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            default:
                return "";
        }
    }

    private Integer getCellValueAsInteger(Cell cell) {
        switch (cell.getCellType()) {
            case NUMERIC:
                return (int) cell.getNumericCellValue();
            case STRING:
                try {
                    return Integer.parseInt(cell.getStringCellValue());
                } catch (NumberFormatException e) {
                    return null;
                }
            default:
                return null;
        }
    }

    @Transactional
    public List<UserDto> createAllUsers(List<UserCreateDto> listUserCreateDto) {

        // Éliminer les doublons dans fichier excel
        Map<String, UserCreateDto> uniqueUsersMap = new LinkedHashMap<>();

        for (UserCreateDto dto : listUserCreateDto) {
            if (dto.getCompteNt() != null) {
                String compteNtClean = dto.getCompteNt().trim();
                if (!uniqueUsersMap.containsKey(compteNtClean)) {
                    uniqueUsersMap.put(compteNtClean, dto);
                    log.info("CompteNt '{}' ajouté à la liste de traitement", compteNtClean);
                } else {
                    log.warn("CompteNt '{}' ignoré car déjà présent dans le fichier Excel", compteNtClean);
                    //throw new IllegalArgumentException("Le compte Nt saisi existe en double dans le fichier importé.");
                }
            }
        }

        List<UserCreateDto> uniqueUserCreateDtos = new ArrayList<>(uniqueUsersMap.values());
        log.info("Nombre d'utilisateurs uniques après élimination des doublons Excel: {}", uniqueUserCreateDtos.size());

        // Convertir en entités
        List<User> users = userMapper.convertToEntitiesCreate(new ArrayList<>(uniqueUsersMap.values()));

        List<User> usersToSave = new ArrayList<>();

        // Vérifier les doublons avec la base de données
        users.forEach(user -> {
            String compteNtClean = user.getCompteNt().trim();

            // Vérifier en base
            if (userRepository.existsByCompteNt(compteNtClean)) {

                throw new IllegalArgumentException("L'utilisateur avec le compte NT : " + compteNtClean +" " + "existe déjà." );

            }
            if (user.getMotDePasse() == null || user.getMotDePasse().isEmpty()) {
                user.setMotDePasse("123");
            }

            user.setCodeActivite('O');
            user.setDateActivite(new Date());
            user.setPasswordExpiryDays(90);

            // Récupérer le DTO correspondant pour traiter l'intermédiaire
            UserCreateDto dto = uniqueUserCreateDtos.stream()
                    .filter(d -> d.getCompteNt().trim().equals(compteNtClean))
                    .findFirst()
                    .orElse(null);

            if (dto != null && dto.getIntermediaire() != null && dto.getIntermediaire().length() >= 5) {
                char nature = dto.getIntermediaire().charAt(0);
                int code = Integer.parseInt(dto.getIntermediaire().substring(1, 5));

                // Affecter les rôles selon la nature
                List<Long> roleIds = getRoleIdsByNature(nature);
                if (!roleIds.isEmpty()) {
                    List<Role> roles = roleRepository.findAllById(roleIds);
                    if (!roles.isEmpty()) {
                        user.setRoles(roles);
                        log.info("User: '{}', Roles assignés: {}", user.getCompteNt(), roles.size());
                    } else {
                        log.warn("Aucun rôle trouvé pour les IDs: {}", roleIds);
                    }
                }
                //ca marche aussi
                //affecterRolesParNature(nature, user, roleRepository);


                // Appel de la méthode setPasswordEncoder
                GestionIntermediaire gi = gestionIntermediaireRepository.findByNatureAndCode(nature, code).orElse(null);
                setPasswordEncoder(user, gi);
                if (gi != null) {
                    user.setIdIntermediaire(gi.getIdIntermediaire());
                }
            }

            usersToSave.add(user);
            log.info("CompteNt '{}' préparé pour sauvegarde", compteNtClean);
        });

        log.info("Nombre d'utilisateurs à sauvegarder: {}", usersToSave.size());
        List<User> savedUsers = userRepository.saveAll(usersToSave);

        // Créer les codes de gestion pour chaque utilisateur sauvegardé
        for (User savedUser : savedUsers) {
            UserCreateDto dto = uniqueUserCreateDtos.stream()
                    .filter(d -> d.getCompteNt().trim().equals(savedUser.getCompteNt().trim()))
                    .findFirst()
                    .orElse(null);

            if (dto != null && dto.getIntermediaire() != null && dto.getIntermediaire().length() >= 5) {
                creerCodeGestionUser(savedUser, dto.getIntermediaire());
            }
        }

        log.info("Nombre total d'utilisateurs créés avec succès: {}", savedUsers.size());
        return userMapper.convertToDtos(savedUsers);
    }

    @Transactional
    public UserDto createUserVf(UserCreateDto userCreateDto) {

        if (userCreateDto.getCompteNt() == null || userCreateDto.getCompteNt().trim().isEmpty()) {
            throw new IllegalArgumentException("Le champ compte Nt est obligatoire");
        }


        String compteNtClean = userCreateDto.getCompteNt().trim();

        // Vérifier si l'utilisateur existe déjà
        if (userRepository.existsByCompteNt(compteNtClean)) {
            log.warn("CompteNt '{}' déjà existant en base de données - création impossible", compteNtClean);
            throw new RuntimeException("L'utilisateur avec le compte NT '" + compteNtClean + "' existe déjà");
        }


        User user = userMapper.convertToEntity(userCreateDto);

        char nature = userCreateDto.getIntermediaire().charAt(0);
        int code = Integer.parseInt(userCreateDto.getIntermediaire().substring(1, 5));


        affecterRolesParNature(nature, user, roleRepository);

        // Encoder le mot de passe en fonction de l'intermédiaire
        GestionIntermediaire gi = gestionIntermediaireRepository.findByNatureAndCode(nature, code).orElse(null);
        setPasswordEncoder(user, gi);


        // affectation de user.idInter
        if (gi != null) {
            user.setIdIntermediaire(gi.getIdIntermediaire());
        }


        user.setCompteNt(compteNtClean);
        user.setCodeActivite('O');
        user.setDateActivite(new Date());
        user.setPasswordExpiryDays(90);

        // Mot de passe par défaut
        if (user.getMotDePasse() == null || user.getMotDePasse().isEmpty()) {
            user.setMotDePasse("123");
        }

        // Étape 2 : Traitement de l’intermédiaire
        if (userCreateDto.getIntermediaire() != null ) {

            if (!verifierCompteEtIntermediaire(userCreateDto.getCompteNt(), userCreateDto.getIntermediaire(), userRepository, gestionIntermediaireRepository)) {
                throw new IllegalArgumentException("L'intermédiaire et le compte NT ne sont pas valides.");
            }

        }

        User savedUser = userRepository.save(user);
        log.info("Utilisateur '{}' enregistré", savedUser.getCompteNt());

        // Créer CodeGestionUser
        try {
            if (userCreateDto.getIntermediaire() != null && userCreateDto.getIntermediaire().length() >= 5) {
                creerCodeGestionUser(savedUser, userCreateDto.getIntermediaire());
            }
        } catch (Exception e) {
            log.error("Erreur lors de la création de CodeGestionUser pour '{}'", savedUser.getCompteNt(), e);
        }

        return userMapper.convertToDto(savedUser);
    }

    public PagedResult<UserDto> searchUsersCriteria(String nom, String compteNt, Integer idIntermediaire, int page, int size) {
        List<User> users = userRepository.searchUsers(nom, compteNt,idIntermediaire, page, size);
        long total = userRepository.countUsers(nom, compteNt,idIntermediaire);
        List<UserDto> userDtos = users.stream().map(userMapper::convertToDto).toList();

        return new PagedResult<>(userDtos, page, size, total); // ⚠️ userDtos correspond à data
    }


    @Transactional
    public UserDto updateUser(Long id, UserUpdateDto userUpdateDto) {
        // Validation des paramètres
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("L'ID utilisateur est requis et doit être positif");
        }

        if (userUpdateDto == null) {
            throw new IllegalArgumentException("Les données de mise à jour sont requises");
        }

        // Validation des données
        userUpdateDto.validate();

        // Récupérer l'utilisateur existant
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé avec l'ID : " + id));

        // Vérifier l'unicité du compteNt si il est modifié
        if (userUpdateDto.getCompteNt() != null &&
                !userUpdateDto.getCompteNt().trim().equals(existingUser.getCompteNt())) {

            String newCompteNt = userUpdateDto.getCompteNt().trim();
            if (userRepository.existsByCompteNt(newCompteNt)) {
                throw new IllegalArgumentException("Le compte NT '" + newCompteNt + "' existe déjà");
            }
        }

        // Mettre à jour uniquement les champs fournis (non null)
        if (userUpdateDto.getNom() != null) {
            existingUser.setNom(userUpdateDto.getNom().trim());
            log.info("Nom mis à jour pour l'utilisateur ID {}: {}", id, userUpdateDto.getNom());
        }

        if (userUpdateDto.getTypeActeur() != null) {
            existingUser.setTypeActeur(userUpdateDto.getTypeActeur());
            log.info("TypeActeur mis à jour pour l'utilisateur ID {}: {}", id, userUpdateDto.getTypeActeur());
        }

        if (userUpdateDto.getCompteNt() != null) {
            existingUser.setCompteNt(userUpdateDto.getCompteNt().trim());
            log.info("CompteNt mis à jour pour l'utilisateur ID {}: {}", id, userUpdateDto.getCompteNt());
        }

        // Sauvegarder les modifications
        User updatedUser = userRepository.save(existingUser);

        log.info("Utilisateur ID {} mis à jour avec succès", id);
        return userMapper.convertToDto(updatedUser);
    }

    private void validateTypeActeur(Integer typeActeurNumber) {

       
        if (typeActeurNumber == null) {
            throw new IllegalArgumentException("Le type d'acteur ne peut pas être null");
        }

        if (typeActeurNumber < 1 || typeActeurNumber > 5) {
            throw new IllegalArgumentException("Type d'acteur " + typeActeurNumber + " est invalide: "  +
                    "Les valeurs autorisées sont (1=INTERMEDIAIRE, 2=RECOUVREUR, 3=PRODUCTEUR, 4=COMPTABLE, 5=CONSULTATION).");
        }
    }



    @Override
    public List<UserDto> findAll() {
        List<User> users = userRepository.findAll();
        return userMapper.convertToDtos(users);
    }

    public UserDto findById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'ID : " + id));
        return userMapper.convertToDto(user);
    }

    public void deleteUserById(Long id) {
        if (!userRepository.existsById(id)) {
            throw new EntityNotFoundException("Utilisateur non trouvé avec l'ID : " + id);
        }
        userRepository.deleteById(id);
    }

    }

