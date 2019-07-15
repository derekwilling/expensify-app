console.log('redux-expensify.jsx')

import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'

// ADD_EXPENSE
const addExpense = ({
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
} = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
})

// REMOVE_EXPENSE

const removeExpense = ({ id }) => ({
    type: 'REMOVE_EXPENSE',
    id
})

// EDIT_EXPENSE

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

// SET_TEXT_FILTER

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})

// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE

const expensesReducerDefaultState = []
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state, 
                action.expense
            ]
        case 'REMOVE_EXPENSE':
            return state.filter((expense) => expense.id != action.id)
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            })
        default:
            return state
    }
}

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: 0,
    endDate: 0
}
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            // return Object.assign({}, state, { text: action.text })
            // The below spread operator does not work!?!?
            return {
                ...state,
                text: action.text
            }
        default:
            return state
    }
}

// Store creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
)

store.subscribe(() => {
    console.log(store.getState())
})

// const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100 }))
// const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300 }))

// store.dispatch(removeExpense({ id:expenseOne.expense.id }))
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 1500 }))

store.dispatch(setTextFilter('rent'))

const demoState = {
    expenses: [{
        id: 'asdfwagaasdf',
        description: 'January Rent',
        note: 'This was the final payment for theat address.',
        amount: 54500, //pennies\
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
}

