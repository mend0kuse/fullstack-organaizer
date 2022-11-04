import { DateShowInterface } from "../../types/CalendarTypes"


type ISetDateShow = (date: DateShowInterface) => void


class MonthToggler {
	nextMonth(dateShow: DateShowInterface, setDateShow: ISetDateShow) {
		if (dateShow.month === 11) {
			setDateShow({ ...dateShow, year: dateShow.year + 1, month: 0 })
		}
		else {
			setDateShow({ ...dateShow, month: dateShow.month + 1 })
		}
	}
	prevMonth(dateShow: DateShowInterface, setDateShow: ISetDateShow) {
		if (dateShow.month === 0) {
			setDateShow({ ...dateShow, year: dateShow.year - 1, month: 11 })
		}
		else {
			setDateShow({ ...dateShow, month: dateShow.month - 1 })
		}
	}
}


export default new MonthToggler()