import { createStore } from 'redux'

console.log("Redux-101")

const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
})

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
})

const setCount = ({ count } = {}) => ({
    type: 'SET',
    count
})

const resetCount = () => ({
    type: 'RESET'
})

// Reducers
// 1. Reducers are pure functions.
// 2. Never change state or action.

const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1
            return {
                count: state.count + incrementBy
            }
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1
            return {
                count: state.count - decrementBy
            }
        case 'SET':
            return {
                count: action.count
            }    
        case 'RESET':
            return {
                count: 0
            }
        default:
            return state
    }
}

const store = createStore(countReducer)

const unsub = store.subscribe(() => {
    console.log(store.getState().count)
})

store.dispatch(incrementCount({ incrementBy: 20 }))
store.dispatch(incrementCount())
store.dispatch(setCount({ count: 100 }))
store.dispatch(decrementCount({ decrementBy: 30 }))
store.dispatch(decrementCount())
store.dispatch(resetCount())