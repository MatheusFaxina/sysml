package com.matheusfaxina.api.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.matheusfaxina.api.model.Configuracao;
import com.matheusfaxina.api.model.Produto;
import com.matheusfaxina.api.repository.Configuracoes;
import com.matheusfaxina.api.repository.Produtos;

@Service
public class ProdutoService {
	
	@Autowired
	private Produtos produtos;
	
	@Autowired
	private Configuracoes configuracoes;
	
	public Configuracao buscaConfiguracao() {
		Configuracao configuracaoBuscada = configuracoes.findOne(1L);
		
		return configuracaoBuscada;
	}

	public Produto salvar(Produto produto) throws Exception {
		Configuracao configuracao = buscaConfiguracao();
		produto.calculaValorCustoTotal(produto.getValorVenda());
		produto.calculaLucro(produto.getValorVenda(), produto.getValorCustoTotal());
		produto.calculaPorcentagemLucro(produto.getLucro(), produto.getValorCustoTotal());
		
		if (produto.getPorcentagemLucro() < configuracao.getPorcentagemLucroAceitavel()) {
			throw new Exception("A porcentagem de lucro: " + produto.getPorcentagemLucro() +"% é menor do que a miníma configurada que é: " + configuracao.getPorcentagemLucroAceitavel() + "%.");
		}
		
		return produtos.save(produto);
	}

	public Produto atualizar(Long codigo, Produto produto) throws Exception {
		Configuracao configuracao = buscaConfiguracao();
		
		Produto produtoSalvo = buscarProdutoPeloCodigo(codigo);

		BeanUtils.copyProperties(produto, produtoSalvo, "codigo");
		
		produto.calculaValorCustoTotal(produto.getValorVenda());
		produto.calculaLucro(produto.getValorVenda(), produto.getValorCustoTotal());
		produto.calculaPorcentagemLucro(produto.getLucro(), produto.getValorCustoTotal());
		
		if (produto.getPorcentagemLucro() < configuracao.getPorcentagemLucroAceitavel()) {
			throw new Exception("A porcentagem de lucro: " + produto.getPorcentagemLucro() +"% é menor do que a miníma configurada que é: " + configuracao.getPorcentagemLucroAceitavel() + "%.");
		}

		return produtos.save(produtoSalvo);
	}

	public Produto buscarProdutoPeloCodigo(Long codigo) {
		Produto produtoSalvo = produtos.findOne(codigo);

		if (produtoSalvo == null) {
			throw new EmptyResultDataAccessException(1);
		}
		return produtoSalvo;
	}


}
