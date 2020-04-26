# Простой cra

Для установки достаточно сделать две команды (при условии наличии nodejs)

```bash
$ npm install -g create-react-app
$ npx create-react-app my-app-name --typescript # Создастся папка с именем my-app-name
```

В данном примере рассмотрим самый простой запуск приложения.

## Контент

### Структура папок

Очень советую делать папочную структуру компонент и контейнеров, чтобы не разводилось много мусора. Вот как тут:
```
.
├── README.md
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── assets
│   │   └── images
│   │       └── logo.svg
│   ├── components
│   │   └── Header
│   │       ├── Header.css
│   │       ├── Header.tsx
│   │       ├── index.ts
│   │       └── types.ts
│   ├── containers
│   │   └── App
│   │       ├── App.css
│   │       ├── App.test.tsx
│   │       ├── App.tsx
│   │       └── index.ts
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   └── styles
│       └── reset.css
├── tsconfig.json
└── yarn.lock

```

### Структура компоненты

Пример хорошей архитектуры
```
.
├── Header.css
├── Header.tsx
├── index.ts
└── types.ts
```

**index.ts** – файл для:
* экспорта самой компоненты, типов (если надо);
* применения [HOC](https://reactjs.org/docs/higher-order-components.html) к компоненте, если таковые нужны.

**types.ts** – файл для описания типов компоненты

**Component.tsx** – файл для описания самой компоненты без лишней логики (описание типов и хоков как раз и выносится в отдельные файлы, чтобы не мусорить)

**Component.css** – файл для описания стилей

### Описание типов

Типы описываются с помощью интерфейсов

```typescript
import {FC} from 'react';

interface OwnProps {
    link: string;
}

export type Props = FC<OwnProps>;
```

**OwnProps** – это интерфейс, который описывает какие собственные пропсы компоненты имеет компонента.
У компоненты можно описать как обязательные, так и необязательные пропсы.

```typescript
import {FC} from 'react';

interface CustomType {
    prop1: number;
    prop2?: boolean;
}

interface OwnProps {
    link: string;
    someData?: CustomType;
}

export type Props = FC<OwnProps>;
```

Тип **Props** – это все пропсы компоненты, которые она может принять. Дальше в уроках поймете, что компонента может иметь не только свои пропсы, и через [HOC](https://reactjs.org/docs/higher-order-components.html) можно прокинуть дополнительные.  
В частности, в данном случае мы сделали импорт **FC** из _react_. FC нам пробросит в компоненту пропс chlidren. Без FC-обертки – мы не сможем сделать так:  
```typescript
const Parent = () => (
    <div>
        /* Вот здесь мы не сможем делать внутренних детей без FC, иначе ТайпСкрипт начнет ругаться, что не знает ничего о пропсе children */
        <MyComponent><span>Text</span></MyComponent>
    </div>
);
```
