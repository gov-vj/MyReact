"use strict";
class ReactFramework {
    useState(initialValue) {
        let _val = initialValue;
        const state = () => _val;
        const setState = (newValue) => {
            _val = newValue;
        };
        return [state, setState];
    }
}
const React = new ReactFramework();
const Counter = () => {
    const [count, setCount] = React.useState(0);
    return {
        render: `Current value is ${count()}`,
        click: () => setCount(count() + 1),
    };
};
