package com.rma.recouvrement.gestionusers.repositories;

import com.rma.recouvrement.gestionusers.entities.User;
import org.springframework.data.domain.Page;

import java.awt.print.Pageable;
import java.util.List;

public interface UserRepositoryCustom {
    List<User> searchUsers(String nom, String compteNt,Integer idIntermediaire,int page, int size);
    long countUsers(String nom, String compteNt,Integer idIntermediaire);
}
