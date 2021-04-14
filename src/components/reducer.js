export default function (state, action) {
    switch (action.type) {
        case 'add':
            return [
                ...state,
                {
                    id: action.payload.id,
                    name: action.payload.name,
                    temp: action.payload.main.temp
                }]
        case 'remove':
            return state.filter(hist =>
                hist.id !== action.payload
            )
        default:
            return state
    }
}