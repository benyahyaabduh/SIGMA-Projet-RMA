package com.rma.recouvrement.gestionusers.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "REC_SYSCODESGESTIONSINTER ")
public class GestionIntermediaire {


    @Id
    @Column(name = "code")
    private int code;

    @Column(name = "idIntermediaire")
    private Integer idIntermediaire;

    @Column(name = "nature")
    private Character nature;

    @Column(name = "raisonSociale")
    private String raisonSociale;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "")
    private int idVille;

    @Column(name = "idType")
    private int idType;



    @ManyToMany(mappedBy = "gestionIntermediaireList", fetch = FetchType.LAZY)
    private List<User> userList;


}
