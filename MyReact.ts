class ReactFramework {
    useState<T>(initialValue: T): [() => T, (newValue: T) => void] {
        let _val = initialValue;
        const state = () => _val;
        const setState = (newValue: T) => {
            _val = newValue;
        };
        return [state, setState];
    }

    render<R extends { render: string }>(component: (...args: any[]) => R) {
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