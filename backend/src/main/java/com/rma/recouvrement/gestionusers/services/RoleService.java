package com.rma.recouvrement.gestionusers.services;

import com.rma.recouvrement.gestionusers.dtos.RoleDto;
import com.rma.recouvrement.gestionusers.entities.Role;

import java.util.List;
import java.util.Optional;

public interface RoleService {
    List<RoleDto> getAllRoles();
    RoleDto getRoleById(Long id);
    RoleDto createRole(RoleDto role);
    void deleteRole(Long id);
    boolean existsByLibelle(String libelle);
}
