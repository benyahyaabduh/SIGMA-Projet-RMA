package com.rma.recouvrement.gestionusers.controllers;

import com.rma.recouvrement.gestionusers.dtos.UserCreateDto;
import com.rma.recouvrement.gestionusers.dtos.UserDto;
import com.rma.recouvrement.gestionusers.dtos.UserUpdateDto;
import com.rma.recouvrement.gestionusers.dtos.UserUpdatePasswordDto;
import com.rma.recouvrement.gestionusers.pagination.PagedResult;
import com.rma.recouvrement.gestionusers.services.HelpDeskService;
import com.rma.recouvrement.gestionusers.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
//@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private HelpDeskService helpDeskService;



    @PutMapping("/api/users/update/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id,
                                              @RequestBody UserUpdateDto userUpdateDto) {
        UserDto updatedUser = userService.updateUser(id, userUpdateDto);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/api/users/searchCriteria")
    public ResponseEntity<PagedResult<UserDto>> searchUsers(
            @RequestParam(required = false) String nom,
            @RequestParam(required = false) String compteNt,
            @RequestParam(required = false) Integer idIntermediaire,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return ResponseEntity.ok(userService.searchUsersCriteria(nom, compteNt,idIntermediaire, page, size));
    }


    @GetMapping("/api/users/findAll") // Changed from @GetMapping
    List<UserDto> findAll() {
        return userService.findAll();
    }

    @PutMapping("/api/helpdesk/reset-password/{id}")
    public ResponseEntity<String> regenererMotDePasse(@PathVariable Long id) {
        helpDeskService.regenererMotDePasse(id);
        return ResponseEntity.ok("Mot de passe régénéré avec succès");
    }
    @PutMapping("/api/helpdesk/update-password/{id}")
    public ResponseEntity<String> changerMotDePasse(
            @PathVariable Long id, @RequestBody UserUpdatePasswordDto userUpdatePasswordDto
            )
    {

        helpDeskService.modifierMotDePasse(id,userUpdatePasswordDto);
        return ResponseEntity.ok("Mot de passe modifié avec succès");
    }


    @PostMapping("/api/users/CreateUser")
    public ResponseEntity<?> createUser(@RequestBody UserCreateDto userCreateDto) {
        try {
            UserDto createdUser = userService.createUserVf(userCreateDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } catch (RuntimeException e) {
            // Message d'erreur avec le code HTTP 409
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }


    @PostMapping(value = "/api/users/import-excel", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Importer des utilisateurs depuis un fichier Excel")
    public ResponseEntity<?> importUsersFromExcel(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            log.warn("Fichier reçu : {}, {}", file.getOriginalFilename(), file.isEmpty());
            List<UserDto> createdUsers = userService.importUsersFromExcel(file);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUsers);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }


    @GetMapping("/api/users/{id}")
    public ResponseEntity<UserDto> findById(@PathVariable Long id) {
        UserDto user = userService.findById(id);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/api/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok("Utilisateur supprimé avec succès !");
    }

}