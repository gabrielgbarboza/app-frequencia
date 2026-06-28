<?php
// 1. RESOLVENDO O CORS (Extremamente importante para o Ionic conectar)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// O navegador faz uma requisição OPTIONS antes do POST (Preflight request). Temos que responder OK.
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  http_response_code(200);
  exit();
}

// 2. INCLUIR A CONEXÃO
include 'conexao.php';

// 3. RECEBER OS DADOS JSON DO ANGULAR
$json = file_get_contents("php://input");
$dados = json_decode($json);

// Verifica se enviou usuário e chave
if (isset($dados->usuario) && isset($dados->chave)) {

  // Protege contra SQL Injection básico
  $usuario = $conn->real_escape_string($dados->usuario);
  $senha = $conn->real_escape_string($dados->chave);

  // Consulta no banco de dados
  $sql = "SELECT id, usuario FROM professores WHERE usuario = '$usuario' AND senha = '$senha'";
  $resultado = $conn->query($sql);

  if ($resultado->num_rows > 0) {
    $professor = $resultado->fetch_assoc();
    // Retorna sucesso e os dados do professor
    echo json_encode(["sucesso" => true, "mensagem" => "Autorizado", "dados" => $professor]);
  } else {
    // Retorna falha
    echo json_encode(["sucesso" => false, "mensagem" => "Usuário ou senha incorretos! Tente novamente."]);
  }
} else {
  echo json_encode(["sucesso" => false, "mensagem" => "Dados de login incompletos."]);
}

$conn->close();
