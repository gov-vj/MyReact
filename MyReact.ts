class ReactFramework {
    #component?: (...args: any[]) => any;
    #internalState: unknown;
    useState<T>(initialValue: T): [T, (newState: T | ((oldState: T) => T)) => void] {
        this.#internalState = this.#internalState ?? initialValue;
        const state: T = this.#internalState as T;
        const setState = (newState: T | ((oldState: T) => T)) => {
            if (newState instanceof Function) {
                this.#internalState = newState(this.#internalState as T);
            } else {
                this.#internalState = newState;
            }

            this.#component && this.render(this.#component);
        };
        return [state, setState];
    }

    render<R extends { render: string }>(component: (...args: any[]) => R) {
        if (!this.#component) {
            this.#component = component;
        }

        const { render, ...rest} = component();
        console.log(render);
        return rest;
    }
}

const React = new ReactFramework();
const Counter = (initialName: string) => {
    const [count, setCount] = React.useState(0);
    const [name, setName] = React.useState(initialName);
    return {
        render: `${name} = ${count}`,
        click: () => {
            setCount(count => count + 1);
        },
        changeName: setName
    }
};

const App = React.render(() => Counter('Apples'));
App.click();
App.click();
App.click();