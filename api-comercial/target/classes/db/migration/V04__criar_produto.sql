CREATE TABLE produto (
	codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(80) NOT NULL,
	link VARCHAR(120) NOT NULL,
	valor_custo_sem_frete_e_anuncio DECIMAL(10,2) NOT NULL,
	valor_custo_total DECIMAL(10,2),
	lucro DECIMAL(10,2),
	porcentagem_lucro INT,
	estoque INT NOT NULL,
	valor_venda DECIMAL(10,2) NOT NULL,
	codigo_frete BIGINT(20) NOT NULL,
	codigo_anuncio BIGINT(20) NOT NULL,
	FOREIGN KEY (codigo_frete) REFERENCES frete(codigo),
	FOREIGN KEY (codigo_anuncio) REFERENCES anuncio(codigo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO produto(codigo, nome, link, valor_custo_sem_frete_e_anuncio, valor_custo_total, lucro, porcentagem_lucro, estoque, valor_venda, codigo_frete, codigo_anuncio) 
VALUES (1, "111111111", "1111111111111", 30.99, 30.99, 6011.99, 90, 2, 159.00, 1, 1);