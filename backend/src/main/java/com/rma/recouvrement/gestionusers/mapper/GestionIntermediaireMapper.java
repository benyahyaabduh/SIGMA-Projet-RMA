package com.rma.recouvrement.gestionusers.mapper;
import com.rma.recouvrement.gestionusers.dtos.GestionIntermediaireDto;
import com.rma.recouvrement.gestionusers.entities.GestionIntermediaire;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface GestionIntermediaireMapper {

    //@Mapping(target = "userListDto", ignore = true) // Vérifie que userList existe bien dans GestionIntermediaire
    GestionIntermediaireDto convertToDto(GestionIntermediaire gestionIntermediaire);

    @Mapping(target = "userList",  ignore = true)
    GestionIntermediaire convertToEntity(GestionIntermediaireDto gestionIntermediaireDto);

    List<GestionIntermediaireDto> convertToDtos(List<GestionIntermediaire> gestionIntermediaires);
    List<GestionIntermediaire> convertToEntities(List<GestionIntermediaireDto> dtos);
}

