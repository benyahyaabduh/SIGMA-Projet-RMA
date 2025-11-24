package com.rma.recouvrement.gestionusers.repositories;

import com.rma.recouvrement.gestionusers.entities.Role;
import com.rma.recouvrement.gestionusers.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {

    boolean existsById(Long id);
    List<Role> findAllById(Iterable<Long>ids);



}
