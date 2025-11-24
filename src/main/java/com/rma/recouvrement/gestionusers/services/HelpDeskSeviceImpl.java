package com.rma.recouvrement.gestionusers.services;

import com.rma.recouvrement.gestionusers.dtos.UserUpdatePasswordDto;
import com.rma.recouvrement.gestionusers.entities.User;
import com.rma.recouvrement.gestionusers.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
@Transactional
public class HelpDeskSeviceImpl implements HelpDeskService {

    private UserRepository userRepository;

    @Autowired
    public HelpDeskSeviceImpl(UserRepository userRepository ) {
        this.userRepository = userRepository;
    }


    @Transactional
    public void regenererMotDePasse(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé avec l'ID : " + userId));

        user.setMotDePasse("123");
        user.setPasswordLastChanged(new Date());
        user.setDateActivite(new Date());
        user.setCodeActivite('O');
        userRepository.save(user);

        log.info("Mot de passe régénéré avec succès pour l'utilisateur ID: {} (CompteNt: {})",
                userId, user.getCompteNt());
    }

    @Transactional
    public void modifierMotDePasse (Long idUser, UserUpdatePasswordDto userUpdatePasswordDto){
        User user = userRepository.findById(idUser)

                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé avec l'ID : " + idUser));
        if (!userUpdatePasswordDto.getNouveauMotDePasse().equals(userUpdatePasswordDto.getConfirmationMotDePasse())) {
            throw new IllegalArgumentException("La confirmation du mot de passe ne correspond pas au nouveau mot de passe");
        }

        validerCriteresSécuriteMotDePasse(userUpdatePasswordDto.getNouveauMotDePasse());

        String ancienMotDePasse = user.getMotDePasse();
        if (userUpdatePasswordDto.getNouveauMotDePasse().equals(ancienMotDePasse)) {
            throw new IllegalArgumentException("Le nouveau mot de passe doit être différent de l'ancien");
        }

        user.setMotDePasse(userUpdatePasswordDto.getNouveauMotDePasse());
        user.setPasswordLastChanged(new Date());
        userRepository.save(user);
        log.info("Mot de passe modifié avec succès pour l'utilisateur ID: {}", idUser);

    }

    private void validerCriteresSécuriteMotDePasse(String motDePasse) {
        if (motDePasse == null || motDePasse.trim().isEmpty()) {
            throw new IllegalArgumentException("Le mot de passe ne peut pas être vide");
        }

        String mdp = motDePasse.trim();
        List<String> erreurs = new ArrayList<>();

        if (mdp.length() < 8) {
            erreurs.add("Le mot de passe doit contenir au moins 8 caractères");
        }

        if (!mdp.matches(".*[A-Z].*")) {
            erreurs.add("Le mot de passe doit contenir au moins une lettre majuscule");
        }

        if (!mdp.matches(".*[a-z].*")) {
            erreurs.add("Le mot de passe doit contenir au moins une lettre minuscule");
        }

        if (!mdp.matches(".*[0-9].*")) {
            erreurs.add("Le mot de passe doit contenir au moins un chiffre");
        }

        if (!mdp.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?].*")) {
            erreurs.add("Le mot de passe doit contenir au moins un caractère spécial ");
        }

        if (mdp.contains(" ")) {
            erreurs.add("Le mot de passe ne doit pas contenir d'espaces");
        }

        if (!erreurs.isEmpty()) {
            String messageErreur = "Critères de sécurité non respectés:\n" + String.join("\n", erreurs);
            throw new IllegalArgumentException(messageErreur);
        }
    }
}
