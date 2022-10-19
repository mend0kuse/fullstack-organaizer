import { DayInner, IEvent } from "../../types/CalendarTypes";


export class Day {
	number: DayInner;
	month: number;
	year: number;
	id: string;
	events: IEvent[] = []

	constructor(number: DayInner, month: number, year: number) {
		this.number = number;
		this.year = year;
		this.month = month;
		this.id = `${this.number}_${this.month + 1}_${this.year}`
	}
}