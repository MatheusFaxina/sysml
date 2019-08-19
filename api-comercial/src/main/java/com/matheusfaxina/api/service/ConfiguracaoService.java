package com.matheusfaxina.api.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.matheusfaxina.api.model.Configuracao;
import com.matheusfaxina.api.repository.Configuracoes;

@Service
public class ConfiguracaoService {
	
	@Autowired
	private Configuracoes configuracoes;

	public Configuracao atualizar(Long codigo, Configuracao configuracao) {
		Configuracao configuracaoSalvo = buscarConfiguracaoPeloCodigo(codigo);

		BeanUtils.copyProperties(configuracao, configuracaoSalvo, "codigo");

		return configuracoes.save(configuracaoSalvo);
	}

	public Configuracao buscarConfiguracaoPeloCodigo(Long codigo) {
		Configuracao configuracaoSalvo = configuracoes.findOne(codigo);

		if (configuracaoSalvo == null) {
			throw new EmptyResultDataAccessException(1);
		}
		return configuracaoSalvo;
	}


}
