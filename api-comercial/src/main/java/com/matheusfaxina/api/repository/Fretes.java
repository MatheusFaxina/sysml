package com.matheusfaxina.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.matheusfaxina.api.model.Frete;
import com.matheusfaxina.api.repository.fretes.FretesQuery;

public interface Fretes extends JpaRepository<Frete, Long>, FretesQuery {

}
