package com.rma.recouvrement.gestionusers.mapper;

import com.rma.recouvrement.gestionusers.dtos.CodeGestionUsersDto;
import com.rma.recouvrement.gestionusers.dtos.UserCreateDto;
import com.rma.recouvrement.gestionusers.dtos.UserDto;
import com.rma.recouvrement.gestionusers.entities.GestionIntermediaire;
import com.rma.recouvrement.gestionusers.entities.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-08-06T11:11:21+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Autowired
    private RoleMapper roleMapper;
    @Autowired
    private GestionIntermediaireMapper gestionIntermediaireMapper;

    @Override
    public UserDto convertToDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto userDto = new UserDto();

        userDto.setRoleListDto( roleMapper.convertToDtos( user.getRoleList() ) );
        userDto.setIdIntermediaire( user.getIdIntermediaire() );
        userDto.setIdUser( user.getIdUser() );
        userDto.setNom( user.getNom() );
        userDto.setCompteNt( user.getCompteNt() );
        userDto.setTypeActeur( user.getTypeActeur() );
        userDto.setPasswordExpiryDays( user.getPasswordExpiryDays() );
        userDto.setPasswordLastChanged( user.getPasswordLastChanged() );
        userDto.setMotDePasse( user.getMotDePasse() );
        userDto.setPwdEncoder( user.getPwdEncoder() );
        userDto.setProfil( user.getProfil() );
        userDto.setDateActivite( user.getDateActivite() );
        userDto.setCodeActivite( user.getCodeActivite() );
        userDto.setSexe( user.getSexe() );

        return userDto;
    }

    @Override
    public User convertToEntity(UserDto userDto) {
        if ( userDto == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.roleList( roleMapper.convertToEntities( userDto.getRoleListDto() ) );
        user.gestionIntermediaireList( gestionIntermediaireMapper.convertToEntities( userDto.getGestionIntermediaireDtos() ) );
        user.idUser( userDto.getIdUser() );
        user.nom( userDto.getNom() );
        user.pwdEncoder( userDto.getPwdEncoder() );
        user.compteNt( userDto.getCompteNt() );
        user.typeActeur( userDto.getTypeActeur() );
        user.idIntermediaire( userDto.getIdIntermediaire() );
        user.motDePasse( userDto.getMotDePasse() );
        user.profil( userDto.getProfil() );
        user.passwordExpiryDays( userDto.getPasswordExpiryDays() );
        user.passwordLastChanged( userDto.getPasswordLastChanged() );
        user.dateActivite( userDto.getDateActivite() );
        user.codeActivite( userDto.getCodeActivite() );
        user.sexe( userDto.getSexe() );

        return user.build();
    }

    @Override
    public User convertToEntity(UserCreateDto userCreateDto) {
        if ( userCreateDto == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.profil( userCreateDto.getCompteNt() );
        user.roleList( roleMapper.convertToEntities( userCreateDto.getRoleDtoList() ) );
        user.gestionIntermediaireList( codeGestionUsersDtoListToGestionIntermediaireList( userCreateDto.getListcodeGestionUsersDto() ) );
        user.nom( userCreateDto.getNom() );
        user.compteNt( userCreateDto.getCompteNt() );
        user.typeActeur( userCreateDto.getTypeActeur() );
        user.passwordExpiryDays( userCreateDto.getPasswordExpiryDays() );
        user.passwordLastChanged( userCreateDto.getPasswordLastChanged() );
        user.dateActivite( userCreateDto.getDateActivite() );

        user.motDePasse( "123" );

        return user.build();
    }

    @Override
    public List<UserDto> convertToDtos(List<User> users) {
        if ( users == null ) {
            return null;
        }

        List<UserDto> list = new ArrayList<UserDto>( users.size() );
        for ( User user : users ) {
            list.add( convertToDto( user ) );
        }

        return list;
    }

    @Override
    public List<User> convertToEntities(List<UserDto> userDtos) {
        if ( userDtos == null ) {
            return null;
        }

        List<User> list = new ArrayList<User>( userDtos.size() );
        for ( UserDto userDto : userDtos ) {
            list.add( convertToEntity( userDto ) );
        }

        return list;
    }

    @Override
    public List<User> convertToEntitiesCreate(List<UserCreateDto> userCreateDtos) {
        if ( userCreateDtos == null ) {
            return null;
        }

        List<User> list = new ArrayList<User>( userCreateDtos.size() );
        for ( UserCreateDto userCreateDto : userCreateDtos ) {
            list.add( convertToEntity( userCreateDto ) );
        }

        return list;
    }

    protected GestionIntermediaire codeGestionUsersDtoToGestionIntermediaire(CodeGestionUsersDto codeGestionUsersDto) {
        if ( codeGestionUsersDto == null ) {
            return null;
        }

        GestionIntermediaire gestionIntermediaire = new GestionIntermediaire();

        return gestionIntermediaire;
    }

    protected List<GestionIntermediaire> codeGestionUsersDtoListToGestionIntermediaireList(List<CodeGestionUsersDto> list) {
        if ( list == null ) {
            return null;
        }

        List<GestionIntermediaire> list1 = new ArrayList<GestionIntermediaire>( list.size() );
        for ( CodeGestionUsersDto codeGestionUsersDto : list ) {
            list1.add( codeGestionUsersDtoToGestionIntermediaire( codeGestionUsersDto ) );
        }

        return list1;
    }
}
