# BoardVerse Lite

Aplicativo mobile desenvolvido em React Native com TypeScript para cadastro, organização e consulta de jogos de tabuleiro. O projeto utiliza persistência local com SQLite e foi desenvolvido como parte da disciplina de Programação para Dispositivos Móveis.

## Objetivo

O BoardVerse Lite tem como objetivo auxiliar o usuário a organizar uma pequena coleção de jogos de tabuleiro, permitindo cadastrar jogos, consultar informações principais, editar registros e filtrar a coleção de forma simples.

## Tecnologias utilizadas

* React Native
* Expo
* Expo SDK 54
* TypeScript
* SQLite
* Expo SQLite
* React Navigation
* EAS Build

## Funcionalidades

* Cadastro de jogos
* Listagem dos jogos cadastrados
* Edição de registros salvos
* Exclusão com confirmação
* Busca por nome, domínio ou categoria
* Filtro por status
* Seleção de domínio, categoria, complexidade e status por toque
* Persistência local dos dados com SQLite
* Interface mobile com tema visual inspirado em jogos de tabuleiro

## Entidade principal

A entidade principal do projeto é o jogo de tabuleiro. Cada jogo possui informações como:

* nome
* domínio
* categoria
* quantidade mínima e máxima de jogadores
* tempo médio de partida
* complexidade
* status
* observações

## Como executar o projeto

1. Clonar o repositório:

```bash
git clone https://github.com/ThiagoNDuraes/BoardVerseLite.git
```

2. Entrar na pasta do projeto:

```bash
cd BoardVerseLite
```

3. Instalar as dependências:

```bash
npm install
```

4. Executar o projeto:

```bash
npx expo start
```

5. Abrir o aplicativo no Expo Go.

## Versão do Expo

O projeto foi desenvolvido utilizando Expo SDK 54.

## Build Android

O projeto também possui configuração para geração de APK com Expo EAS Build. O arquivo `eas.json` contém o perfil `preview`, configurado para gerar um APK de distribuição interna.

Comando utilizado para gerar o APK:

```bash
eas build --platform android --profile preview
```

## Estrutura do projeto

```text
src/
  components/
  data/
  database/
  repositories/
  screens/
  types/
```

## Observações

Os dados são armazenados localmente no dispositivo utilizando SQLite. Ao instalar o aplicativo pela primeira vez, a coleção inicia vazia e os registros são criados pelo próprio usuário.
