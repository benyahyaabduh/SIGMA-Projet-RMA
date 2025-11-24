package com.rma.recouvrement.gestionusers.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = Role.TABLE_NAME)
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role {
    public static final String ID = "id";

    public static final String TABLE_NAME = "REC_SYSSERVICES";
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "service_seq")
    @SequenceGenerator(name = "service_seq", sequenceName = "SEQ_IDSERVICE", allocationSize = 1)
    @Column(name = ID)
    private Long idRole;

    @Column(name = "LIBELLE")
    private String libelle;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "TYPEENUM")
    private String typeEnum;

    @Column(name = "IDMODE")
    private int idMode;


    @ManyToMany(mappedBy = "roleList")
    @ToString.Exclude
    private List<User> userList;


}
