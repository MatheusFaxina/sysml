package com.matheusfaxina.api.resource;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.matheusfaxina.api.model.Configuracao;
import com.matheusfaxina.api.repository.Configuracoes;
import com.matheusfaxina.api.service.ConfiguracaoService;

@RestController
@RequestMapping("/configuracao")
public class ConfiguracaoResource {

	@Autowired
	private Configuracoes configuracoes;

	@Autowired
	private ConfiguracaoService configuracaoService;

	@GetMapping("/v1/todas")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_CONFIGURACAO') and #oauth2.hasScope('read')")
	public List<Configuracao> listar() {
		return configuracoes.findAll();
	}

	@GetMapping("/v1/buscar-pelo-codigo/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_CONFIGURACAO') and #oauth2.hasScope('read')")
	public ResponseEntity<Configuracao> buscarPeloCodigo(@PathVariable Long codigo) {
		Configuracao configuracao = configuracoes.findOne(codigo);
		return configuracao != null ? ResponseEntity.ok(configuracao) : ResponseEntity.notFound().build();
	}

	@PutMapping("/v1/atualizar/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_ALTERAR_CONFIGURACAO') and #oauth2.hasScope('read')")
	public ResponseEntity<Configuracao> atualizar(@PathVariable Long codigo,
			@Valid @RequestBody Configuracao configuracao) {
		Configuracao configuracaoSalvo = configuracaoService.atualizar(codigo, configuracao);

		return ResponseEntity.ok(configuracaoSalvo);
	}

}
