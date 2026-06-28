<?php
// Configurações do Banco de Dados (Padrão do WampServer)
$host = "localhost";
$user = "root";
$pass = ""; // No WampServer a senha do root costuma ser vazia
$dbname = "chamada_facil";

// Cria a conexão
$conn = new mysqli($host, $user, $pass, $dbname);

// Checa a conexão
if ($conn->connect_error) {
    die(json_encode(["sucesso" => false, "mensagem" => "Falha na conexão com o banco: " . $conn->connect_error]));
}

// Define o padrão de caracteres para não ter problema com acentos
$conn->set_charset("utf8mb4");
?>