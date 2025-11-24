package com.rma.recouvrement.gestionusers.services;

import com.rma.recouvrement.gestionusers.dtos.UserRoleDto;
import com.rma.recouvrement.gestionusers.entities.Role;
import com.rma.recouvrement.gestionusers.entities.UserRole;
import com.rma.recouvrement.gestionusers.entities.UserRoleId;
import com.rma.recouvrement.gestionusers.mapper.UserRoleMapper;
import com.rma.recouvrement.gestionusers.repositories.UserRoleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class UserRoleServiceImpl implements UserRoleService {

    private UserRoleRepository userRoleRepository;
    private UserRoleMapper userRoleMapper;

    public UserRoleServiceImpl(UserRoleRepository userRoleRepository, UserRoleMapper userRoleMapper) {
        this.userRoleRepository = userRoleRepository;
        this.userRoleMapper = userRoleMapper;
    }

    @Override
    public UserRoleDto createUserRole(UserRoleDto userRoleDto) {

        UserRole userRole = userRoleMapper.convertToEntity(userRoleDto);
        userRole.setDateActivite(new Date());
        UserRole roleSaved = userRoleRepository.save(userRole);
        return userRoleMapper.convertToDto(roleSaved);
    }


    @Override
    public void deleteUserRole(UserRoleId userRoleId) {
        if (!userRoleRepository.existsById(userRoleId)) {
            throw new RuntimeException("Rôle non trouvé avec l'ID: " + userRoleId);
        }
        userRoleRepository.deleteById(userRoleId);
    }

    @Override
    public List<UserRoleDto> getAllUserRoles() {
        List<UserRole> userRoleList = userRoleRepository.findAll();
        return userRoleMapper.convertToDtos(userRoleList);
    }

    @Override
    public List<UserRoleDto> getUserRolesByUserId(Long userId) {
        List<UserRole> userRoles = userRoleRepository.findById_IdUser(userId);
        if (userRoles.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Aucun rôle trouvé pour l'utilisateur avec ID : " + userId);
        }
        return userRoleMapper.convertToDtos(userRoles);
    }

    @Override
    public List<UserRoleDto> getUserRolesByService(Long serviceId) {
        List<UserRole> userRoleDtos =userRoleRepository.findById_IdService(serviceId);
        return userRoleMapper.convertToDtos(userRoleDtos);
    }

}
