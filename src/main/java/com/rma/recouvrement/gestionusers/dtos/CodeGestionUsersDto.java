package com.rma.recouvrement.gestionusers.dtos;

import jakarta.persistence.Column;
import lombok.*;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CodeGestionUsersDto {

    private Long idUser;
    private Long codeInter;
}
