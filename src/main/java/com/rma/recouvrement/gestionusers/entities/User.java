package com.rma.recouvrement.gestionusers.entities;

import java.util.Date;
import java.util.List;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = User.TABLE_NAME)
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    public static final String TABLE_NAME = "REC_SYSUSERS";
    public static final String ID = "id";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", sequenceName = "seq_user", allocationSize = 1)
    @Column(name = ID)
    private Long idUser;



    @Column(name = "Nom")
    private String nom;

    @Column(name = "PWDENCODER")
    private String pwdEncoder;

    @Column(name = "COMPTENT" , length = 40)
    private String compteNt;

    @Column(name = "TYPEACTEUR")
    private Integer typeActeur;

    @Column(name = "IDINTER")
    private Integer idIntermediaire;

    @Column(name = "MOTDEPASSE", nullable = false)
    private String motDePasse;

    @Column(name = "Profil", nullable = false)
    private String profil;

    @Column(name = "PASSWORD_EXPIRY_DAYS")
    private int passwordExpiryDays;

    @Column(name = "PASSWORD_LAST_CHANGED")
    private Date passwordLastChanged;

    @Temporal(TemporalType.DATE)
    @Column(name = "DATEACTIVITE")
    private Date dateActivite;

    @Column(name = "CODEACTIVITE")
    private Character codeActivite;

    @Column(name = "Sexe", columnDefinition = "char")
    private String sexe;


    public User(Long idUser, String nom, String compteNt, String motDePasse) {
    }


    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinTable(name = "REC_SYSUSERSSERVICES",
            joinColumns = @JoinColumn(name = "IDUSER"),
            inverseJoinColumns = @JoinColumn(name = "IDSERVICE")  )
    @ToString.Exclude
    private List<Role> roleList;


//    cascade = {CascadeType.PERSIST, CascadeType.MERGE},
    @ManyToMany( fetch = FetchType.LAZY)
    @JoinTable(name = "REC_SYSCODESGESTIONSUSER",
            joinColumns = @JoinColumn(name = "IDUSER"),
            inverseJoinColumns = @JoinColumn(name = "CODEINTER"))
    @ToString.Exclude

    private List<GestionIntermediaire>gestionIntermediaireList;


    public void setRoles(List<Role> roles) {
        this.roleList = roles;
    }

    public List<Role> getRoles() {
        return this.roleList;
    }
}
