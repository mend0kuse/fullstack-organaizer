import CalendarPage from '../pages/CalendarPage/CalendarPage';
import DayPage from '../pages/DayPage/DayPage';
import KanbanProjectsPage from '../pages/KanbanProjectsPage/KanbanProjectsPage';


interface IRoute {
	path: string;
	element: React.ReactNode
}

export const routes: IRoute[] = [
	{ path: '/', element: <KanbanProjectsPage /> },
	{ path: '/calendar', element: <CalendarPage /> },
	{ path: '/calendar/:id', element: <DayPage /> },
	{ path: '/kanban', element: <KanbanProjectsPage /> }
]