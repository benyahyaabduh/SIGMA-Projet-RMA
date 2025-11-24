package com.rma.recouvrement.gestionusers.mapper;

import com.rma.recouvrement.gestionusers.dtos.UserRoleDto;
import com.rma.recouvrement.gestionusers.entities.UserRole;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")

public interface UserRoleMapper {

    @Mapping(target = "idUser", source = "id.idUser") // Récupère idUser depuis UserRoleId
    @Mapping(target = "idService", source = "id.idService") // Récupère idService depuis UserRoleId
    UserRoleDto convertToDto(UserRole userRole);

    @Mapping(target = "id.idUser", source = "idUser") // Associe idUser à UserRoleId
    @Mapping(target = "id.idService", source = "idService") // Associe idService à UserRoleId
    UserRole convertToEntity(UserRoleDto userRoleDto);

    List<UserRoleDto> convertToDtos(List<UserRole> userRoleList);
    List<UserRole> convertToEntities(List<UserRoleDto> userRoleDtos);

}
