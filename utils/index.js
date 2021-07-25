module.exports = {
    capitalized: (string) => string[0].toUpperCase() + string.slice(1).toLowerCase(),

    formatDate: (date) => {
        let d = new Date(date)
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        console.log(`aqui fecha ${da}-${mo}-${ye}`)
        date = `${da}-${mo}-${ye}`
        return date
    },

    toDate: (date) => {
        date = new Date(date).toISOString().slice(0, 10)
        console.log(date)
        return date
    }
}