package com.rma.recouvrement.gestionusers.pagination;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class PagedResult<T> {
    private List<T> data;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;

    public PagedResult(List<T> data, int page, int size, long totalElements) {
        this.data = data;
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = (int) Math.ceil((double) totalElements / size);
    }
}
