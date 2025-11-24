package com.rma.recouvrement.gestionusers.dtos;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class UserUpdateDto {
    private String nom;
    private Integer typeActeur;
    private String compteNt;

    public void validate() {
        if (nom != null && nom.trim().isEmpty()) {
            throw new IllegalArgumentException("Le nom ne peut pas être vide");
        }

        if (compteNt != null && compteNt.trim().isEmpty()) {
            throw new IllegalArgumentException("Le compte NT ne peut pas être vide");
        }

        if (typeActeur != null && (typeActeur < 1 || typeActeur > 5)) {
            throw new IllegalArgumentException("Type d'acteur invalide. Les valeurs autorisées sont entre 1 et 5");
        }
    }
}
