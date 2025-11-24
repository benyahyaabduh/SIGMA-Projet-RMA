package com.rma.recouvrement.gestionusers.services;

import com.rma.recouvrement.gestionusers.dtos.GestionIntermediaireDto;
import com.rma.recouvrement.gestionusers.entities.GestionIntermediaire;
import com.rma.recouvrement.gestionusers.mapper.GestionIntermediaireMapper;
import com.rma.recouvrement.gestionusers.repositories.GestionIntermediaireRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class GestionIntermediaireServiceImpl implements GestionIntermediaireService{

    private GestionIntermediaireMapper gestionIntermediaireMapper;
    private GestionIntermediaireRepository gestionIntermediaireRepository;


    public GestionIntermediaireServiceImpl(GestionIntermediaireMapper gestionIntermediaireMapper, GestionIntermediaireRepository gestionIntermediaireRepository) {
        this.gestionIntermediaireMapper = gestionIntermediaireMapper;
        this.gestionIntermediaireRepository = gestionIntermediaireRepository;
    }



    @Override
    public List<GestionIntermediaireDto> getAllIntermediaire() {
        List<GestionIntermediaire> gestionIntermediaires = gestionIntermediaireRepository.findAll();
        return gestionIntermediaireMapper.convertToDtos(gestionIntermediaires);
    }

    @Override
    public GestionIntermediaireDto getIntermediaireById(Long id) {
        GestionIntermediaire  gestionIntermediaire= gestionIntermediaireRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role non trouvé avec l'ID : " + id));
        return gestionIntermediaireMapper.convertToDto(gestionIntermediaire);
    }



    @Override
    public GestionIntermediaireDto createIntermediaire(GestionIntermediaireDto gestionIntermediaireDto) {
        GestionIntermediaire gestionIntermediaire = gestionIntermediaireMapper.convertToEntity(gestionIntermediaireDto);
        GestionIntermediaire intermediaireSaved = gestionIntermediaireRepository.save(gestionIntermediaire);
        return gestionIntermediaireMapper.convertToDto(intermediaireSaved);
    }

//
}
