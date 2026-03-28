# 📱 Chamada Fácil

> Projeto de Desenvolvimento Mobile para Registro de Frequência Docente.

O **Chamada Fácil** é um aplicativo móvel simplificado, desenvolvido como parte da disciplina "Hands on Work IX" da Universidade do Vale do Itajaí (Univali). O objetivo é otimizar o tempo do professor em sala de aula, eliminando o retrabalho e a transcrição manual de listas de presença.

## 👥 Autores
* **Gabriel Goulart Barboza**
* **Hariel da Silva Flores**

---

## 🎯 Objetivo e Escopo (MVP)
Este projeto foca na entrega de um Produto Mínimo Viável (MVP) que valide a agilidade no registro de frequência.

**Funcionalidades incluídas:**
* 🔐 **Autenticação:** Login simulado para professores.
* 📋 **Listagem de Turmas:** Visualização das turmas atribuídas ao docente.
* 🎓 **Lista de Alunos:** Acesso rápido aos alunos de cada turma.
* ✅ **Registro de Frequência:** Marcação ágil de "Presente" ou "Falta" com feedback visual imediato (Verde/Vermelho).
* 💾 **Persistência Local:** Armazenamento dos dados no dispositivo.

---

## 🛠 Tecnologias Utilizadas
O desenvolvimento seguiu rigorosamente a metodologia **TDD (Test-Driven Development)**.

* **Framework:** [Ionic](https://ionicframework.com/) (com Angular)
* **Linguagem:** TypeScript / HTML / SCSS
* **Testes:** Jasmine & Karma (Unitários e Integração)
* **Gestão de Código:** Git & GitHub

---

## 🧪 TDD e Qualidade de Código
A arquitetura do projeto foi guiada pelos testes, garantindo robustez nas regras de negócio principais:
* **Ciclo Red-Green-Refactor:** Aplicado na construção dos serviços e componentes.
* **Cobertura:** Testes unitários validando a lógica de `AuthService` e `DadosService`.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
* Node.js instalado
* Ionic CLI instalado (`npm install -g @ionic/cli`)

### Passo a Passo
1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU-USUARIO/NOME-DO-REPO.git](https://github.com/SEU-USUARIO/NOME-DO-REPO.git)
    ```
2.  **Instale as dependências:**
    ```bash
    cd NOME-DO-REPO
    npm install
    ```
3.  **Execute o App (No navegador):**
    ```bash
    ionic serve
    ```
4.  **Rode os Testes (TDD):**
    ```bash
    ng test
    ```
    *Isso abrirá o relatório de testes do Jasmine com o status de aprovação.*

---
**Univali - Curso de Análise e Desenvolvimento de Sistemas**
