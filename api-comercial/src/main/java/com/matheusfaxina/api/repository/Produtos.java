package com.matheusfaxina.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.matheusfaxina.api.model.Produto;
import com.matheusfaxina.api.repository.produtos.ProdutosQuery;

public interface Produtos extends JpaRepository<Produto, Long>, ProdutosQuery {

}
