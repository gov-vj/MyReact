class ReactFramework {
    #component?: (...args: any[]) => any;
    #internalState: unknown;
    useState<T>(initialValue: T): [() => T, (newValue: T) => void] {
        this.#internalState = this.#internalState ?? initialValue;
        const state = () => this.#internalState as T;
        const setState = (newValue: T) => {
            this.#internalState = newValue;
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
const Counter = () => {
    const [count, setCount] = React.useState(0);
    return {
        render: `Current value is ${count()}`,
        click: () => setCount(count() + 1),
    }
};

const App = React.render(Counter);
App.click();
App.click();
App.click();