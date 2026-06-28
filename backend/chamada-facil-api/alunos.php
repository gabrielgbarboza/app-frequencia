<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'conexao.php';

// Pega o ID da turma via GET (ex: alunos.php?turma_id=1)
$turma_id = isset($_GET['turma_id']) ? intval($_GET['turma_id']) : 0;

// Busca os alunos e já define o status padrão como 'presente' para a interface
$sql = "SELECT id, turma_id, nome, 'presente' as status FROM alunos WHERE turma_id = $turma_id";
$resultado = $conn->query($sql);

$alunos = [];
if ($resultado->num_rows > 0) {
  while ($row = $resultado->fetch_assoc()) {
    $row['id'] = intval($row['id']);
    $row['turma_id'] = intval($row['turma_id']);
    $alunos[] = $row;
  }
}

echo json_encode($alunos);
$conn->close();
