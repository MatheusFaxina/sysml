package com.matheusfaxina.api.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.matheusfaxina.api.model.Anuncio;
import com.matheusfaxina.api.repository.Anuncios;

@Service
public class AnuncioService {
	
	@Autowired
	private Anuncios anuncios;

	public Anuncio salvar(Anuncio anuncio) {
		return anuncios.save(anuncio);
	}

	public Anuncio atualizar(Long codigo, Anuncio anuncio) {
		Anuncio anuncioSalvo = buscarAnuncioPeloCodigo(codigo);

		BeanUtils.copyProperties(anuncio, anuncioSalvo, "codigo");

		return anuncios.save(anuncioSalvo);
	}

	public Anuncio buscarAnuncioPeloCodigo(Long codigo) {
		Anuncio anuncioSalvo = anuncios.findOne(codigo);

		if (anuncioSalvo == null) {
			throw new EmptyResultDataAccessException(1);
		}
		return anuncioSalvo;
	}


}
