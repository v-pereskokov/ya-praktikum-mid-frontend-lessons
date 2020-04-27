# Примеры применения типов

Рассмотрим компоненты [Header](/superapp/src/components/Header) и [Icon](/superapp/src/components/Icon).  

Мы выделили logo (img) из Header в отдельную компоненту Icon. Самой компоненте мы выдали следующие пропсы:
```typescript
import {FC} from 'react';

interface OwnProps {
    src: string;
    className?: string;
    alt?: string;
}

export type Props = FC<OwnProps>;

```

**src** – Обязательный пропс, потому что без src смысла добавлять иконку нет.  
**className** – Необязательный, потому что у иконки уже есть свой стандартный класс. Может и не нужно нам пихать туда дополнительные классы. Но если надо, легко можно добавить. Мы сделали параметр опциональным через оператор `?:`, чтобы не вставлять явно undefined в пропсы самим.  
**alt** – Также необязательный пропс, потому что альт может мы осознанно не хотим добавлять. (для примера)  

Ниже уже для продвинутого использования react. Перед чтением ниже нужно ознакомиться с:
* мемоизация и что это. Например, [тут](https://habr.com/ru/company/ruvds/blog/332384/), [тут](https://www.cat-in-web.ru/js-memoization/) или [тут](https://meline.lviv.ua/development/front-end/реализация-мемоизации-в-javascript/)  
* хуки в реакте – что это.  Например, [тут](https://ru.reactjs.org/docs/hooks-intro.html), [тут](https://ru.reactjs.org/docs/hooks-overview.html) или [тут](https://habr.com/ru/post/429712/)

## Use memo

В функциональных компонентах есть хук useMemo. Он позволяет мемоизировать значения, используя контекст. В контекст мы передаем пропс.    
То есть если src / alt динамически поменяется, а className нет, то не произойдет снова конкатенации классов, а возьмется из памяти прошлое значение (как и положено при мемоизации).

Пример из данной ветки:
```typescript
import React, {useMemo} from 'react';

// ...

const Icon: Props = ({src, className = '', alt}) => {
    const classNames = useMemo(() => { // В аргументах этот контекст мы не ждем, а сразу используем
        return cn('icon', className); // Выполняем нужные нам расчеты / пересчеты / манипуляции лишние
    }, [className]); // Вторым аргументом передаем в массиве контекст

    // ...
};
```
