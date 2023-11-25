"use strict";
class ReactFramework {
    #component;
    #internalState = [];
    #idx = 0;
    useState(initialValue) {
        const idx = this.#idx;
        const isNewCall = idx === this.#internalState.length;
        if (isNewCall) {
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
    return {
        render: `${name} = ${count}`,
        click: () => setCount(count => count + 1),
        changeName: setName
    };
};
const App = React.render(() => Counter('Apples'));
App.click();
App.changeName('Orange');
App.click();
App.click();
