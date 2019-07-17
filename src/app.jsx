import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routers/AppRouter.jsx'
import configureStore from './store/configureStore'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

import { addExpense } from './actions/expenses'
import { setTextFilter } from './actions/filters'
import getVisibleExpenses from './selectors/expenses'

const store = configureStore()

store.dispatch(addExpense({
    description: 'Water bill',
    note: 'Going up!',
    amount: 75000,
    createdAt: 45
}))
store.dispatch(addExpense({
    description: 'Gas bill',
    note: 'Going down!',
    amount: 35000,
    createdAt: 504
}))
store.dispatch(setTextFilter('gas'))

const state = store.getState()

console.log(getVisibleExpenses(state.expenses, state.filters))

ReactDOM.render(<AppRouter />, document.getElementById('app'))