package com.rma.recouvrement.gestionusers.entities;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Embeddable
public class UserRoleId implements Serializable {
    @Column(name = "IDUSER")
    private Long idUser;
    @Column(name = "IDSERVICE")
    private Long idService;
}
