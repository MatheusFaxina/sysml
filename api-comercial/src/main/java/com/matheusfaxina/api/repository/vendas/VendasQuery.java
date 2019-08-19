package com.matheusfaxina.api.repository.vendas;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.matheusfaxina.api.model.Venda;
import com.matheusfaxina.api.repository.filter.VendaFilter;

public interface VendasQuery {

	public abstract Page<Venda> filtrar(VendaFilter vendaFilter, Pageable pageAble);

}
