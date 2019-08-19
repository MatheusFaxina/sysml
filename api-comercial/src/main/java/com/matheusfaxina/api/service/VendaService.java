package com.matheusfaxina.api.service;

import java.time.LocalDate;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.matheusfaxina.api.model.MovimentacaoCaixa;
import com.matheusfaxina.api.model.Produto;
import com.matheusfaxina.api.model.Venda;
import com.matheusfaxina.api.repository.MovimentacoesCaixa;
import com.matheusfaxina.api.repository.Produtos;
import com.matheusfaxina.api.repository.Vendas;

@Service
public class VendaService {

	@Autowired
	private Vendas vendas;

	@Autowired
	private Produtos produtos;

	@Autowired
	private MovimentacoesCaixa movimentacoesCaixa;

	public Venda salvar(Venda venda) throws Exception {
		if (venda.getProduto().getEstoque() >= 1) {
			Produto produto = produtos.findOne(venda.getProduto().getCodigo());

			produto.baixaEstoque();
			venda.setLucro(produto.getLucro());
			venda.setValorTotal(produto.getValorVenda());
			venda.setDataVenda(LocalDate.now());

			vendas.save(venda);

			gerarMovimentacaoCaixa(venda, produto);
		} else {
			throw new Exception("Produto sem Estoque.");
		}

		return venda;
	}

	public Venda devolver(Long codigo, Venda venda) throws Exception {
		Venda vendaSalvo = buscarVendaPeloCodigo(codigo);

		if (venda.isDevolucao() == false) {
			Produto produto = produtos.findOne(venda.getProduto().getCodigo());
			produto.adicionaEstoque();

			BeanUtils.copyProperties(venda, vendaSalvo, "codigo");
			
			vendaSalvo.setDevolucao(true);
			
			vendas.save(vendaSalvo);
		} else {
			throw new Exception("Essa venda já foi devolvida.");
		}

		return vendaSalvo;
	}

	private void gerarMovimentacaoCaixa(Venda venda, Produto produto) {
		MovimentacaoCaixa movimentacaoCaixa = new MovimentacaoCaixa();
		movimentacaoCaixa.setData(LocalDate.now());
		movimentacaoCaixa.setValorCusto(produto.getValorCustoTotal());
		movimentacaoCaixa.setValorLucro(produto.getLucro());
		movimentacaoCaixa.setValorVenda(produto.getValorVenda());
		movimentacaoCaixa.setVenda(venda);
		movimentacoesCaixa.save(movimentacaoCaixa);
	}

	public Venda buscarVendaPeloCodigo(Long codigo) {
		Venda vendaSalvo = vendas.findOne(codigo);

		if (vendaSalvo == null) {
			throw new EmptyResultDataAccessException(1);
		}
		return vendaSalvo;
	}

}
