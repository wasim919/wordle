const useLocalStorage = (key) => {
    const itemLs = localStorage.getItem(key);
    const setItemLS = (value) => {
        localStorage.setItem(key, value);
    };
    return [itemLs, setItemLS];
};

export default useLocalStorage;
