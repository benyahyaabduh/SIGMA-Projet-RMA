package com.rma.recouvrement.gestionusers.repositories;

import com.rma.recouvrement.gestionusers.entities.Role;
import com.rma.recouvrement.gestionusers.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long>, UserRepositoryCustom {
    boolean existsByCompteNt(String compteNt);











}
