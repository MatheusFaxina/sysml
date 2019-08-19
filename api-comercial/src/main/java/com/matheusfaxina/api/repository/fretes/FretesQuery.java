package com.matheusfaxina.api.repository.fretes;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.matheusfaxina.api.model.Frete;
import com.matheusfaxina.api.repository.filter.FreteFilter;

public interface FretesQuery {

	public abstract Page<Frete> filtrar(FreteFilter freteFilter, Pageable pageAble);

}
