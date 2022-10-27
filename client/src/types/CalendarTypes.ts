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
}

export type DayInner = (number | undefined)