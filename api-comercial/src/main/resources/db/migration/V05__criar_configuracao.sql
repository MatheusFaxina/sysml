CREATE TABLE configuracao (
	codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
	porcentagem_lucro_aceitavel INT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO configuracao(codigo, porcentagem_lucro_aceitavel) VALUES(1, 60);