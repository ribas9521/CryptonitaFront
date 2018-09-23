const INITIAL_STATE = {
    mirrorList:[]
}

export default function(state = INITIAL_STATE, action){
    switch (action.type) {
        case 'APP_CHECK_CHANGED':
            return { ...state, mirrorList: action.payload }
        default:
            return state

    }
}