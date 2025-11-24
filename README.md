# task-manager

Todo app following principle of Clean Architecture with vue typescript

## Design : 

### Denpendency Inversion Principle : 

- Using Inversify for Injection of dependencies
- At most using Interface to cross Layers ( presentation -> application , application -> infrastructure )
- A core Container is Used to register Interfaces implementation and services

### Using Event Bus to cross Layer or Context Boundaries :
- A simple In memory Event Bus is used with publish / subscribe
- In memory queue with FIFO integration






## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
