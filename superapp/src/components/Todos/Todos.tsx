import React, {Component} from 'react';

import Button from '../Button';
import Input from '../Input';

interface Todo {
    title: string;
    id: number;
}
type TodoList = Todo[];

interface State {
    todos: TodoList;
    addText: string;
    filterText: string;
}

export default class Todos extends Component<{}, State> {
    public state = {
        todos: [],
        addText: '',
        filterText: '',
    };

    public render() {
        const {addText, todos, filterText} = this.state;

        console.log(todos);

        return (
            <div>
                <Input
                    customField="str"
                    value={addText}
                    placeholder="Введите название нового поля"
                    onChange={this.handleChangeAddElementInput}
                />
                <Button onClick={this.handleAdd}>
                    Добавить
                </Button>

                <div>
                    <Input
                        customField="filter"
                        placeholder="Фильтурем"
                        onChange={this.handleFilter}
                    />

                    <ul>
                        {todos
                            .filter((item: Todo) => item.title.includes(filterText))
                            .map(({title, id}) => (
                                <li key={id}>
                                    <span>{title} ({id})</span>
                                    <Button onClick={this.handleRemove(id)}>
                                        Удалить
                                    </Button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }

    private handleChangeAddElementInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            addText: event.target.value,
        });
    };

    private handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            filterText: event.target.value,
        });
    };

    private handleRemove = (id: number) => {
        return (event: React.MouseEvent<HTMLButtonElement>) => {
            const {todos} = this.state;

            this.setState({
                todos: todos.filter((item: Todo) => item.id !== id),
            });
        };
    }

    private handleAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {addText: title, todos} = this.state;

        this.setState({
            todos: [...todos, {title, id: todos.length + 1}],
            addText: '',
        });
    };
}
