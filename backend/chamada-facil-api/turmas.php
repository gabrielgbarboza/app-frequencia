<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'conexao.php';

$sql = "SELECT * FROM turmas";
$resultado = $conn->query($sql);

$turmas = [];
if ($resultado->num_rows > 0) {
  while ($row = $resultado->fetch_assoc()) {
    // Garantindo que o ID seja número para o Angular não reclamar
    $row['id'] = intval($row['id']);
    $turmas[] = $row;
  }
}

echo json_encode($turmas);
$conn->close();
