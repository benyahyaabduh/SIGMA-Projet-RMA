package com.rma.recouvrement.gestionusers.entities;

import com.sun.jdi.PrimitiveValue;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.security.PrivateKey;
import java.util.Date;

@Entity
@Table(name = User.TABLE_NAME)
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IpIntermediaires {
    public static final String TABLE_NAME = "REC_SYSIPINTERMEDIAIRES";
    public static final String ID = "ID_INTER";

    @Id
    @Column(name = ID)
    private Long idInter;
    @Column(name = "PLAGEDEBUT")
    private String plageDebut;
    @Column(name = "PLAGEFIN")
    private String plageFin;
    @Column(name = "ACTIVE")
    private Character active;
    @Column(name = "DATEMAJ")
    private Date dateMaj;

}
