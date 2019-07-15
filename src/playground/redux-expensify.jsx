// console.log('redux-expensify.jsx')

import { createStore, combineReducers, bindActionCreators } from 'redux'
import uuid from 'uuid'

// ADD_EXPENSE
const addExpense = ({
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
} = {}) => ({
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

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

// SORT_BY_AMOUNT

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

// SET_START_DATE

const setStartDate = (date) => ({
    type: 'SET_START_DATE',
    date
})

// SET_END_DATE
const setEndDate = (date) => ({
    type: 'SET_END_DATE',
    date
})

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
    startDate: undefined,
    endDate: undefined
}
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.date
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.date
            }
        default:
            return state
    }
}

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = startDate ? expense.createdAt >= startDate : true
        const endDateMatch = endDate ? expense.createdAt <= endDate : true
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

        return textMatch && startDateMatch && endDateMatch
    }).sort((a, b) => {
        const aValue = sortBy === 'date' ? a.createdAt : a.amount 
        const bValue = sortBy === 'date' ? b.createdAt : b.amount 
        if (aValue < bValue)
            return -1
        else if (aValue > bValue) {
            return 1
        } else {
            return 0
        }
    })
}

// Store creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
)

store.subscribe(() => {
    const state = store.getState()
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses)
})

// const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: 60 }))
// const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: 50 }))

// store.dispatch(sortByAmount())
// store.dispatch(setTextFilter('co'))

// store.dispatch(editExpense(expenseTwo.expense.id, { createdAt: 50 }))
// store.dispatch(setStartDate(40))
// store.dispatch(setEndDate(49))


// store.dispatch(removeExpense({ id:expenseOne.expense.id }))
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 1500 }))

// store.dispatch(setTextFilter('rent'))
// store.dispatch(setTextFilter(''))

// store.dispatch(sortByAmount())
// store.dispatch(sortByDate())

// store.dispatch(setStartDate(120))
// store.dispatch(setStartDate())
// store.dispatch(setEndDate(1250))

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

