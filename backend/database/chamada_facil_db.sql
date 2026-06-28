-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 28/06/2026 às 18:50
-- Versão do servidor: 9.1.0
-- Versão do PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `chamada_facil`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `alunos`
--

DROP TABLE IF EXISTS `alunos`;
CREATE TABLE IF NOT EXISTS `alunos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `turma_id` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `turma_id` (`turma_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `alunos`
--

INSERT INTO `alunos` (`id`, `turma_id`, `nome`) VALUES
(1, 1, 'Ana Beatriz Adão Custódio'),
(2, 1, 'Ana Beatriz Machado'),
(3, 1, 'Carlos Eduardo'),
(4, 1, 'Daniela Rocha'),
(5, 2, 'Eduardo Lima');

-- --------------------------------------------------------

--
-- Estrutura para tabela `chamadas`
--

DROP TABLE IF EXISTS `chamadas`;
CREATE TABLE IF NOT EXISTS `chamadas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `turma_id` int NOT NULL,
  `data_chamada` date NOT NULL,
  `conteudo_aula` text NOT NULL,
  `qtd_aulas` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `turma_id` (`turma_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `chamadas`
--

INSERT INTO `chamadas` (`id`, `turma_id`, `data_chamada`, `conteudo_aula`, `qtd_aulas`) VALUES
(1, 1, '2026-06-26', 'Revolução Francesa', 1),
(2, 1, '2026-06-28', 'História da América', 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `frequencias`
--

DROP TABLE IF EXISTS `frequencias`;
CREATE TABLE IF NOT EXISTS `frequencias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chamada_id` int NOT NULL,
  `aluno_id` int NOT NULL,
  `status` enum('presente','falta','justificada') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `chamada_id` (`chamada_id`),
  KEY `aluno_id` (`aluno_id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `frequencias`
--

INSERT INTO `frequencias` (`id`, `chamada_id`, `aluno_id`, `status`) VALUES
(1, 1, 1, 'presente'),
(2, 1, 2, 'presente'),
(3, 1, 3, 'presente'),
(4, 1, 4, 'presente'),
(5, 2, 1, 'falta'),
(6, 2, 2, 'justificada'),
(7, 2, 3, 'presente'),
(8, 2, 4, 'presente'),
(9, 3, 1, 'falta'),
(10, 3, 2, 'presente'),
(11, 3, 3, 'falta'),
(12, 3, 4, 'presente');

-- --------------------------------------------------------

--
-- Estrutura para tabela `professores`
--

DROP TABLE IF EXISTS `professores`;
CREATE TABLE IF NOT EXISTS `professores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) NOT NULL,
  `senha` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `professores`
--

INSERT INTO `professores` (`id`, `usuario`, `senha`) VALUES
(1, 'professor', '1234');

-- --------------------------------------------------------

--
-- Estrutura para tabela `turmas`
--

DROP TABLE IF EXISTS `turmas`;
CREATE TABLE IF NOT EXISTS `turmas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `horario` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `turmas`
--

INSERT INTO `turmas` (`id`, `nome`, `horario`) VALUES
(1, 'História - 1º ANO - A', 'Matutino'),
(2, 'História - 2º ANO - B', 'Matutino'),
(3, 'História - 3º ANO - C', 'Vespertino');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
