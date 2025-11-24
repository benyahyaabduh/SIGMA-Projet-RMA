package com.rma.recouvrement.gestionusers.services;

import com.rma.recouvrement.gestionusers.dtos.UserRoleDto;
import com.rma.recouvrement.gestionusers.entities.UserRole;
import com.rma.recouvrement.gestionusers.entities.UserRoleId;

import java.util.List;
import java.util.Optional;

public interface UserRoleService {
    List<UserRoleDto> getAllUserRoles();
    public List<UserRoleDto> getUserRolesByUserId(Long userId);
    UserRoleDto createUserRole(UserRoleDto userRoleDto);
    void deleteUserRole(UserRoleId userRoleId);
    public List<UserRoleDto> getUserRolesByService(Long serviceId);
}
