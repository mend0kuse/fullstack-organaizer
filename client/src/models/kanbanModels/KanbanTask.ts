import { BoardItemDesc } from '../../types/KanbanTypes';
import KanbanBoard from "./KanbanBoard";

export default class KanbanTask {
	id: number;
	info: BoardItemDesc;
	pinned: boolean;

	constructor(id: number, info: BoardItemDesc, pinned: boolean) {
		this.id = id;
		this.pinned = pinned;
		this.info = info;
	}
}

export class KanbanTaskLogic {
	dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault()
	}

	dragStartHandler(item: KanbanTask, board: KanbanBoard, setBoard: (b: KanbanBoard) => void, setItem: (i: KanbanTask) => void) {
		setBoard(board)
		setItem(item)
	}

	dropHandler(e: React.DragEvent<HTMLDivElement>, board: KanbanBoard, item: KanbanTask, currentBoard: KanbanBoard | null, currentItem: KanbanTask | null, boards: KanbanBoard[], setBoards: (arr: KanbanBoard[]) => void) {
		e.preventDefault()
		// e.target.style.boxShadow = 'none'

		if (currentItem && currentBoard) {
			//Удаление итема из взятой доски 
			const currentIndex = currentBoard.items.indexOf(currentItem)
			currentBoard.items.splice(currentIndex, 1)
			//добавление итема в текущую доску
			const dropIndex = board.items.indexOf(item)
			board.items.splice(dropIndex + 1, 0, currentItem)

			setBoards(boards.map(b => {
				return b
			}))
		}
	}

	pin(item: KanbanTask) {
		item.pinned = item.pinned ? false : true
	}
}