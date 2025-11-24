package com.rma.recouvrement.gestionusers.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = CodeGestionUsers.TABLE_NAME)
@Entity
@EqualsAndHashCode
public class CodeGestionUsers {

    public static final String TABLE_NAME = "REC_SYSCODESGESTIONSUSER";

    @EmbeddedId
    private CodeGestionUsersId id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IDUSER",insertable = false, updatable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CODEINTER",insertable = false, updatable = false)
    private GestionIntermediaire gestionIntermediaire;
}
