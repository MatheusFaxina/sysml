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
import com.matheusfaxina.api.model.Frete;
import com.matheusfaxina.api.repository.Fretes;
import com.matheusfaxina.api.repository.filter.FreteFilter;
import com.matheusfaxina.api.service.FreteService;

@RestController
@RequestMapping("/fretes")
public class FreteResource {

	@Autowired
	private Fretes fretes;

	@Autowired
	private FreteService freteService;

	@Autowired
	private ApplicationEventPublisher publisher;

	@GetMapping("/v1/todas")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_FRETE') and #oauth2.hasScope('read')")
	public List<Frete> listar() {
		return fretes.findAll();
	}

	@GetMapping("/v1/filtrar")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_FRETE') and #oauth2.hasScope('read')")
	public Page<Frete> Frete(FreteFilter freteFilter, Pageable pageAble) {
		return fretes.filtrar(freteFilter, pageAble);
	}

	@PostMapping("/v1/salvar")
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_FRETE') and #oauth2.hasScope('read')")
	public ResponseEntity<Frete> salvar(@Valid @RequestBody Frete frete, HttpServletResponse response) {
		Frete fretesalvao = freteService.salvar(frete);
		publisher.publishEvent(new RecursoCriadoEvent(this, response, fretesalvao.getCodigo()));
		return ResponseEntity.status(HttpStatus.CREATED).body(fretesalvao);
	}

	@GetMapping("/v1/buscar-pelo-codigo/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_FRETE') and #oauth2.hasScope('read')")
	public ResponseEntity<Frete> buscarPeloCodigo(@PathVariable Long codigo) {
		Frete frete = fretes.findOne(codigo);
		return frete != null ? ResponseEntity.ok(frete) : ResponseEntity.notFound().build();
	}

	@DeleteMapping("/v1/remover/{codigo}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_REMOVER_FRETE') and #oauth2.hasScope('read')")
	public void remover(@PathVariable Long codigo) {
		fretes.delete(codigo);
	}

	@PutMapping("/v1/atualizar/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_FRETE') and #oauth2.hasScope('read')")
	public ResponseEntity<Frete> atualizar(@PathVariable Long codigo, @Valid @RequestBody Frete frete) {
		Frete anunciSalvo = freteService.atualizar(codigo, frete);

		return ResponseEntity.ok(anunciSalvo);
	}

}
