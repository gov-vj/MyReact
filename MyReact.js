"use strict";
class ReactFramework {
    #component;
    #internalState = [];
    #idx = 0;
    #isNewCall = (idx) => idx === this.#internalState.length;
    useState(initialValue) {
        const idx = this.#idx;
        if (this.#isNewCall(idx)) {
            this.#internalState.push(initialValue);
        }
        const state = this.#internalState[idx];
        const setState = (newState) => {
            if (newState instanceof Function) {
                this.#internalState[idx] = newState(this.#internalState[idx]);
            }
            else {
                this.#internalState[idx] = newState;
            }
            this.#component && this.render(this.#component);
        };
        this.#idx += 1;
        return [state, setState];
    }
    useEffect(factory, deps) {
        if (!deps) {
            return factory();
        }
        const idx = this.#idx;
        this.#idx += 1;
        if (this.#isNewCall(idx)) {
            this.#internalState[idx] = deps;
            return factory();
        }
        const oldDeps = this.#internalState[idx];
        const hasDependencyChanged = oldDeps.some((d, i) => d !== deps[i]);
        this.#internalState[idx] = deps;
        if (hasDependencyChanged) {
            factory();
        }
    }
    render(component) {
        if (!this.#component) {
            this.#component = component;
        }
        this.#idx = 0;
        const { render, ...rest } = component();
        console.log(render);
        return rest;
    }
}
const React = new ReactFramework();
const Counter = (initialName) => {
    const [count, setCount] = React.useState(0);
    const [name, setName] = React.useState(initialName);
    React.useEffect(() => {
        setCount(0);
    }, [name]);
    return {
        render: `${name} = ${count}`,
        click: () => setCount(count => count + 1),
        changeName: setName
    };
};
const App = React.render(() => Counter('Apples'));
App.click();
console.log('click event done');
App.changeName('Orange');
console.log('change name done');
