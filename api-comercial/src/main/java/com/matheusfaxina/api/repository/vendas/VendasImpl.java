package com.matheusfaxina.api.repository.vendas;

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

import com.matheusfaxina.api.model.Venda;
import com.matheusfaxina.api.repository.filter.VendaFilter;

public class VendasImpl implements VendasQuery {

	@PersistenceContext
	private EntityManager manager;

	@Override
	public Page<Venda> filtrar(VendaFilter VendaFilter, Pageable pageAble) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Venda> criteria = builder.createQuery(Venda.class);
		Root<Venda> root = criteria.from(Venda.class);

		// criar as restrições
		Predicate[] predicates = criarRestricoes(VendaFilter, builder, root);
		criteria.where(predicates);

		TypedQuery<Venda> query = manager.createQuery(criteria);
		adicionarRestricoesDePaginacaoNaQuery(query, pageAble);

		return new PageImpl<>(query.getResultList(), pageAble, total(VendaFilter));
	}

	private Long total(VendaFilter VendaFilter) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Long> criteria = builder.createQuery(Long.class);
		Root<Venda> root = criteria.from(Venda.class);

		Predicate[] predicates = criarRestricoes(VendaFilter, builder, root);
		criteria.where(predicates);

		criteria.select(builder.count(root));

		return manager.createQuery(criteria).getSingleResult();
	}

	private void adicionarRestricoesDePaginacaoNaQuery(TypedQuery<Venda> query, Pageable pageAble) {
		int paginaAtual = pageAble.getPageNumber();
		int totalRegistrosPorPagina = pageAble.getPageSize();
		int primeiroRegistroDaPagina = paginaAtual * totalRegistrosPorPagina;

		query.setFirstResult(primeiroRegistroDaPagina);
		query.setMaxResults(totalRegistrosPorPagina);
	}

	private Predicate[] criarRestricoes(VendaFilter VendaFilter, CriteriaBuilder builder, Root<Venda> root) {
		List<Predicate> predicates = new ArrayList<>();

		// WHERE descricao LIKE '%jogos%'
		if (!StringUtils.isEmpty(VendaFilter.getNome())) {
			predicates.add(builder.like(builder.lower(root.get("nome")),
					"%" + VendaFilter.getNome().toLowerCase() + "%"));
		}

		return predicates.toArray(new Predicate[predicates.size()]);
	}

}
