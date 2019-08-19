CREATE TABLE venda (
	codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	data_venda DATE,
	valor_total DECIMAL(10,2),
	lucro DECIMAL(10,2),
	numero_venda FLOAT NOT NULL,
	devolucao BOOLEAN NOT NULL,
	codigo_produto BIGINT(20) NOT NULL,
	FOREIGN KEY (codigo_produto) REFERENCES produto(codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;