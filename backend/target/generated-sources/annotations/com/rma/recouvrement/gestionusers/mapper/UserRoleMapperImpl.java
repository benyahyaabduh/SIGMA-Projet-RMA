package com.rma.recouvrement.gestionusers.mapper;

import com.rma.recouvrement.gestionusers.dtos.UserRoleDto;
import com.rma.recouvrement.gestionusers.entities.UserRole;
import com.rma.recouvrement.gestionusers.entities.UserRoleId;
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
public class UserRoleMapperImpl implements UserRoleMapper {

    @Override
    public UserRoleDto convertToDto(UserRole userRole) {
        if ( userRole == null ) {
            return null;
        }

        UserRoleDto userRoleDto = new UserRoleDto();

        userRoleDto.setIdUser( userRoleIdIdUser( userRole ) );
        userRoleDto.setIdService( userRoleIdIdService( userRole ) );
        userRoleDto.setCodeActivite( userRole.getCodeActivite() );
        userRoleDto.setDateActivite( userRole.getDateActivite() );
        userRoleDto.setUserActivite( userRole.getUserActivite() );

        return userRoleDto;
    }

    @Override
    public UserRole convertToEntity(UserRoleDto userRoleDto) {
        if ( userRoleDto == null ) {
            return null;
        }

        UserRole.UserRoleBuilder userRole = UserRole.builder();

        userRole.id( userRoleDtoToUserRoleId( userRoleDto ) );
        userRole.codeActivite( userRoleDto.getCodeActivite() );
        userRole.dateActivite( userRoleDto.getDateActivite() );
        userRole.userActivite( userRoleDto.getUserActivite() );

        return userRole.build();
    }

    @Override
    public List<UserRoleDto> convertToDtos(List<UserRole> userRoleList) {
        if ( userRoleList == null ) {
            return null;
        }

        List<UserRoleDto> list = new ArrayList<UserRoleDto>( userRoleList.size() );
        for ( UserRole userRole : userRoleList ) {
            list.add( convertToDto( userRole ) );
        }

        return list;
    }

    @Override
    public List<UserRole> convertToEntities(List<UserRoleDto> userRoleDtos) {
        if ( userRoleDtos == null ) {
            return null;
        }

        List<UserRole> list = new ArrayList<UserRole>( userRoleDtos.size() );
        for ( UserRoleDto userRoleDto : userRoleDtos ) {
            list.add( convertToEntity( userRoleDto ) );
        }

        return list;
    }

    private Long userRoleIdIdUser(UserRole userRole) {
        if ( userRole == null ) {
            return null;
        }
        UserRoleId id = userRole.getId();
        if ( id == null ) {
            return null;
        }
        Long idUser = id.getIdUser();
        if ( idUser == null ) {
            return null;
        }
        return idUser;
    }

    private Long userRoleIdIdService(UserRole userRole) {
        if ( userRole == null ) {
            return null;
        }
        UserRoleId id = userRole.getId();
        if ( id == null ) {
            return null;
        }
        Long idService = id.getIdService();
        if ( idService == null ) {
            return null;
        }
        return idService;
    }

    protected UserRoleId userRoleDtoToUserRoleId(UserRoleDto userRoleDto) {
        if ( userRoleDto == null ) {
            return null;
        }

        UserRoleId userRoleId = new UserRoleId();

        userRoleId.setIdUser( userRoleDto.getIdUser() );
        userRoleId.setIdService( userRoleDto.getIdService() );

        return userRoleId;
    }
}
