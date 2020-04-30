# Компоненты-классы

Вся подробная информация про классы написана здесь (читать сначала Компонент, потом Пьюр):
* [React.Component](https://ru.react.js.org/docs/react-component.html)
* [React.PureComponent](https://ru.reactjs.org/docs/react-api.html#reactpurecomponent)

Ниже разбираться будет больше практика, нежели рассказываться то, что уже описано выше.   

Ключевой момент классов: **Используйте их, когда нужно использовать ЖЦ компоненты**. Да, сейчас есть модные хуки, которые помогают перейти на FC, но если начинать использовать только FC и хуки, компонента становится нечитабельной, сложной, перекрученной. Это вызовет больше потенциальных багов, более геморройного дебага и лишнего потраченного времени.  

Компоненту-Класс создать можно вот так:
```typescript jsx
import React, {Component} from 'react';

class App extends Component {
    public render() {
        return (
            <div>App</div>
        );
    }
}
``` 

Рассмотрим полезные методы ЖЦ Класса и как применять данный инструмент.

## Конструктор

Из документации
```
Если вы не инициализируете состояние и не привязываете методы, вам не нужно реализовывать конструктор в вашем React-компоненте.
```

В конструкторе компоненты мы должны вызывать super() у React компоненты, а также пробросить пропсы.  
```typescript jsx
import React, {Component} from 'react';

interface OwnProps {
    prop1: string; 
}

type Props = OwnProps;

interface State {
    prop2: number;
}

class App extends Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {prop2: 0};
    }

    public render() {
        return (
            <div>App</div>
        );
    }
}
```

В конструкторе мы можем:
* объявить state;
* биндить методы;
* заниматься предзагрузкой / иной логикой.

В конструкторе мы не можем:
* вызывать this.setState().

## componentDidMount

1. В данном методе можно делать запуск загрузки данных с сервера.
```typescript jsx
import React, {Component} from 'react';

function startLoading() { 
    // Запускаем запросы за данными через fetch / axios
}

class App extends Component {
    public componentDidMount() {
        startLoading();
    }

    public render() {
        return (
            <div>App</div>
        );
    }
}
``` 

После окончания загрузки мы можем класть данные в state компоненты и из state подтягивать данные.

2. Метод отлично подходит для оформления подписки на ~~нетфликс~~события. Например, мы делаем форму, в которой есть инпут. Мы хотим при перезагрузке страницы, например, сразу человека в фокус инпута закинуть, без лишнего клика.  

Чтобы понять код ниже, нужно прочитать что такое [ref](https://ru.reactjs.org/docs/refs-and-the-dom.html). Кратко, ref – это прямой доступ к DOM-элементу с доп полями от реакта.

```typescript jsx
import React, {Component} from 'react';

class App extends Component {
    private _ref = React.createRef<HTMLInputElement>;    

    public componentDidMount() {
        // Здесь мы по добавлению input'а в DOM вызываем фокус у инпута.
        this._ref.current.focus();
    }

    public render() {
        return (
            <input ref={this._ref}/>
        );
    }
}
``` 

## componentWillUnmount

Данный метод нужен, чтобы освободить ресуры перед удалением компоненты из DOM.  
Например, нам пришлось в componentDidMount приделать к элементу `addEventListener('click', this.handleClick)`. Но ведь при размонтировании, есть неопределенное поведение – а что делается с этим событием?  
Правильно, лучше явно взять и очистить подписку на событие.  

```typescript jsx
import React, {Component} from 'react';

class App extends Component {
    private _ref = React.createRef<HTMLInputElement>;    

    public componentDidMount() {
        // Подписываемся
        this._ref.addEventListener('click', this.handleClick);
    }

    public componentWllUnmount() {
        // Отписываемся и очищаем ресурсы
        this._ref.removeEventListener('click', this.handleClick);
    }

    public render() {
        return (
            <input ref={this._ref}/>
        );
    }
    
    private handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        // ...code
    };
}
``` 

## componentDidUpdate

Данный метод хорошо бы использовать при контроле за изменением данных.  
Например, мы добавляем в график новые данные.

В компоненте ниже мы:

1. В componentDidMount создали новый график из библиотеки и положили в него пустую дату;
2. Ждем в componentDidUpdate, когда сверху нам прокинут новую пачку данных и добавим в chart

PS. Если непонятно как график должен отрисоваться. То считаем, что при createChart мы передали класс div'a, а график внутрь положит сам свой контент.

```typescript jsx
import React, {PureComponent} from 'react';
import {createChart, ChartType} from 'some-chart';

type DataItem = [number, number];
type DataList = DataItem[]; 

interface State {
    chart: ChartType;
}

interface OwnProps {
    data: DataList;
}

type Props = OwnProps;

class Plot extends PureComponent<Props, State> {
    public state = {
        chart: null,
    };

    public componentDidMount() {
        const chart = createChart('some-plot-class', {}); // Создаем график и опшнс графика
        chart.data = this.props.data;
        
        this.setState({chart});
    }
    
    // Про Readonly можно почитать тут: https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlyt
    public componentDidUpdate(prevProps: Readonly<Props>) {
        const {data} = this.props;
        
        // isEqual - это функция, которое делает сравнение не поссылкам, а сравнивает по значению
        if (!isEqual(data, prevProps.data)) {
            const {chart} = this.state;

            chart.pushData(data);
        }
    }

    public render() {
        return (
            <div className="some-plot-class"/>
        );
    }
}
```

## State

Когда данные меняются динамически, их надо где-то хранить. Один из способов – это стейт компоненты. Грубо говоря, это локальная "база данных" компоненты, куда мы складываем данные.  

Когда это надо? Например, у нас есть кнопка, которая умеет делать лоадинг при нажатии (крутилка сбоку от текст или еще какая анимация). Нам нужно знать когда кнопке крутиться, а когда нет. Самый простой способ – флаг в state.  

```typescript jsx
import React, {PureComponent} from 'react';

interface State {
    isLoading: boolean;
}

interface OwnProps {
    onClick?: <T>(event: React.MouseEvent<T>) => void;
    // Другие пропсы кнопки
}

type Props = OwnProps;

class Button extends PureComponent<Props, State> {
    public state = {
        isPending: false,
    };

    public render() {
        const {children} = this.props;
        const {isPending} = this.state;

        return (
            <div className="button-class" onClick={this.handleClick}>
                {children}
   
                {isPending && (
                    <span>Загрузка или крутилка</span>
                )}
            </div>
        );
    }
        
    private handleClick = (event: React.MouseEvent<HTMLElement>) => {
        const {onClick} = this.props;

        if (onClick) {
            // Тут можно несколько разных обработчиков засунуть
            Promise.all([onClick].map(cb => Promise.resolve(cb())))
                .then(results => {
                    this.setState({isPending: false});
                })      
        }
    };
}
```

## defaultProps

Допустим, наша компонента ждет извне какой-то необязательный пропс. Но мы хотим по умолчанию ставить ему значение. Например, цвет.  
Можно воспользоваться defaultProps, чтобы явно не класть ничего руками никуда и не делать лишних телодвижений.

```typescript jsx
import React, {PureComponent} from 'react';

interface OwnProps {
    color?: 'white' | 'black';
}

type Props = OwnProps;

class SomeComponent extends PureComponent<Props> {
    static defaultProps = {
        color: 'white',
    };

    public render() {
        // здесь как-то применяем this.props.color
        return (
            <div/>
        );
    }
}
```

## Биндинг и колбеки

Есть несколько вариантов создания и использования колбеков / обработчиков как методов класса.

1. Использовать знания о том, как работают стрелочные функции, как они обращаются с замыканиями.
```typescript jsx
import React, {PureComponent} from 'react';

class SomeComponent extends PureComponent {
    public render() {
        return (
            <div onClick={this.onClick}/>
        );
    }

    private onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        
        const {} = this.props;

        // Что-то делаем... 
    };
}
```

2. Писать обычный метод класса, но дальше придется биндить контекст, если внутри мы используем this. 
```typescript jsx
import React, {PureComponent} from 'react';

class SomeComponent extends PureComponent<{}> {
    public constructor(props: {}) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    public render() {
        return (
            <div onClick={this.onClick}/>
        );
    }

    private onClick(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        
        const {} = this.props;

        // Что-то делаем... 
    };
}
```

Лично я предпочитаю использовать первый вариант, потому что он не требует лишних действий с языком, не вызывает перегрузки кода / читаемости и предотвращает потенциальные баги.

### Фабрика колбеков

Бывают случаи, когда нам надо в цикле передать id сущности, чтобы колбек работал на опеределенный item из items. Здесь нам поможем фабрика.
Пример фабрики представлен ниже

```typescript jsx
import React, {PureComponent} from 'react';

interface OwnProps {
    items: SomeListType;
}

type Props = OwnProps;

class Items extends PureComponent<Props> {
    public render() {
        const {items} = this.props;

        return (
            <div>
                {(items || []).map(({id}) => (
                    <div onClick={this.makeHandleClick(id)}>Item {id}</div>
                ))} 
            </div>
        );
    }

    private makeHandleClick = (itemId: number) => {
        return (event: React.MouseEvent<HTMLDivElement>) => {
            event.preventDefault();
            
            const {items} = this.props; // Если тут нужен, можем также вытащить без проблем что-то из пропсов
            
            // Что-то делаем с пропсами и itemId
        };
    };
}
```

## Примеры с использованием классов и ЖЦ

### Обработка ошибок компоненты
Сделаем обертку отлова ошибок в проекте и описыванием ошибки прямо в браузере.  
PS. Такое стоит делать только в !PROD окружении. В проде лучше показывать красивое более что-то, нежели текст дебага ошибки, особенно в проде он не то, чтобы полезен с [минификацией кода (или сжиматели, хаха)](https://learn.javascript.ru/minification).  

Рассмотрим компоненту [ErrorBoundry](/superapp/src/components/ErrorBoundry/ErrorBoundry.tsx).  
Мы использовали метод ЖЦ `componentDidCatch`. Он нам выдает саму ошибку и подробную информацию (стек-трейс). В деве / тестинге у нас есть хотелка, например, видеть на чем мы упали прям в браузере.  

В `componentDidCatch` мы отловили ошибку и положили в наш стейт. Далее, если у стейта появилась ошибка – мы рендерим ее вместо контента.  

Использоватьнашу написанную компоненту можно вот так: [App](/superapp/src/containers/App/App.tsx).

**Оффтоп!**
Также мы видим, что использовали пропс реакта, который мы не описали ни в каких Props – `children`. Этот пропс описан уже в самом Классе. Мы можем всегда вытаскивать его и пробрасывать двумя способами:

1. Через вложенность компоненты  
```typescript jsx
<div>
    <span>Text</span>
</div>
```

2. Через пропс компоненты  
```typescript jsx
<div children={<span>Text</span>}/>
```
