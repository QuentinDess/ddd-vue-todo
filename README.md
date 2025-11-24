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
- Event Subscriber in bounded Context to listen to other context Integration Event ( acting as ACL )
- Store UI Subscriber to listen to Application Event

### Crossing Application Layer For Presentation :
- Using Store as Controller for Use Cases
- For sync action use Presenter to get ViewModel Interface
- Using View Model Interface in Components / Pages read

### Component Injection :
- Core contain Base Layout and Shacn Component ( no context logic )
- Using store to inject component from context to core
- Use Router and module configuration at main.ts to inject specific context configuration

### Domain Shaping :
- Use Value Object and immutability for Entity propoerty
- Create Business Rule method to encapsulation Domain Business
- Register Domain event in entity
- Use Invariance in Domain Entity as AggregateRoot

### Architecture Diagramm : 

![Architecture Diagramm](https://github.com/user-attachments/assets/ab335486-8cd6-4938-b3cc-80b1d039cd22)

  





## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
