package com.rma.recouvrement.gestionusers.services;

import com.rma.recouvrement.gestionusers.dtos.RoleDto;
import com.rma.recouvrement.gestionusers.entities.Role;
import com.rma.recouvrement.gestionusers.mapper.RoleMapper;
import com.rma.recouvrement.gestionusers.repositories.RoleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class RoleServiceImpl implements RoleService{
    private RoleRepository roleRepository;
    private RoleMapper roleMapper;

    public RoleServiceImpl(RoleRepository roleRepository, RoleMapper roleMapper) {
        this.roleRepository = roleRepository;
        this.roleMapper = roleMapper;
    }

    @Override
    public List<RoleDto> getAllRoles() {
        List <Role> roles =roleRepository.findAll();
        return roleMapper.convertToDtos(roles);
    }


    @Override
    public RoleDto getRoleById(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role non trouvé avec l'ID : " + id));
        return roleMapper.convertToDto(role);
    }


    @Override
    public RoleDto createRole(RoleDto roledto) {
        Role role = roleMapper.convertToEntity(roledto);
        if (existsByLibelle(roledto.getLibelle())) {
            throw new RuntimeException("Rôle existe déjà avec le libellé: " + role.getLibelle());
        }
        Role roleSaved = roleRepository.save(role);
        return roleMapper.convertToDto(roleSaved);
    }

    @Override
    public void deleteRole(Long id) {
        if (!roleRepository.existsById(id)) {
            throw new RuntimeException("Rôle non trouvé avec l'ID: " + id);
        }
        roleRepository.deleteById(id);
    }

    @Override
    public boolean existsByLibelle(String libelle) {
        return false;
    }
}
