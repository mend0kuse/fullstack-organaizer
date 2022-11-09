import { DayInner } from "../../types/CalendarTypes";
import { Day } from './Day'

export class Month {
	days: Day[][];

	constructor(year: number, month: number) {
		this.days = new MonthDrawer(year, month).draw()
	}
}

export class MonthDrawer {
	year: number;
	month: number;

	constructor(year: number, month: number) {
		this.year = year;
		this.month = month;
	}

	draw() {
		let arr = this.range(this.getLastDay(this.year, this.month));
		let firstWeekDay = this.getFirstWeekDay(this.year, this.month);
		let lastWeekDay = this.getLastWeekDay(this.year, this.month);
		let arrayDays = this.chunk(this.normalize(arr, firstWeekDay, 7 - lastWeekDay))
		return this.initDays(arrayDays)
	}

	range(count: number): number[] {
		let array = []
		for (let i = 1; i <= count; i++) {
			array.push(i)
		}
		return array
	}

	getLastDay(year: number, month: number): number {
		let lastDay = new Date(year, month + 1);
		lastDay.setDate(0);
		return lastDay.getDate();
	}

	getFirstWeekDay(year: number, month: number): number {
		let firstWeekDay = new Date(year, month)
		if (firstWeekDay.getDay() == 0) {
			return 7
		}
		return firstWeekDay.getDay()
	}

	getLastWeekDay(year: number, month: number): number {
		let lastWeekDay = new Date(year, month + 1)
		lastWeekDay.setDate(0)
		if (lastWeekDay.getDay() == 0) {
			return 7
		}
		return lastWeekDay.getDay()
	}

	normalize(arr: DayInner[], left: number, right: number) {
		let result = arr;
		for (let i = 1; i < left; i++) {
			result.unshift(undefined)
		}
		for (let i = 0; i < right; i++) {
			result.push(undefined)
		}
		return result
	}

	chunk(arr: DayInner[]) {
		let result = []
		while (arr.length > 0) {
			result.push(arr.slice(0, 7));
			arr.splice(0, 7)
			if (arr.length == 0) {
				return result
			}
		}
	}

	initDays(array: DayInner[][] | undefined): Day[][] {
		const result: Day[][] = []
		if (array) {
			for (let i = 0; i < array.length; i++) {
				let row = []
				for (let j = 0; j < array[i].length; j++) {
					row.push(new Day(array[i][j], this.month, this.year))
				}
				result.push(row)
			}
		}
		return result
	}

}
