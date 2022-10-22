export const getDateTitle = (month: number, dayOfWeek: number, day: number) => {
	let str = '';
	switch (dayOfWeek) {
		case 0:
			str += 'Воскресенье, '
			break;
		case 1:
			str += 'Понедельник, '
			break;
		case 2:
			str += 'Вторник, '
			break;
		case 3:
			str += 'Среда, '
			break;
		case 4:
			str += 'Четверг, '
			break;
		case 5:
			str += 'Пятница, '
			break;
		case 6:
			str += 'Суббота, '
			break;
	}
	str += day + ' '
	switch (month) {
		case 0:
			str += 'Января'
			break;
		case 1:
			str += 'Февраля'
			break;
		case 2:
			str += 'Марта'
			break;
		case 3:
			str += 'Апреля'
			break;
		case 4:
			str += 'Мая'
			break;
		case 5:
			str += 'Июня'
			break;
		case 6:
			str += 'Июля'
			break;
		case 7:
			str += 'Августа'
			break;
		case 8:
			str += 'Сентября'
			break;
		case 9:
			str += 'Октября'
			break;
		case 10:
			str += 'Ноября'
			break;
		case 11:
			str += 'Декабря'
			break;
	}
	return str
}