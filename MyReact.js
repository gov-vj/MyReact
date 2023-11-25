"use strict";
class ReactFramework {
    #component;
    #internalState;
    useState(initialValue) {
        this.#internalState = this.#internalState ?? initialValue;
        const state = this.#internalState;
        const setState = (newState) => {
            if (newState instanceof Function) {
                this.#internalState = newState(this.#internalState);
            }
            else {
                this.#internalState = newState;
            }
            this.#component && this.render(this.#component);
        };
        return [state, setState];
    }
    render(component) {
        if (!this.#component) {
            this.#component = component;
        }
        const { render, ...rest } = component();
        console.log(render);
        return rest;
    }
}
const React = new ReactFramework();
const Counter = () => {
    const [count, setCount] = React.useState(0);
    return {
        render: `Current value is ${count}`,
        click: () => {
            setCount(count => count + 1);
        },
    };
};
const App = React.render(Counter);
App.click();
App.click();
App.click();
