package com.rma.recouvrement.gestionusers.services;

import com.rma.recouvrement.gestionusers.dtos.GestionIntermediaireDto;
import com.rma.recouvrement.gestionusers.dtos.RoleDto;

import java.util.List;

public interface GestionIntermediaireService {
    List<GestionIntermediaireDto> getAllIntermediaire();
    GestionIntermediaireDto getIntermediaireById(Long id);
    GestionIntermediaireDto createIntermediaire(GestionIntermediaireDto intermediaireDto);

}
