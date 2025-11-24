package com.rma.recouvrement.gestionusers.dtos;

import com.rma.recouvrement.gestionusers.entities.Role;
import lombok.*;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserCreateDto {

    private String nom;
    private String compteNt;
    private String intermediaire;
    private Integer typeActeur;
    private String pwdEncoder;
    private Date passwordLastChanged;
    private Integer idIntermediaire;
    private int passwordExpiryDays;
    private Date dateActivite;
    private List<RoleDto> roleDtoList;
    private List<CodeGestionUsersDto>listcodeGestionUsersDto;



}
