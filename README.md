# 📱 Chamada Fácil - App de Frequência para Docentes

![Ionic](https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

> Projeto de Desenvolvimento Mobile para Registro de Frequência Docente com integração em tempo real.

O **Chamada Fácil** é um sistema multiplataforma desenvolvido como parte da disciplina Hands on Work da Universidade do Vale do Itajaí (Univali). O objetivo é otimizar o tempo do professor em sala de aula, eliminando o retrabalho e a transcrição manual de listas de presença, conectando diretamente a sala de aula à secretaria.

## 👥 Autores
* **Gabriel Goulart Barboza** - [LinkedIn](https://www.linkedin.com/in/gabrielgbarboza/)
* **Hariel da Silva Flores** - [LinkedIn](https://www.linkedin.com/in/hariel-flores-a47897206/)

---

## 🎯 Objetivo e Escopo (MVP)
Este projeto foca na entrega de um Produto Mínimo Viável (MVP) provando o conceito de um ecossistema completo: um App Mobile para o docente e um Dashboard Web para a secretaria, comunicando-se através de uma API REST.

**Funcionalidades incluídas:**
* 📱 **App Mobile (Professor):**
  * **Autenticação Real:** Login validado no banco de dados via API.
  * **Listagem Dinâmica:** Turmas e alunos carregados diretamente do servidor.
  * **Registro de Frequência:** Marcação ágil de "Presente", "Falta" ou "Justificada" com feedback visual imediato.
  * **Comunicação Nativa:** App empacotado para Android (`.apk`) utilizando *Capacitor Http* para transpor limitações de CORS e tráfego *Cleartext*.
* 💻 **Dashboard Web (Secretaria):**
  * **Monitoramento em Tempo Real:** Painel web construído em PHP com *auto-refresh* dinâmico que exibe as chamadas efetuadas pelos professores instantaneamente.
  * **Detalhamento:** Visualização de faltas e presenças por aluno em cada chamada registrada.

---

## 🛠 Arquitetura e Tecnologias
O sistema adota o padrão **Cliente-Servidor**:
* **Front-end Mobile:** [Ionic Framework](https://ionicframework.com/) com Angular.
* **Empacotamento:** Capacitor para compilação nativa Android.
* **Back-end (API):** PHP 8 estruturado em endpoints RESTful.
* **Banco de Dados:** MySQL (Tabelas relacionais para Professores, Turmas, Alunos e Chamadas).
* **Testes:** Jasmine & Karma (`HttpTestingController` para mocks assíncronos).

---

## 🧪 TDD e Qualidade de Código
A arquitetura do projeto front-end foi guiada por **Test-Driven Development (TDD)**, garantindo a robustez das regras de negócio e da comunicação com a API:
* **Cobertura de Serviços:** Testes unitários validando a lógica de autenticação (`AuthService`) e manuseio de dados (`DadosService`).
* **Mocking de API:** Utilização das diretrizes modernas do Angular 20 (`provideHttpClientTesting`) para simulação de respostas do servidor (HTTP Mocks), garantindo que os testes rodem de forma rápida e isolada.

---

## 🚀 Como Executar o Projeto Localmente

O repositório no formato *Monorepo* contém tanto o código do App quanto o Back-end. Siga os passos abaixo:

### 1. Configurando o Back-end (Servidor Local)
1. Instale o [WampServer](https://www.wampserver.com/) ou XAMPP.
2. Copie os arquivos da pasta `/backend` (ou extraia-os) para o diretório de hospedagem local (`C:\wamp64\www` ou `C:\xampp\htdocs`).
3. Abra o **phpMyAdmin**, crie um banco de dados e importe o arquivo de dump: `/backend/database/chamada_facil_db.sql` (ou o nome do seu arquivo `.sql`).
4. Verifique no painel web (computador) se a conexão está ok acessando `http://localhost/seu-diretorio/painel.php`.

### 2. Configurando o Front-end (Mobile App)
1. Certifique-se de ter o Node.js e o Ionic CLI instalados (`npm install -g @ionic/cli`).
2. Clone este repositório e instale as dependências:
   ```bash
   git clone [https://github.com/SEU-USUARIO/app-frequencia.git](https://github.com/SEU-USUARIO/app-frequencia.git)
   cd app-frequencia
   npm install
