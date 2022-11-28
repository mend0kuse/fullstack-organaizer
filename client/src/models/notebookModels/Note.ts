export class NoteBlock {
	id: string;
	type: string;
	data: {
		stretched?: string,
		url?: string,
		withBackground?: boolean,
		withBorder?: boolean,
		level?: number,
		content?: string[][],
		style?: string,
		withHeadings?: boolean,
		text?: string,
		caption?: string,
		alignment?: string,
		link?: string,
		meta?: {
			description?: string,
			image: { url?: string, },
			site_name?: string,
			title?: string,
			type?: string,
		},
		items?: string[]
	}

}


export default class Note {
	title: string;
	userId?: string;
	time: number;
	version: string;
	blocks: NoteBlock[]
}