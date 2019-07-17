export default (expenses, { text, sortBy, startDate, endDate }) => {
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