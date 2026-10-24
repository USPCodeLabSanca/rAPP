DROP DATABASE IF EXISTS rapp_users;

CREATE DATABASE rapp_users;
USE rapp_users;

CREATE TABLE reps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    insta VARCHAR(200),
    descr VARCHAR(200),
    tags JSON 
);

INSERT INTO reps (tags) 
VALUES ('["Jantar", "Sem trote", "Faz festas", "USP", "UFSCAR", "Almoço", "Mista", "Masculina", "Feminina", "Faxineira"]');


