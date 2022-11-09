export default class DayToggler {
    newUrl: string = ``
    date: Date
    lastDayOfCurrentMonth: number
    lastDayOfPrevMonth: number

    constructor(lastDayOfCurrentMonth: number, lastDayOfPrevMonth: number, date: Date) {
        this.lastDayOfCurrentMonth = lastDayOfCurrentMonth;
        this.lastDayOfPrevMonth = lastDayOfPrevMonth
        this.date = date
    }

    nextDay = () => {
        let newUrl = ``
        if (this.date && this.lastDayOfCurrentMonth) {
            newUrl = `${this.date.getDate() + 1}_${this.date.getMonth() + 1}_${this.date.getFullYear()}`

            if (this.date.getDate() === this.lastDayOfCurrentMonth) {
                newUrl = `1_${this.date.getMonth() + 2}_${this.date.getFullYear()}`
            }
            if (this.date.getDate() === this.lastDayOfCurrentMonth && this.date.getMonth() === 11) {
                console.log(2);
                newUrl = `1_1_${this.date.getFullYear() + 1}`
            }
            
            return newUrl
        }
    }

    prevDay = () => {
        let newUrl = ``
        if (this.date && this.lastDayOfPrevMonth) {
            newUrl = `${this.date.getDate() - 1}_${this.date.getMonth() + 1}_${this.date.getFullYear()}`

            if (this.date.getDate() === 1) {
                newUrl = `${this.lastDayOfPrevMonth}_${this.date.getMonth()}_${this.date.getFullYear()}`
            }
            if (this.date.getDate() === 1 && this.date.getMonth() === 0) {
                newUrl = `${this.lastDayOfPrevMonth}_12_${this.date.getFullYear() - 1}`
            }
            return newUrl
        }
    }
}

