package com.rma.recouvrement.gestionusers.repositories;

import com.rma.recouvrement.gestionusers.entities.UserRole;
import com.rma.recouvrement.gestionusers.entities.UserRoleId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, UserRoleId> {
    List<UserRole> findById_IdUser(Long idUser); // JPA cherchera tous les rôles liés à userId
    List<UserRole> findById_IdService(Long idService);

}
