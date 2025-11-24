package com.rma.recouvrement.gestionusers.mapper;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public abstract class BaseMapper<E,D> {
    public abstract E convertToEntity(D dto, Object... args);

    public abstract D convertToDto(E entity, Object... args);

    public Collection<E> convertToEntity(Collection<D> dto, Object... args) {
        return dto.stream().map(d -> convertToEntity(d, args)).toList();
    }

    public Collection<D> convertToDto(Collection<E> entity, Object... args) {
        return entity.stream().map(e -> convertToDto(e, args)).toList();
    }

    public List<E> convertToEntityList(Collection<D> dto, Object... args) {
        return convertToEntity(dto, args).stream().toList();
    }

    public List<D> convertToDtoList(Collection<E> entity, Object... args) {
        return convertToDto(entity, args).stream().toList();
    }

    public Set<E> convertToEntitySet(Collection<D> dto, Object... args) {
        return new HashSet<>(convertToEntity(dto, args));
    }

    public Set<D> convertToDtoSet(Collection<E> entity, Object... args) {
        return new HashSet<>(convertToDto(entity, args));
    }
}
