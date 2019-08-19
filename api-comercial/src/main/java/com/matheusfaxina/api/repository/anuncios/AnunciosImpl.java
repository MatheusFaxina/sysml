package com.matheusfaxina.api.repository.anuncios;

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

import com.matheusfaxina.api.model.Anuncio;
import com.matheusfaxina.api.repository.filter.AnuncioFilter;

public class AnunciosImpl implements AnunciosQuery {

	@PersistenceContext
	private EntityManager manager;

	@Override
	public Page<Anuncio> filtrar(AnuncioFilter AnuncioFilter, Pageable pageAble) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Anuncio> criteria = builder.createQuery(Anuncio.class);
		Root<Anuncio> root = criteria.from(Anuncio.class);

		// criar as restrições
		Predicate[] predicates = criarRestricoes(AnuncioFilter, builder, root);
		criteria.where(predicates);

		TypedQuery<Anuncio> query = manager.createQuery(criteria);
		adicionarRestricoesDePaginacaoNaQuery(query, pageAble);

		return new PageImpl<>(query.getResultList(), pageAble, total(AnuncioFilter));
	}

	private Long total(AnuncioFilter AnuncioFilter) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Long> criteria = builder.createQuery(Long.class);
		Root<Anuncio> root = criteria.from(Anuncio.class);

		Predicate[] predicates = criarRestricoes(AnuncioFilter, builder, root);
		criteria.where(predicates);

		criteria.select(builder.count(root));

		return manager.createQuery(criteria).getSingleResult();
	}

	private void adicionarRestricoesDePaginacaoNaQuery(TypedQuery<Anuncio> query, Pageable pageAble) {
		int paginaAtual = pageAble.getPageNumber();
		int totalRegistrosPorPagina = pageAble.getPageSize();
		int primeiroRegistroDaPagina = paginaAtual * totalRegistrosPorPagina;

		query.setFirstResult(primeiroRegistroDaPagina);
		query.setMaxResults(totalRegistrosPorPagina);
	}

	private Predicate[] criarRestricoes(AnuncioFilter AnuncioFilter, CriteriaBuilder builder, Root<Anuncio> root) {
		List<Predicate> predicates = new ArrayList<>();

		// WHERE descricao LIKE '%jogos%'
		if (!StringUtils.isEmpty(AnuncioFilter.getNome())) {
			predicates.add(builder.like(builder.lower(root.get("nome")),
					"%" + AnuncioFilter.getNome().toLowerCase() + "%"));
		}

		return predicates.toArray(new Predicate[predicates.size()]);
	}

}
