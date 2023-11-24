const useState = <T>(initialValue: T): [T, (newValue: T) => void] => {
    let state = initialValue;
    const setState = (newValue: T) => {
        state = newValue;
    };
    return [state, setState];
}

const [count, setCount] = useState(0);
console.log(count);  // 0
setCount(1);
console.log(count);  // 0 --> doesn't get updated