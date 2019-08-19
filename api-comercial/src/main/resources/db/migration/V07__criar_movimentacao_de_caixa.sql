CREATE TABLE movimentacao_de_caixa (
	codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	data DATE,
	valor_venda DECIMAL(10,2),
	valor_lucro DECIMAL(10,2),
	valor_custo DECIMAL(10,2),
	codigo_venda BIGINT(20) NOT NULL,
	FOREIGN KEY (codigo_venda) REFERENCES venda(codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;