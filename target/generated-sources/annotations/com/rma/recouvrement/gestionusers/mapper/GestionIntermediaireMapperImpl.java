package com.rma.recouvrement.gestionusers.mapper;

import com.rma.recouvrement.gestionusers.dtos.GestionIntermediaireDto;
import com.rma.recouvrement.gestionusers.entities.GestionIntermediaire;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-07-25T11:01:39+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17 (Oracle Corporation)"
)
@Component
public class GestionIntermediaireMapperImpl implements GestionIntermediaireMapper {

    @Override
    public GestionIntermediaireDto convertToDto(GestionIntermediaire gestionIntermediaire) {
        if ( gestionIntermediaire == null ) {
            return null;
        }

        GestionIntermediaireDto gestionIntermediaireDto = new GestionIntermediaireDto();

        if ( gestionIntermediaire.getIdIntermediaire() != null ) {
            gestionIntermediaireDto.setIdIntermediaire( gestionIntermediaire.getIdIntermediaire().longValue() );
        }
        gestionIntermediaireDto.setRaisonSociale( gestionIntermediaire.getRaisonSociale() );

        return gestionIntermediaireDto;
    }

    @Override
    public GestionIntermediaire convertToEntity(GestionIntermediaireDto gestionIntermediaireDto) {
        if ( gestionIntermediaireDto == null ) {
            return null;
        }

        GestionIntermediaire gestionIntermediaire = new GestionIntermediaire();

        if ( gestionIntermediaireDto.getIdIntermediaire() != null ) {
            gestionIntermediaire.setIdIntermediaire( gestionIntermediaireDto.getIdIntermediaire().intValue() );
        }
        gestionIntermediaire.setRaisonSociale( gestionIntermediaireDto.getRaisonSociale() );

        return gestionIntermediaire;
    }

    @Override
    public List<GestionIntermediaireDto> convertToDtos(List<GestionIntermediaire> gestionIntermediaires) {
        if ( gestionIntermediaires == null ) {
            return null;
        }

        List<GestionIntermediaireDto> list = new ArrayList<GestionIntermediaireDto>( gestionIntermediaires.size() );
        for ( GestionIntermediaire gestionIntermediaire : gestionIntermediaires ) {
            list.add( convertToDto( gestionIntermediaire ) );
        }

        return list;
    }

    @Override
    public List<GestionIntermediaire> convertToEntities(List<GestionIntermediaireDto> dtos) {
        if ( dtos == null ) {
            return null;
        }

        List<GestionIntermediaire> list = new ArrayList<GestionIntermediaire>( dtos.size() );
        for ( GestionIntermediaireDto gestionIntermediaireDto : dtos ) {
            list.add( convertToEntity( gestionIntermediaireDto ) );
        }

        return list;
    }
}
