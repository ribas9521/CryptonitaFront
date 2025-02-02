
export const loadState = (key) => {
    try {
        const serializedState = localStorage.getItem(key)
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    }
    catch (e) {
        return undefined;
    }
}

export const saveState = (key, state) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem(key, serializedState)
    }
    catch (e) {
        console.log(e)
    }
}

export const removeState = key => {
    try {
        localStorage.removeItem(key)
    }
    catch (e) {
        console.log(e)
    }

}

export const isFirstTime=()=>typeof(loadState('firstTime'))==="undefined"
export const setFirstTime=value=>{saveState('firstTime', value)}

export const showTutorial = () => (typeof loadState('showTutorial') === 'undefined' || loadState('showTutorial') === true ? true : false)
export const openTutorial = () => saveState('showTutorial', true)