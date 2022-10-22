import { BoardItemDesc } from "../../types/KanbanTypes";
import KanbanBoardItem from "./KanbanTask";

export default class KanbanBoard {
	id: number;
	name: string;
	items: KanbanBoardItem[];
	headBg: string;

	constructor(id: number, name: string, headBg: string, items: KanbanBoardItem[]) {
		this.items = items;
		this.id = id
		this.name = name;
		this.headBg = headBg;
	}


}

export class KanbanBoardLogic {


	deleteItem(board: KanbanBoard, i: KanbanBoardItem) {
		let asd = board.items.filter(item => item.id !== i.id)
		board.items = asd
	}

	updateItem(board: KanbanBoard, id: number, info: BoardItemDesc) {
		let asd = board.items.map(item => {
			if (item.id == id) {
				item.info = info
				return item
			}
			return item
		})

		board.items = asd
	}

	// update() {
	// 	return this.items
	// }

	dropCardHandler(e: React.DragEvent<HTMLDivElement>, board: KanbanBoard, currentBoard: KanbanBoard | null, currentItem: KanbanBoardItem | null, boards: KanbanBoard[], setBoards: (arr: KanbanBoard[]) => void) {
		const arraytId = board.items.map(item => item.id)

		if (currentItem && currentBoard) {
			if (!arraytId.includes(currentItem.id)) {

				// добавление в редеанную доску
				board.items.push(currentItem)

				// удаление из доски,с которой перетаскивают
				const currentIndex = currentBoard.items.indexOf(currentItem)
				currentBoard.items.splice(currentIndex, 1)

				setBoards(boards.map(b => {
					return b
				}))
			}
		}
	}
	dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault()
	}
}