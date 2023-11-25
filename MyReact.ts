class ReactFramework {
    #component?: (...args: any[]) => any;
    readonly #internalState: unknown[] = [];
    #idx = 0;
    useState<T>(initialValue: T): [T, (newState: T | ((oldState: T) => T)) => void] {
        const idx = this.#idx;
        const isNewCall = idx === this.#internalState.length;
        if (isNewCall) {
            this.#internalState.push(initialValue);
        }

        const state: T = this.#internalState[idx] as T;
        const setState = (newState: T | ((oldState: T) => T)) => {
            if (newState instanceof Function) {
                this.#internalState[idx] = newState(this.#internalState[idx] as T);
            } else {
                this.#internalState[idx] = newState;
            }

            this.#component && this.render(this.#component);
        };

        this.#idx += 1;
        return [state, setState];
    }

    render<R extends { render: string }>(component: (...args: any[]) => R) {
        if (!this.#component) {
            this.#component = component;
        }

        this.#idx = 0;
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
        click: () => setCount(count => count + 1),
        changeName: setName
    }
};

const App = React.render(() => Counter('Apples'));
App.click();
App.changeName('Orange');
App.click();
App.click();