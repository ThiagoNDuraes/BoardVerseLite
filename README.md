# BoardVerse Lite

Aplicativo mobile em React Native com TypeScript para cadastro e organização de jogos de tabuleiro, com persistência local em SQLite.

## Funcionalidades

- cadastro de jogos
- listagem com filtro por status
- busca por nome, domínio ou categoria
- edição de registros salvos
- exclusão com confirmação
- persistência local em SQLite
- seleção de domínio, categoria, complexidade e status por toque

## Tecnologias utilizadas

- React Native
- Expo
- TypeScript
- Expo SQLite
- React Navigation

## Estrutura do projeto

```text
src/
  components/
    SelectField.tsx
  data/
    ludopediaTaxonomy.ts
  database/
    db.ts
  repositories/
    gameRepository.ts
  screens/
    HomeScreen.tsx
    GameFormScreen.tsx
    GameDetailScreen.tsx
  types/
    game.ts
    navigation.ts
```

## Como executar

```bash
npm install
npx expo start
```

Depois de iniciar o Expo, basta abrir o projeto no aplicativo Expo Go pelo QR Code gerado no terminal.

## Requisitos atendidos

- aplicação em React Native
- uso de TypeScript
- CRUD básico de uma entidade
- persistência de dados em SQLite
- projeto pronto para versionamento no GitHub

## Estrutura da entidade

Cada jogo cadastrado possui os seguintes campos:

- nome
- categoria principal
- subcategoria
- mínimo de jogadores
- máximo de jogadores
- tempo médio de partida
- complexidade
- status
- observações


## Build do APK

```bash
npm install -g eas-cli
npx expo install --check
npx expo-doctor
eas login
eas whoami
eas build --platform android --profile preview
```

O perfil `preview` no arquivo `eas.json` está configurado para gerar um arquivo `.apk` instalável no Android.
