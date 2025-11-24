package com.rma.recouvrement.gestionusers.mapper;

import com.rma.recouvrement.gestionusers.dtos.UserCreateDto;
import com.rma.recouvrement.gestionusers.dtos.UserDto;
import com.rma.recouvrement.gestionusers.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring",uses = {RoleMapper.class, GestionIntermediaireMapper.class})
public interface UserMapper {


    // User -> UserDto
    @Mapping(target = "roleListDto", source = "roleList")
    @Mapping(source = "idIntermediaire", target = "idIntermediaire")
    //@Mapping(target = "gestionIntermediaireDtos", source = "gestionIntermediaireList")
    UserDto convertToDto(User user);



    // UserDto -> User
    @Mapping(target = "roleList", source = "roleListDto")
    @Mapping(target = "gestionIntermediaireList", source = "gestionIntermediaireDtos")
    User convertToEntity(UserDto userDto);

    // UserCreateDto -> User
    @Mapping(target = "profil", source = "compteNt")
    @Mapping(target = "idUser", ignore = true)
    @Mapping(target = "motDePasse", constant = "123")
    @Mapping(target = "codeActivite", ignore = true)
    @Mapping(target = "sexe", ignore = true)
    @Mapping(target = "pwdEncoder", ignore = true)
    @Mapping(target = "idIntermediaire", ignore = true)
    @Mapping(target = "roleList", source = "roleDtoList")
    @Mapping(target = "gestionIntermediaireList", source = "listcodeGestionUsersDto")
    User convertToEntity(UserCreateDto userCreateDto);

    // Pour les listes
    List<UserDto> convertToDtos(List<User> users);
    List<User> convertToEntities(List<UserDto> userDtos);

//    @Mapping(target = "profil", source = "compteNt")
//    @Mapping(target = "idUser", ignore = true)
//    @Mapping(target = "motDePasse", constant = "123")
//    @Mapping(target = "gestionIntermediaireList", ignore = true)
    List<User> convertToEntitiesCreate(List<UserCreateDto> userCreateDtos);
}