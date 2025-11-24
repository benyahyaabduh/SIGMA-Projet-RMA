package com.rma.recouvrement.gestionusers.entities;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CodeGestionUsersId implements Serializable {

    @Column(name = "IDUSER")
    private Long idUser;

    @Column(name = "CODEINTER")
    private Integer codeInter;

}
