package com.matheusfaxina.api.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.matheusfaxina.api.model.Frete;
import com.matheusfaxina.api.repository.Fretes;

@Service
public class FreteService {
	
	@Autowired
	private Fretes fretes;

	public Frete salvar(Frete frete) {
		return fretes.save(frete);
	}

	public Frete atualizar(Long codigo, Frete frete) {
		Frete freteSalvo = buscarFretePeloCodigo(codigo);

		BeanUtils.copyProperties(frete, freteSalvo, "codigo");

		return fretes.save(freteSalvo);
	}

	public Frete buscarFretePeloCodigo(Long codigo) {
		Frete freteSalvo = fretes.findOne(codigo);

		if (freteSalvo == null) {
			throw new EmptyResultDataAccessException(1);
		}
		return freteSalvo;
	}


}
