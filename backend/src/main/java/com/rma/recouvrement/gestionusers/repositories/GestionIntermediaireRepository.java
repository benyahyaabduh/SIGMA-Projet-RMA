package com.rma.recouvrement.gestionusers.repositories;

import com.rma.recouvrement.gestionusers.entities.GestionIntermediaire;
import com.rma.recouvrement.gestionusers.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GestionIntermediaireRepository extends JpaRepository<GestionIntermediaire,Long> {


    boolean existsByNatureAndCode(Character nature, Integer code);
    Optional<GestionIntermediaire> findByNatureAndCode(Character nature, Integer code);




}

