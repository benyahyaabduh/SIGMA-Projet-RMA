package com.rma.recouvrement.gestionusers.dtos;

import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserRoleDto {
    private Long idUser;

    private Long idService;

    private String CodeActivite;

    private Date dateActivite;

    private Integer userActivite;
}
