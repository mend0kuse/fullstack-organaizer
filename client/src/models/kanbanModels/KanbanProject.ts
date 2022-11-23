import { ChatMessage } from "../../types/KanbanTypes";
import KanbanBoard from "./KanbanBoard";

export default class KanbanProject {
	id: number;
	name: string;
	boards: KanbanBoard[];
	messages: ChatMessage[]

	constructor(id: number, name: string, boards: KanbanBoard[], messages: ChatMessage[]) {
		this.boards = boards
		this.id = id;
		this.name = name;
		this.messages = messages
	}
}

