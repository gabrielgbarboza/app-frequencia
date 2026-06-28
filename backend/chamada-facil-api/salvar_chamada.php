<?php
// Resolvendo o CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Resposta para a requisição de preflight
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  http_response_code(200);
  exit();
}

include 'conexao.php';

// Recebendo os dados do Angular
$json = file_get_contents("php://input");
$dados = json_decode($json);

// Verifica se os dados principais vieram no JSON
if (isset($dados->turma_id) && isset($dados->data) && isset($dados->conteudo) && isset($dados->alunos)) {

  $turma_id = intval($dados->turma_id);
  $data_chamada = $conn->real_escape_string($dados->data);
  $conteudo = $conn->real_escape_string($dados->conteudo);
  $qtd_aulas = isset($dados->qtd_aulas) ? intval($dados->qtd_aulas) : 1;

  // Inicia uma transação (Garante que se der erro na metade, não salva dados pela metade)
  $conn->begin_transaction();

  try {
    // 1. Salva o Cabeçalho da Chamada
    $sqlChamada = "INSERT INTO chamadas (turma_id, data_chamada, conteudo_aula, qtd_aulas) 
                       VALUES ($turma_id, '$data_chamada', '$conteudo', $qtd_aulas)";
    $conn->query($sqlChamada);

    // Pega o ID da chamada que acabou de ser gerada
    $chamada_id = $conn->insert_id;

    // 2. Salva o Status de cada Aluno (Frequência)
    foreach ($dados->alunos as $aluno) {
      $aluno_id = intval($aluno->id);
      $status = $conn->real_escape_string($aluno->status);

      $sqlFreq = "INSERT INTO frequencias (chamada_id, aluno_id, status) 
                        VALUES ($chamada_id, $aluno_id, '$status')";
      $conn->query($sqlFreq);
    }

    // Se tudo deu certo, comita (salva de vez) no banco
    $conn->commit();

    echo json_encode(["sucesso" => true, "mensagem" => "Chamada registrada com sucesso!"]);
  } catch (Exception $e) {
    // Se deu algum erro, desfaz tudo
    $conn->rollback();
    echo json_encode(["sucesso" => false, "mensagem" => "Erro ao salvar no banco de dados."]);
  }
} else {
  echo json_encode(["sucesso" => false, "mensagem" => "Dados incompletos enviados pelo aplicativo."]);
}

$conn->close();
