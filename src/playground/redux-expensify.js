import {
    addExpense,
    removeExpense,
    editExpense
} from '../actions/expenses'
import {
    setTextFilter,
    sortByDate,
    sortByAmount,
    setStartDate,
    setEndDate
} from '../actions/filters'
import getVisibleExpenses from '../selectors/expenses'

import configureStore from '../store/configureStore'
const store = configureStore()

store.subscribe(() => {
    const state = store.getState()
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses)
})

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: 60 }))
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: 50 }))

store.dispatch(sortByAmount())
store.dispatch(setTextFilter('co'))

store.dispatch(editExpense(expenseTwo.expense.id, { createdAt: 50 }))
store.dispatch(setStartDate(40))
store.dispatch(setEndDate(49))


store.dispatch(removeExpense({ id:expenseOne.expense.id }))
store.dispatch(editExpense(expenseTwo.expense.id, { amount: 1500 }))

store.dispatch(setTextFilter('rent'))
store.dispatch(setTextFilter(''))

store.dispatch(sortByAmount())
store.dispatch(sortByDate())

store.dispatch(setStartDate(120))
store.dispatch(setStartDate())
store.dispatch(setEndDate(1250))

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

