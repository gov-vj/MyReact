"use strict";
const useState = (initialValue) => {
    let state = initialValue;
    const setState = (newValue) => {
        state = newValue;
    };
    return [state, setState];
};
const [count, setCount] = useState(0);
console.log(count); // 0
setCount(1);
console.log(count); // 0 --> doesn't get updated
