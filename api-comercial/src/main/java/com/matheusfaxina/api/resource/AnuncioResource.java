package com.matheusfaxina.api.resource;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.matheusfaxina.api.event.RecursoCriadoEvent;
import com.matheusfaxina.api.model.Anuncio;
import com.matheusfaxina.api.repository.Anuncios;
import com.matheusfaxina.api.repository.filter.AnuncioFilter;
import com.matheusfaxina.api.service.AnuncioService;

@RestController
@RequestMapping("/anuncios")
public class AnuncioResource {

	@Autowired
	private Anuncios anuncios;

	@Autowired
	private AnuncioService anuncioService;

	@Autowired
	private ApplicationEventPublisher publisher;

	@GetMapping("/v1/todas")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_ANUNCIO') and #oauth2.hasScope('read')")
	public List<Anuncio> listar() {
		return anuncios.findAll();
	}

	@GetMapping("/v1/filtrar")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_ANUNCIO') and #oauth2.hasScope('read')")
	public Page<Anuncio> Anuncio(AnuncioFilter anuncioFilter, Pageable pageAble) {
		return anuncios.filtrar(anuncioFilter, pageAble);
	}

	@PostMapping("/v1/salvar")
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_ANUNCIO') and #oauth2.hasScope('read')")
	public ResponseEntity<Anuncio> salvar(@Valid @RequestBody Anuncio anuncio, HttpServletResponse response) {
		Anuncio anunciosalvao = anuncioService.salvar(anuncio);
		publisher.publishEvent(new RecursoCriadoEvent(this, response, anunciosalvao.getCodigo()));
		return ResponseEntity.status(HttpStatus.CREATED).body(anunciosalvao);
	}

	@GetMapping("/v1/buscar-pelo-codigo/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_ANUNCIO') and #oauth2.hasScope('read')")
	public ResponseEntity<Anuncio> buscarPeloCodigo(@PathVariable Long codigo) {
		Anuncio anuncio = anuncios.findOne(codigo);
		return anuncio != null ? ResponseEntity.ok(anuncio) : ResponseEntity.notFound().build();
	}

	@DeleteMapping("/v1/remover/{codigo}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_REMOVER_ANUNCIO') and #oauth2.hasScope('read')")
	public void remover(@PathVariable Long codigo) {
		anuncios.delete(codigo);
	}

	@PutMapping("/v1/atualizar/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_ANUNCIO') and #oauth2.hasScope('read')")
	public ResponseEntity<Anuncio> atualizar(@PathVariable Long codigo, @Valid @RequestBody Anuncio anuncio) {
		Anuncio anunciSalvo = anuncioService.atualizar(codigo, anuncio);

		return ResponseEntity.ok(anunciSalvo);
	}

}
