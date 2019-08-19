package com.matheusfaxina.api.model;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "produto")
public class Produto implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long codigo;

	@NotNull(message = "O nome é obrigatório.")
	private String nome;

	@NotNull(message = "O link é obrigatório.")
	private String link;

	@NotNull(message = "O frete é obrigatório.")
	@ManyToOne
	@JoinColumn(name = "codigo_frete")
	private Frete frete;

	@NotNull(message = "O anúncio é obrigatório.")
	@ManyToOne
	@JoinColumn(name = "codigo_anuncio")
	private Anuncio anuncio;

	@NotNull(message = "O valor de custo é obrigatório.")
	@Column(name = "valor_custo_sem_frete_e_anuncio")
	private BigDecimal valorCustoSemFreteEAnuncio;

	@NotNull(message = "O valor de venda é obrigatório.")
	@Column(name = "valor_venda")
	private BigDecimal valorVenda;

	private BigDecimal valorCustoTotal;

	@NotNull(message = "O lucro é obrigatório.")
	private BigDecimal lucro;

	@Column(name = "porcentagem_lucro")
	private Integer porcentagemLucro;

	@NotNull(message = "O estoque é obrigatório.")
	private Integer estoque;

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public Anuncio getAnuncio() {
		return anuncio;
	}

	public void setAnuncio(Anuncio anuncio) {
		this.anuncio = anuncio;
	}

	public BigDecimal getValorCustoSemFreteEAnuncio() {
		return valorCustoSemFreteEAnuncio;
	}

	public void setValorCustoSemFreteEAnuncio(BigDecimal valorCustoSemFreteEAnuncio) {
		this.valorCustoSemFreteEAnuncio = valorCustoSemFreteEAnuncio;
	}

	public BigDecimal getValorCustoTotal() {
		return valorCustoTotal;
	}

	public void setValorCustoTotal(BigDecimal valorCustoTotal) {
		this.valorCustoTotal = valorCustoTotal;
	}

	public BigDecimal getLucro() {
		return lucro;
	}

	public void setLucro(BigDecimal lucro) {
		this.lucro = lucro;
	}

	public void setFrete(Frete frete) {
		this.frete = frete;
	}

	public Long getCodigo() {
		return codigo;
	}

	public void setCodigo(Long codigo) {
		this.codigo = codigo;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Frete getFrete() {
		return frete;
	}

	public BigDecimal getValorVenda() {
		return valorVenda;
	}

	public void setValorVenda(BigDecimal valorVenda) {
		this.valorVenda = valorVenda;
	}

	public Integer getPorcentagemLucro() {
		return porcentagemLucro;
	}

	public void setPorcentagemLucro(Integer porcentagemLucro) {
		this.porcentagemLucro = porcentagemLucro;
	}

	public Integer getEstoque() {
		return estoque;
	}

	public void setEstoque(Integer estoque) {
		this.estoque = estoque;
	}
	
	public void baixaEstoque() {
		setEstoque(getEstoque() - 1);
	}
	
	public void adicionaEstoque() {
		setEstoque(getEstoque() + 1);
	}

	public void calculaPorcentagemLucro(BigDecimal lucro, BigDecimal custoTotal) {
		BigDecimal valor = lucro.divide(custoTotal, BigDecimal.ROUND_UP);
		BigDecimal valorCorreto = valor.multiply(new BigDecimal(100));
		setPorcentagemLucro(valorCorreto.intValue());
	}

	public void calculaLucro(BigDecimal valorVenda, BigDecimal valorCusto) {
		setLucro(valorVenda.subtract(valorCusto));
	}

	public void calculaValorCustoTotal(BigDecimal valor) {
		int porcentagem = getAnuncio().getPorcentagem().intValue();
		BigDecimal porcentagemTransformada = new BigDecimal(porcentagem);
		setValorCustoTotal(valor.multiply(porcentagemTransformada).divide(new BigDecimal(100))
				.add(getValorCustoSemFreteEAnuncio()).add(getFrete().getValor()));
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((codigo == null) ? 0 : codigo.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Produto other = (Produto) obj;
		if (codigo == null) {
			if (other.codigo != null)
				return false;
		} else if (!codigo.equals(other.codigo))
			return false;
		return true;
	}

}
