package com.rma.recouvrement.gestionusers.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdatePasswordDto {
    private String nouveauMotDePasse;
    private String confirmationMotDePasse;
}
