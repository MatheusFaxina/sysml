package com.matheusfaxina.api.repository.produtos;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.matheusfaxina.api.model.Produto;
import com.matheusfaxina.api.repository.filter.ProdutoFilter;

public interface ProdutosQuery {

	public abstract Page<Produto> filtrar(ProdutoFilter produtoFilter, Pageable pageAble);

}
