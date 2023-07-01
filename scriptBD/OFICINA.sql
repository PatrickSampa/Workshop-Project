create database oficina;

INSERT INTO `usuarios` (`usuario`, `nome`, `senha`, `permissao`) VALUES
('admin', 'admin', 'admin', 'admin'),
('emily', 'emily', 'luna', 'admin')

CREATE TABLE `usuarios` (
  `usuario` varchar(50) not null primary key,
  `nome` varchar(200) unique key DEFAULT NULL,
  `senha` varchar(50) NOT NULL,
  `permissao` varchar(20) NOT NULL
);

select * from usuarios;
select * from clientes;

CREATE TABLE `CLIENTES` (
	`cpf` varchar(20) not null primary key unique key,
    `nome` varchar(80) not null,
    `data_nascimento` date,
    `email` varchar(80),
    `numero_telefone` varchar(25),
    `rg` varchar(15),
	`cidade` varchar(50),
    `bairro` varchar(50),
    `rua` varchar(50),
    `casa` varchar(50),
    `referencia` varchar(500),
    `observacao` varchar(500)
);
CREATE TABLE `veiculos` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `cpf` VARCHAR(20) NOT NULL,
    `marca` VARCHAR(50),
    `tipo` VARCHAR(50),
    `placa` VARCHAR(30),
    `ano` VARCHAR(20),
    `modelo` VARCHAR(50),
    FOREIGN KEY (`cpf`) REFERENCES `CLIENTES` (`cpf`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

