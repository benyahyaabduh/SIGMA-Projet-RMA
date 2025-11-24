package com.rma.recouvrement.gestionusers.repositories;

import com.rma.recouvrement.gestionusers.entities.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.domain.Page;

import java.awt.print.Pageable;
import java.util.ArrayList;
import java.util.List;

public class UserRepositoryImpl implements UserRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    public long countUsers(String nom, String compteNt, Integer idIntermediaire) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<User> user = cq.from(User.class);

        List<Predicate> predicates = new ArrayList<>();

        if (nom != null && !nom.isEmpty()) {
            predicates.add(cb.like(cb.upper(user.get("nom")), "%" + nom.toUpperCase() + "%"));
        }
        if (compteNt != null && !compteNt.isEmpty()) {
            // Recherche exacte pour compteNt (sans LIKE)
            predicates.add(cb.equal(user.get("compteNt"), compteNt));
        }
        // Ajout du critère idIntermediaire (recherche exacte) - CORRIGÉ
        if (idIntermediaire != null) {
            predicates.add(cb.equal(user.get("idIntermediaire"), idIntermediaire));
        }

        cq.select(cb.count(user)).where(cb.and(predicates.toArray(new Predicate[0])));

        return entityManager.createQuery(cq).getSingleResult();
    }

    @Override
    public List<User> searchUsers(String nom, String compteNt, Integer idIntermediaire, int page, int size) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<User> cq = cb.createQuery(User.class);
        Root<User> user = cq.from(User.class);

        List<Predicate> predicates = new ArrayList<>();

        if (nom != null && !nom.isEmpty()) {
            predicates.add(cb.like(cb.upper(user.get("nom")), "%" + nom.toUpperCase() + "%"));
        }
        if (compteNt != null && !compteNt.isEmpty()) {
        // Recherche exacte pour compteNt (sans LIKE) - CORRIGÉ
            predicates.add(cb.equal(user.get("compteNt"), compteNt));
        }
        // Ajout du critère idIntermediaire (recherche exacte) - CORRIGÉ
        if (idIntermediaire != null) {
            predicates.add(cb.equal(user.get("idIntermediaire"), idIntermediaire));
        }

        cq.where(cb.and(predicates.toArray(new Predicate[0])));

        TypedQuery<User> typedQuery = entityManager.createQuery(cq);
        typedQuery.setFirstResult(page * size);
        typedQuery.setMaxResults(size);

        return typedQuery.getResultList();
    }
}