package com.matheusfaxina.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.matheusfaxina.api.model.Anuncio;
import com.matheusfaxina.api.repository.anuncios.AnunciosQuery;

public interface Anuncios extends JpaRepository<Anuncio, Long>, AnunciosQuery {

}
