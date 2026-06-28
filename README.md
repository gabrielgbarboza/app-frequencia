# 📱 Chamada Fácil - App de Frequência para Docentes

![Ionic](https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge\&logo=ionic\&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge\&logo=angular\&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge\&logo=capacitor\&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge\&logo=php\&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge\&logo=mysql\&logoColor=white)

> Projeto de Desenvolvimento Mobile para Registro de Frequência Docente com integração em tempo real.

O **Chamada Fácil** é um sistema multiplataforma desenvolvido como parte da disciplina Hands on Work da Universidade do Vale do Itajaí (Univali).

O objetivo é otimizar o tempo do professor em sala de aula, eliminando o retrabalho e a transcrição manual de listas de presença, conectando diretamente a sala de aula à secretaria.

---

# 👥 Autores

* **Gabriel Goulart Barboza** - [LinkedIn](https://www.linkedin.com/in/gabrielgbarboza/)
* **Hariel da Silva Flores** - [LinkedIn](https://www.linkedin.com/in/hariel-flores-a47897206/)

---

# 🎯 Objetivo e Escopo (MVP)

Este projeto entrega um Produto Mínimo Viável (MVP) de um ecossistema composto por:

* Aplicativo Mobile para docentes
* Dashboard Web para secretaria
* API REST responsável pela comunicação entre sistemas

## Funcionalidades

### 📱 App Mobile (Professor)

* **Autenticação Real**

  * Login validado através do banco de dados via API.

* **Listagem Dinâmica**

  * Turmas e alunos carregados diretamente do servidor.

* **Registro de Frequência**

  * Marcação de:

    * Presente
    * Falta
    * Justificada

* **Comunicação Nativa**

  * Aplicativo Android utilizando Capacitor.
  * Uso do Capacitor HTTP para comunicação com API.

---

### 💻 Dashboard Web (Secretaria)

* **Monitoramento em Tempo Real**

  * Painel desenvolvido em PHP.
  * Atualização automática das chamadas realizadas pelos professores.

* **Detalhamento**

  * Visualização das frequências por aluno e chamada.

---

# 🛠 Arquitetura e Tecnologias

O sistema utiliza arquitetura **Cliente-Servidor**:

## Front-end Mobile

* Ionic Framework
* Angular

## Empacotamento Mobile

* Capacitor

## Back-end

* PHP 8
* API REST

## Banco de Dados

* MySQL

## Testes

* Jasmine
* Karma
* HttpTestingController para mocks HTTP

---

# 🧪 TDD e Qualidade de Código

O projeto utiliza testes automatizados para validar regras de negócio e comunicação com API.

Implementações:

* Testes unitários do `AuthService`
* Testes unitários do `DadosService`
* Mock de requisições HTTP utilizando:

```typescript
provideHttpClientTesting()
```

Garantindo testes rápidos e isolados.

---

# 🚀 Como Executar o Projeto Localmente

O projeto possui estrutura **Monorepo**, contendo:

* Aplicação Mobile
* API Backend
* Banco de dados

---

# 1. Configurando o Back-end

Instale:

* WampServer ou XAMPP

Copie a pasta:

```
/backend
```

para:

```
C:\wamp64\www
```

ou:

```
C:\xampp\htdocs
```

Depois:

1. Abra o phpMyAdmin
2. Crie um banco de dados
3. Importe:

```
/backend/database/chamada_facil_db.sql
```

Teste o painel:

```
http://localhost/seu-diretorio/painel.php
```

---

# 2. Configurando o Front-end Mobile

Pré-requisitos:

* Node.js
* Ionic CLI

Instale o Ionic:

```bash
npm install -g @ionic/cli
```

Clone o projeto:

```bash
git clone https://github.com/SEU-USUARIO/app-frequencia.git

cd app-frequencia

npm install
```

Configure a API:

Abra:

```
src/environments/environment.ts
```

Atualize:

```typescript
apiUrl: 'http://192.168.1.X/chamada-facil-api'
```

Substituindo pelo IPv4 da sua máquina.

Para evitar alterações constantes no Git:

```bash
git update-index --assume-unchanged src/environments/environment.ts
```

---

# 3. Rodando e Testando

## Testes Unitários

```bash
npm test
```

---

## Ambiente Web

```bash
ionic serve
```

---

## Gerando APK Android

Build do projeto:

```bash
ionic build
```

Sincronizar com Android:

```bash
npx cap sync android
```

Depois:

1. Abra a pasta:

```
android
```

no Android Studio.

2. Gere o APK pelo Android Studio.

---

## Universidade do Vale do Itajaí (Univali)

Curso de Análise e Desenvolvimento de Sistemas
