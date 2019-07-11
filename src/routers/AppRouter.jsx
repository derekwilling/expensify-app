import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddExpensePage from '../components/AddExpensePage.jsx'
import EditExpensePage from '../components/EditExpensePage.jsx'
import ExpenseDashboardPage from '../components/ExpenseDashBoardPage.jsx'
import Header from '../components/Header.jsx'
import HelpPage from '../components/HelpPage.jsx'
import PageNotFound from '../components/PageNotFound.jsx'

const AppRouter = () => (
    <Router>
        <div>
            <Header />
            <Switch>
                <Route exact path="/" component={ExpenseDashboardPage} />
                <Route path="/create" component={AddExpensePage} />
                <Route path="/edit" component={EditExpensePage} />
                <Route path="/help" component={HelpPage} />
                <Route component={PageNotFound} />
            </Switch>
        </div>
    </Router>
)

export default AppRouter
