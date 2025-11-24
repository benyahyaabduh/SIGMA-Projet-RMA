package com.rma.recouvrement.gestionusers.dtos;

import com.rma.recouvrement.gestionusers.entities.User;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.*;

import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RoleDto {

    private Long idRole;
    private String libelle;
    private String description;
    private String typeEnum;
    private int idMode;
    private List<UserDto> userListDto;


}
