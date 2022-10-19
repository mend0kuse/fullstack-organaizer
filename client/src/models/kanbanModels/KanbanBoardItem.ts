import { BoardItemDesc } from '../../types/KanbanTypes';
import KanbanBoard from "./KanbanBoard";

export default class KanbanBoardItem {
	id: number;
	info: BoardItemDesc;
	pinned: boolean;

	constructor(id: number, info: BoardItemDesc, pinned: boolean) {
		this.id = id;
		this.pinned = pinned;
		this.info = info;
	}

}

export class KanbanBoardItemLogic {
	dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault()
	}

	dragStartHandler(item: KanbanBoardItem, board: KanbanBoard, setBoard: (b: KanbanBoard) => void, setItem: (i: KanbanBoardItem) => void) {
		setBoard(board)
		setItem(item)
	}

	dropHandler(e: React.DragEvent<HTMLDivElement>, board: KanbanBoard, item: KanbanBoardItem, currentBoard: KanbanBoard | undefined, currentItem: KanbanBoardItem | undefined, boards: KanbanBoard[], setBoards: (arr: KanbanBoard[]) => void) {
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

	pin(item: KanbanBoardItem) {
		item.pinned = item.pinned ? false : true
	}
}