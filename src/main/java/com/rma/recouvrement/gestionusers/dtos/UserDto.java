package com.rma.recouvrement.gestionusers.dtos;

import com.rma.recouvrement.gestionusers.entities.CodeGestionUsers;
import com.rma.recouvrement.gestionusers.entities.Role;
import lombok.*;

import java.util.Date;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDto {



    private Long idUser;
    private String nom;
    private String compteNt;
    private String intermediaire;
    private Integer typeActeur;
    private Integer idIntermediaire;
    private int passwordExpiryDays;
    private Date passwordLastChanged;
    private String motDePasse;
    private String pwdEncoder;
    private String profil;
    private Date dateActivite;
    private Character codeActivite;
    private String sexe;
    private List<RoleDto> roleListDto;
    private List<GestionIntermediaireDto> gestionIntermediaireDtos;


    public String getTypeActeurNom() {
        if (typeActeur == null) {
            return "TypeActeur NON_DEFINI";
        }

        switch (typeActeur) {
            case 1: return "INTERMEDIAIRE";
            case 2: return "RECOUVREUR";
            case 3: return "PRODUCTEUR";
            case 4: return "COMPTABLE";
            case 5: return "CONSULTATION";
            default: return "INVALIDE";
        }
    }






}
