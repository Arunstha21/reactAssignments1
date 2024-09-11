function getLocalStorageItem(key: string) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined;
    } catch (error) {
        return undefined;
    }
}

function setLocalStorageItem<D>(key: string, value: D): void {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    }
    catch (error) {
        console.error("Error setting item to localStorage:", error);
    }
};


export { getLocalStorageItem, setLocalStorageItem };
