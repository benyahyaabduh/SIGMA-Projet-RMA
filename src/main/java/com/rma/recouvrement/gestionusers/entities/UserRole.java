package com.rma.recouvrement.gestionusers.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = UserRole.TABLE_NAME)
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRole {
    public static final String TABLE_NAME = "REC_SYSUSERSSERVICES";



    @EmbeddedId
    private UserRoleId id;

    @Column(name = "CODEACTIVITE")
    private String codeActivite;

    @Temporal(TemporalType.DATE)
    @Column(name = "DATEACTIVITE")
    private Date dateActivite;

    @Column(name = "USERACTIVITE")
    private Integer userActivite;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IDUSER", insertable = false, updatable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IDSERVICE", insertable = false, updatable = false)
    private Role role;
}