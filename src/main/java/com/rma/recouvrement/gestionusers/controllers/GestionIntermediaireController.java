package com.rma.recouvrement.gestionusers.controllers;

import com.rma.recouvrement.gestionusers.dtos.GestionIntermediaireDto;
import com.rma.recouvrement.gestionusers.entities.GestionIntermediaire;
import com.rma.recouvrement.gestionusers.services.GestionIntermediaireService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@RequestMapping("/api/intermediaire")
@CrossOrigin(origins = "http://localhost:3000")
public class GestionIntermediaireController {

    @Autowired
    private GestionIntermediaireService gestionIntermediaireService;


    @GetMapping("/api/int/findAll")
    public ResponseEntity<List<GestionIntermediaireDto>> getAllIntermediaire(){


        try {
            List<GestionIntermediaireDto> gestionIntermediaireDtos = gestionIntermediaireService.getAllIntermediaire();

            if (!gestionIntermediaireDtos.isEmpty()) {
            }

            return ResponseEntity.ok(gestionIntermediaireDtos);
        } catch (Exception e) {
            System.err.println("Erreur dans getAllIntermediaire : " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<GestionIntermediaireDto> getIntermediaireById (@PathVariable Long id){
        GestionIntermediaireDto gestionIntermediaireDto = gestionIntermediaireService.getIntermediaireById(id);
        return ResponseEntity.ok(gestionIntermediaireDto);
    }

    @PostMapping
    public ResponseEntity<GestionIntermediaireDto> createIntermediaire (@Valid @RequestBody GestionIntermediaireDto gestionIntermediaireDto){
        try {
            GestionIntermediaireDto intermediaireCreated = gestionIntermediaireService.createIntermediaire(gestionIntermediaireDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(intermediaireCreated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
        }


}
