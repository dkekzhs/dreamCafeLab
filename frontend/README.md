# template

FRONTEND/
│
├── .vscode/
│
├── dist/
│   ├── assets/
│   └── index.html
│
├── node_modules/
│
├── public/
│
├── src/
│   ├── assets/         : 이미지, 3d 모델 등 resource 파일
│   ├── components/     : 화면 컴포넌트 단위 디렉터리 (버튼, 지도, 카드, ...)
│   │   └── __tests__   : 컴포넌트 테스트
│   │
│   ├── js/
│   ├── router/
│   │    └── index.js : 페이지 라우팅
│   │    
│   ├── stores/
│   ├── views/          : 화면 단위 디렉터리 (ex. 로그인 페이지, 시뮬레이션 페이지, ...)
│   ├── App.vue/
│   └── main.js
│ 
│ 
├── index.html
├── README.md
├── vite.config.js
└── vitest.config.js



# frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
