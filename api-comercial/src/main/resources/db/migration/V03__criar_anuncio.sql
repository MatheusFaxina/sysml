CREATE TABLE anuncio (
	codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50) NOT NULL,
	porcentagem INT NOT NULL,
	parcelamento BOOLEAN NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO anuncio(codigo, nome, porcentagem, parcelamento) VALUES(1, "Premium", 16, TRUE);