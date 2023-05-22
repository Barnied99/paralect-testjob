export const setLocalStorage = (key, data) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(data))
    }
}

export const getLocalStorage = (key) => {
    if (typeof window !== "undefined") {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
    }
}