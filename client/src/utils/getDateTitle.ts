export const getDateTitle = (month: number, dayOfWeek: number, day: number) => {
	let title = '';
	switch (dayOfWeek) {
		case 0:
			title += 'Воскресенье, '
			break;
		case 1:
			title += 'Понедельник, '
			break;
		case 2:
			title += 'Вторник, '
			break;
		case 3:
			title += 'Среда, '
			break;
		case 4:
			title += 'Четверг, '
			break;
		case 5:
			title += 'Пятница, '
			break;
		case 6:
			title += 'Суббота, '
			break;
	}
	title += day + ' '
	switch (month) {
		case 0:
			title += 'Января'
			break;
		case 1:
			title += 'Февраля'
			break;
		case 2:
			title += 'Марта'
			break;
		case 3:
			title += 'Апреля'
			break;
		case 4:
			title += 'Мая'
			break;
		case 5:
			title += 'Июня'
			break;
		case 6:
			title += 'Июля'
			break;
		case 7:
			title += 'Августа'
			break;
		case 8:
			title += 'Сентября'
			break;
		case 9:
			title += 'Октября'
			break;
		case 10:
			title += 'Ноября'
			break;
		case 11:
			title += 'Декабря'
			break;
	}
	return title
}