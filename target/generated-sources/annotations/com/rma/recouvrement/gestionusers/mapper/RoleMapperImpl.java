package com.rma.recouvrement.gestionusers.mapper;

import com.rma.recouvrement.gestionusers.dtos.RoleDto;
import com.rma.recouvrement.gestionusers.entities.Role;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-25T09:23:33+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17 (Oracle Corporation)"
)
@Component
public class RoleMapperImpl implements RoleMapper {

    @Override
    public RoleDto convertToDto(Role role) {
        if ( role == null ) {
            return null;
        }

        RoleDto roleDto = new RoleDto();

        roleDto.setIdRole( role.getIdRole() );
        roleDto.setLibelle( role.getLibelle() );
        roleDto.setDescription( role.getDescription() );
        roleDto.setTypeEnum( role.getTypeEnum() );
        roleDto.setIdMode( role.getIdMode() );

        return roleDto;
    }

    @Override
    public Role convertToEntity(RoleDto roleDto) {
        if ( roleDto == null ) {
            return null;
        }

        Role.RoleBuilder role = Role.builder();

        role.idRole( roleDto.getIdRole() );
        role.libelle( roleDto.getLibelle() );
        role.description( roleDto.getDescription() );
        role.typeEnum( roleDto.getTypeEnum() );
        role.idMode( roleDto.getIdMode() );

        return role.build();
    }

    @Override
    public List<RoleDto> convertToDtos(List<Role> roles) {
        if ( roles == null ) {
            return null;
        }

        List<RoleDto> list = new ArrayList<RoleDto>( roles.size() );
        for ( Role role : roles ) {
            list.add( convertToDto( role ) );
        }

        return list;
    }

    @Override
    public List<Role> convertToEntities(List<RoleDto> roleDtos) {
        if ( roleDtos == null ) {
            return null;
        }

        List<Role> list = new ArrayList<Role>( roleDtos.size() );
        for ( RoleDto roleDto : roleDtos ) {
            list.add( convertToEntity( roleDto ) );
        }

        return list;
    }
}
