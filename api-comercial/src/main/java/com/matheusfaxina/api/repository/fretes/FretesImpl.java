package com.matheusfaxina.api.repository.fretes;

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

import com.matheusfaxina.api.model.Frete;
import com.matheusfaxina.api.repository.filter.FreteFilter;

public class FretesImpl implements FretesQuery {

	@PersistenceContext
	private EntityManager manager;

	@Override
	public Page<Frete> filtrar(FreteFilter FreteFilter, Pageable pageAble) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Frete> criteria = builder.createQuery(Frete.class);
		Root<Frete> root = criteria.from(Frete.class);

		// criar as restrições
		Predicate[] predicates = criarRestricoes(FreteFilter, builder, root);
		criteria.where(predicates);

		TypedQuery<Frete> query = manager.createQuery(criteria);
		adicionarRestricoesDePaginacaoNaQuery(query, pageAble);

		return new PageImpl<>(query.getResultList(), pageAble, total(FreteFilter));
	}

	private Long total(FreteFilter FreteFilter) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Long> criteria = builder.createQuery(Long.class);
		Root<Frete> root = criteria.from(Frete.class);

		Predicate[] predicates = criarRestricoes(FreteFilter, builder, root);
		criteria.where(predicates);

		criteria.select(builder.count(root));

		return manager.createQuery(criteria).getSingleResult();
	}

	private void adicionarRestricoesDePaginacaoNaQuery(TypedQuery<Frete> query, Pageable pageAble) {
		int paginaAtual = pageAble.getPageNumber();
		int totalRegistrosPorPagina = pageAble.getPageSize();
		int primeiroRegistroDaPagina = paginaAtual * totalRegistrosPorPagina;

		query.setFirstResult(primeiroRegistroDaPagina);
		query.setMaxResults(totalRegistrosPorPagina);
	}

	private Predicate[] criarRestricoes(FreteFilter FreteFilter, CriteriaBuilder builder, Root<Frete> root) {
		List<Predicate> predicates = new ArrayList<>();

		// WHERE descricao LIKE '%jogos%'
		if (!StringUtils.isEmpty(FreteFilter.getNome())) {
			predicates.add(builder.like(builder.lower(root.get("nome")),
					"%" + FreteFilter.getNome().toLowerCase() + "%"));
		}

		return predicates.toArray(new Predicate[predicates.size()]);
	}

}
