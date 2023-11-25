class ReactFramework {
    #component?: (...args: any[]) => any;
    readonly #internalState: unknown[] = [];
    #idx = 0;
    #isNewCall = (idx: number) => idx === this.#internalState.length;
    useState<T>(initialValue: T): [T, (newState: T | ((oldState: T) => T)) => void] {
        const idx = this.#idx;
        if (this.#isNewCall(idx)) {
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

    useEffect(factory: () => void, deps?: unknown[]) {
        if (!deps) {
            return factory();
        }

        const idx = this.#idx;
        this.#idx += 1;
        if (this.#isNewCall(idx)) {
            this.#internalState[idx] = deps;
            return factory()
        }

        const oldDeps = this.#internalState[idx] as unknown[];
        const hasDependencyChanged = oldDeps.some((d, i) => d !== deps[i]);
        this.#internalState[idx] = deps;
        if (hasDependencyChanged) {
            factory();
        }
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
    React.useEffect(() => {
        setCount(0);
    }, [name]);
    return {
        render: `${name} = ${count}`,
        click: () => setCount(count => count + 1),
        changeName: setName
    }
};

const App = React.render(() => Counter('Apples'));
App.click();
console.log('click event done');
App.changeName('Orange');
console.log('change name done');