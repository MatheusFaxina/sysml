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
import com.matheusfaxina.api.model.Produto;
import com.matheusfaxina.api.repository.Produtos;
import com.matheusfaxina.api.repository.filter.ProdutoFilter;
import com.matheusfaxina.api.service.ProdutoService;

@RestController
@RequestMapping("/produtos")
public class ProdutoResource {

	@Autowired
	private Produtos produtos;

	@Autowired
	private ProdutoService produtoService;

	@Autowired
	private ApplicationEventPublisher publisher;

	@GetMapping("/v1/todas")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_PRODUTO') and #oauth2.hasScope('read')")
	public List<Produto> listar() {
		return produtos.findAll();
	}

	@GetMapping("/v1/filtrar")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_PRODUTO') and #oauth2.hasScope('read')")
	public Page<Produto> Produto(ProdutoFilter produtoFilter, Pageable pageAble) {
		return produtos.filtrar(produtoFilter, pageAble);
	}

	@PostMapping("/v1/salvar")
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_PRODUTO') and #oauth2.hasScope('read')")
	public ResponseEntity<Produto> salvar(@Valid @RequestBody Produto produto, HttpServletResponse response) throws Exception {
		Produto produtosalvao = produtoService.salvar(produto);
		publisher.publishEvent(new RecursoCriadoEvent(this, response, produtosalvao.getCodigo()));
		return ResponseEntity.status(HttpStatus.CREATED).body(produtosalvao);
	}

	@GetMapping("/v1/buscar-pelo-codigo/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_PESQUISAR_PRODUTO') and #oauth2.hasScope('read')")
	public ResponseEntity<Produto> buscarPeloCodigo(@PathVariable Long codigo) {
		Produto produto = produtos.findOne(codigo);
		return produto != null ? ResponseEntity.ok(produto) : ResponseEntity.notFound().build();
	}

	@DeleteMapping("/v1/remover/{codigo}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_REMOVER_PRODUTO') and #oauth2.hasScope('read')")
	public void remover(@PathVariable Long codigo) {
		produtos.delete(codigo);
	}

	@PutMapping("/v1/atualizar/{codigo}")
	@PreAuthorize("hasAuthority('ROLE_CADASTRAR_PRODUTO') and #oauth2.hasScope('read')")
	public ResponseEntity<Produto> atualizar(@PathVariable Long codigo, @Valid @RequestBody Produto produto) throws Exception {
		Produto anunciSalvo = produtoService.atualizar(codigo, produto);

		return ResponseEntity.ok(anunciSalvo);
	}

}
