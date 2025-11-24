package com.rma.recouvrement.gestionusers.repositories;

import com.rma.recouvrement.gestionusers.entities.CodeGestionUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CodeGestionUsersRepository extends JpaRepository<CodeGestionUsers,Long> {
}
