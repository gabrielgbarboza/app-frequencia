<?php
include 'conexao.php';

// 1. Busca todas as chamadas gerais para a tabela principal
$sql = "SELECT c.id, t.nome as turma, c.data_chamada, c.conteudo_aula, c.qtd_aulas 
        FROM chamadas c 
        JOIN turmas t ON c.turma_id = t.id 
        ORDER BY c.id DESC";
$resultado = $conn->query($sql);

// 2. Se o usuário clicou em uma chamada específica, busca os detalhes dos alunos
$chamada_selecionada = isset($_GET['chamada_id']) ? intval($_GET['chamada_id']) : 0;
$alunos_chamada = [];
$info_chamada = null;

if ($chamada_selecionada > 0) {
  // Busca informações da chamada para o título da listagem
  $sqlInfo = "SELECT c.data_chamada, t.nome FROM chamadas c JOIN turmas t ON c.turma_id = t.id WHERE c.id = $chamada_selecionada";
  $resInfo = $conn->query($sqlInfo);
  if ($resInfo->num_rows > 0) {
    $info_chamada = $resInfo->fetch_assoc();
  }

  // Busca a lista de alunos e os status salvos para aquela chamada
  $sqlAlunos = "SELECT a.nome, f.status 
                  FROM frequencias f 
                  JOIN alunos a ON f.aluno_id = a.id 
                  WHERE f.chamada_id = $chamada_selecionada";
  $resAlunos = $conn->query($sqlAlunos);
  if ($resAlunos->num_rows > 0) {
    while ($row = $resAlunos->fetch_assoc()) {
      $alunos_chamada[] = $row;
    }
  }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <?php if ($chamada_selecionada == 0): ?>
    <meta http-equiv="refresh" content="3">
  <?php endif; ?>
  <title>Painel - Chamada Fácil</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f5f8;
      margin: 0;
      padding: 20px;
    }

    .header {
      background-color: #003580;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    h1 {
      margin: 0;
      font-size: 1.5rem;
    }

    .card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      margin-bottom: 20px;
    }

    h2 {
      color: #333;
      margin-top: 0;
      font-size: 1.2rem;
      border-bottom: 2px solid #eeF2F7;
      padding-bottom: 10px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }

    th,
    td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #f9f9f9;
      color: #333;
      font-weight: 600;
    }

    /* Links e Badges */
    .btn-link {
      color: #003580;
      font-weight: 600;
      text-decoration: none;
    }

    .btn-link:hover {
      text-decoration: underline;
    }

    .badge {
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .badge-sinc {
      background-color: #e2e8f0;
      color: #4a5568;
    }

    /* Cores de Status idênticas ao App */
    .status-presente {
      background-color: rgba(40, 167, 69, 0.15);
      color: #28a745;
    }

    .status-falta {
      background-color: rgba(220, 53, 69, 0.15);
      color: #dc3545;
    }

    .status-justificada {
      background-color: rgba(111, 66, 193, 0.15);
      color: #6f42c1;
    }

    .linha-selecionada {
      background-color: #e6f0ff !important;
    }
  </style>
</head>

<body>

  <div class="header">
    <h1>👨‍🏫 Chamada Fácil - Dashboard da Secretaria</h1>
    <span>WampServer Ativo</span>
  </div>

  <div class="card">
    <h2>Últimos Registros de Frequência Recebidos</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Turma</th>
          <th>Data da Aula</th>
          <th>Conteúdo Ministrado</th>
          <th>Qtd Aulas</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        <?php if ($resultado->num_rows > 0): ?>
          <?php while ($row = $resultado->fetch_assoc()): ?>
            <tr class="<?php echo ($chamada_selecionada == $row['id']) ? 'linha-selecionada' : ''; ?>">
              <td>#<?php echo $row['id']; ?></td>
              <td><strong><?php echo $row['turma']; ?></strong></td>
              <td><?php echo date('d/m/Y', strtotime($row['data_chamada'])); ?></td>
              <td><?php echo $row['conteudo_aula']; ?></td>
              <td><?php echo $row['qtd_aulas']; ?></td>
              <td>
                <a class="btn-link" href="painel.php?chamada_id=<?php echo $row['id']; ?>">
                  🔍 Ver Presenças
                </a>
              </td>
            </tr>
          <?php endwhile; ?>
        <?php else: ?>
          <tr>
            <td colspan="6" style="text-align: center;">Nenhuma chamada registrada no banco ainda.</td>
          </tr>
        <?php endif; ?>
      </tbody>
    </table>
  </div>

  <?php if ($chamada_selecionada > 0 && $info_chamada): ?>
    <div class="card" id="detalhes">
      <h2>
        📋 Lista de Presença Detalhada -
        <span style="color: #003580;"><?php echo $info_chamada['nome']; ?></span>
        (Aula de <?php echo date('d/m/Y', strtotime($info_chamada['data_chamada'])); ?>)
      </h2>

      <table>
        <thead>
          <tr>
            <th style="width: 70%;">Nome Completo do Aluno</th>
            <th style="width: 30%;">Status de Frequência</th>
          </tr>
        </thead>
        <tbody>
          <?php if (!empty($alunos_chamada)): ?>
            <?php foreach ($alunos_chamada as $aluno): ?>
              <tr>
                <td><?php echo $aluno['nome']; ?></td>
                <td>
                  <span class="badge status-<?php echo $aluno['status']; ?>">
                    <?php
                    if ($aluno['status'] == 'justificada') echo 'Falta Justificada';
                    else echo $aluno['status'];
                    ?>
                  </span>
                </td>
              </tr>
            <?php endforeach; ?>
          <?php else: ?>
            <tr>
              <td colspan="2" style="text-align: center;">Nenhum aluno encontrado para esta chamada.</td>
            </tr>
          <?php endif; ?>
        </tbody>
      </table>
      <br>
      <a class="btn-link" href="painel.php" style="font-size: 0.9rem;">▲ Fechar detalhes</a>
    </div>
  <?php endif; ?>

</body>

</html>
<?php $conn->close(); ?>