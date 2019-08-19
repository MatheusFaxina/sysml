package com.matheusfaxina.api.repository.produtos;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;

import com.matheusfaxina.api.model.Produto;
import com.matheusfaxina.api.repository.filter.ProdutoFilter;

public class ProdutosImpl implements ProdutosQuery {

	@PersistenceContext
	private EntityManager manager;

	@Override
	public Page<Produto> filtrar(ProdutoFilter ProdutoFilter, Pageable pageAble) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Produto> criteria = builder.createQuery(Produto.class);
		Root<Produto> root = criteria.from(Produto.class);

		// criar as restrições
		Predicate[] predicates = criarRestricoes(ProdutoFilter, builder, root);
		criteria.where(predicates);

		TypedQuery<Produto> query = manager.createQuery(criteria);
		adicionarRestricoesDePaginacaoNaQuery(query, pageAble);

		return new PageImpl<>(query.getResultList(), pageAble, total(ProdutoFilter));
	}

	private Long total(ProdutoFilter ProdutoFilter) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Long> criteria = builder.createQuery(Long.class);
		Root<Produto> root = criteria.from(Produto.class);

		Predicate[] predicates = criarRestricoes(ProdutoFilter, builder, root);
		criteria.where(predicates);

		criteria.select(builder.count(root));

		return manager.createQuery(criteria).getSingleResult();
	}

	private void adicionarRestricoesDePaginacaoNaQuery(TypedQuery<Produto> query, Pageable pageAble) {
		int paginaAtual = pageAble.getPageNumber();
		int totalRegistrosPorPagina = pageAble.getPageSize();
		int primeiroRegistroDaPagina = paginaAtual * totalRegistrosPorPagina;

		query.setFirstResult(primeiroRegistroDaPagina);
		query.setMaxResults(totalRegistrosPorPagina);
	}

	private Predicate[] criarRestricoes(ProdutoFilter ProdutoFilter, CriteriaBuilder builder, Root<Produto> root) {
		List<Predicate> predicates = new ArrayList<>();

		// WHERE descricao LIKE '%jogos%'
		if (!StringUtils.isEmpty(ProdutoFilter.getNome())) {
			predicates.add(builder.like(builder.lower(root.get("nome")),
					"%" + ProdutoFilter.getNome().toLowerCase() + "%"));
		}

		return predicates.toArray(new Predicate[predicates.size()]);
	}

}
