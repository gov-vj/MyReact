const useState = <T>(initialValue: T): [() => T, (newValue: T) => void] => {
    let _val = initialValue;
    const state = () => _val;
    const setState = (newValue: T) => {
        _val = newValue;
    };
    return [state, setState];
}

const [count, setCount] = useState(0);
console.log(count());  // 0
setCount(1);
console.log(count());  // 1