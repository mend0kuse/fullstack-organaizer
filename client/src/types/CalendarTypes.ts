export interface DateShowInterface {
	year: number;
	month: number;
}


export enum Months {
	JAN = 'Январь',
	FEB = 'Февраль',
	MARCH = 'Март',
	APRIL = 'Апрель',
	MAY = 'Май',
	JUNE = 'Июнь',
	JULY = 'Июль',
	AUG = 'Август',
	SEP = 'Сентябрь',
	OCT = 'Октябрь',
	NOV = 'Ноябрь',
	DEC = 'Декабрь'
}

export interface IEvent {
	content: string;
	dayId: string;
	id: number;
	bg: string;
}

export type DayInner = (number | undefined)