package com.matheusfaxina.api.repository.anuncios;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.matheusfaxina.api.model.Anuncio;
import com.matheusfaxina.api.repository.filter.AnuncioFilter;

public interface AnunciosQuery {

	public abstract Page<Anuncio> filtrar(AnuncioFilter anuncioFilter, Pageable pageAble);

}
