import KanbanBoard from "./KanbanBoard";

export default class KanbanProject {
	id: number;
	name: string;
	boards: KanbanBoard[];

	constructor(id: number, name: string, boards: KanbanBoard[]) {
		this.boards = boards
		this.id = id;
		this.name = name
	}
}