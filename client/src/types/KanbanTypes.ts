export interface BoardItemDesc {
	title: string;
	description: string;
	direction: string;
}

export interface INotification {
	invitedUser?: string;
	from?: string;
	_id?: string;
	project: number;
}

export interface ChatMessage {
	username: any,
	content: string
}

export enum ButtonTypes {
	BG_BLUE = 'btn-white',
	BG_NONE = 'btn-bgnone',
}

export enum FormsTypes {
	ADD = 'add',
	UPDATe = 'update',
}

export enum BoardHeadColors {
	'pink' = 0,
	'yellow' = 1,
	'blue' = 2,
}

