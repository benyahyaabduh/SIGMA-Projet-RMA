package com.rma.recouvrement.gestionusers.repositories;

import com.rma.recouvrement.gestionusers.entities.IpIntermediaires;
import com.rma.recouvrement.gestionusers.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IpIntermediaireRepository extends JpaRepository<IpIntermediaires,Long> {
}
