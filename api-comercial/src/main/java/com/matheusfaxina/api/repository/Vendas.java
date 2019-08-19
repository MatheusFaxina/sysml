package com.matheusfaxina.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.matheusfaxina.api.model.Venda;
import com.matheusfaxina.api.repository.vendas.VendasQuery;

public interface Vendas extends JpaRepository<Venda, Long>, VendasQuery {

}
