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
import com.matheusfaxina.api.model.Venda;
import com.matheusfaxina.api.repository.Vendas;
import com.matheusfaxina.api.repository.filter.VendaFilter;
import com.matheusfaxina.api.service.VendaService;

@RestController
@RequestMapping("/vendas")
public class VendaResource {

	@Autowired
	private Vendas vendas;

	@Autowired
	private VendaService vendaService;

	@Autowired
	private ApplicationEventPublisher publisher;

	@GetMapping("/v1/todas")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_VENDA') and #oauth2.hasScope('read')")
	public List<Venda> listar() {
		return vendas.findAll();
	}

	@GetMapping("/v1/filtrar")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_VENDA') and #oauth2.hasScope('read')")
	public Page<Venda> Venda(VendaFilter vendaFilter, Pageable pageAble) {
		return vendas.filtrar(vendaFilter, pageAble);
	}

	@PostMapping("/v1/salvar")
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_VENDA') and #oauth2.hasScope('read')")
	public ResponseEntity<Venda> salvar(@Valid @RequestBody Venda venda, HttpServletResponse response)
			throws Exception {
		Venda vendasalvao = vendaService.salvar(venda);
		publisher.publishEvent(new RecursoCriadoEvent(this, response, vendasalvao.getCodigo()));
		return ResponseEntity.status(HttpStatus.CREATED).body(vendasalvao);
	}

	@PutMapping("/v1/devolver/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_DEVOLVER_VENDA') and #oauth2.hasScope('read')")
	public ResponseEntity<Venda> devolver(@PathVariable Long codigo, @Valid @RequestBody Venda venda) throws Exception {
		Venda vendaSalvo = vendaService.devolver(codigo, venda);

		return ResponseEntity.ok(vendaSalvo);
	}

	@GetMapping("/v1/buscar-pelo-codigo/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_VENDA') and #oauth2.hasScope('read')")
	public ResponseEntity<Venda> buscarPeloCodigo(@PathVariable Long codigo) {
		Venda venda = vendas.findOne(codigo);
		return venda != null ? ResponseEntity.ok(venda) : ResponseEntity.notFound().build();
	}

	@DeleteMapping("/v1/remover/{codigo}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_REMOVER_VENDA') and #oauth2.hasScope('read')")
	public void remover(@PathVariable Long codigo) {
		vendas.delete(codigo);
	}

}
