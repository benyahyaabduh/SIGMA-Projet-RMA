package com.rma.recouvrement.gestionusers.mapper;

import com.rma.recouvrement.gestionusers.dtos.RoleDto;
import com.rma.recouvrement.gestionusers.entities.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RoleMapper {

    // Éviter la référence circulaire en ignorant userDtoList
    @Mapping(target = "userListDto", ignore = true)
    RoleDto convertToDto(Role role);

    // Éviter la référence circulaire en ignorant userList
   @Mapping(target = "userList", ignore = true)
    Role convertToEntity(RoleDto roleDto);

    // Pour les listes
    List<RoleDto> convertToDtos(List<Role> roles);
    List<Role> convertToEntities(List<RoleDto> roleDtos);
}