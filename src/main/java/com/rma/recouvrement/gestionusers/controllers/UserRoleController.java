package com.rma.recouvrement.gestionusers.controllers;

import com.rma.recouvrement.gestionusers.dtos.RoleDto;
import com.rma.recouvrement.gestionusers.dtos.UserCreateDto;
import com.rma.recouvrement.gestionusers.dtos.UserDto;
import com.rma.recouvrement.gestionusers.dtos.UserRoleDto;
import com.rma.recouvrement.gestionusers.entities.UserRole;
import com.rma.recouvrement.gestionusers.entities.UserRoleId;
import com.rma.recouvrement.gestionusers.services.UserRoleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-roles")
public class UserRoleController {

    @Autowired
    private UserRoleService userRoleService;
    UserRoleId userRoleId = new UserRoleId();


    @GetMapping("/findAll")
    public ResponseEntity<List<UserRoleDto>> getAllUserRoles() {
        List<UserRoleDto> userRoles = userRoleService.getAllUserRoles();
        return ResponseEntity.ok(userRoles);
    }




    @GetMapping("/api/user-roles/user/{userId}")
    public ResponseEntity<List<UserRoleDto>> getUserRolesByUserId(@PathVariable Long userId) {
        List<UserRoleDto> userRoles = userRoleService.getUserRolesByUserId(userId);
        return ResponseEntity.ok(userRoles);
    }
    @GetMapping("/api/user-roles/service/{serviceId}")
    public ResponseEntity<List<UserRoleDto>> getUserRolesByService(@PathVariable Long serviceId) {
        List<UserRoleDto> userRoles = userRoleService.getUserRolesByService(serviceId);
        return ResponseEntity.ok(userRoles);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId,
                                             @PathVariable Long roleId) {
        userRoleService.deleteUserRole(userRoleId);
        return ResponseEntity.ok("Utilisateur supprimé avec succès !");
    }



    @PostMapping("/create")
    public ResponseEntity<UserRoleDto> create(@RequestBody @Valid UserRoleDto userRoleDto) {
        UserRoleDto createdUser = userRoleService.createUserRole(userRoleDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }






}
