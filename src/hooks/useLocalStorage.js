import { useState } from 'react';
export default function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });
    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (valueToStore) {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } else {
                window.localStorage.removeItem(key);
            }
        } catch (error) {

        }
    };
    return [storedValue, setValue];
}
