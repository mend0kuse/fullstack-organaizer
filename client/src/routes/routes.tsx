import CalendarPage from '../pages/CalendarPage/CalendarPage';
import DayPage from '../pages/DayPage/DayPage';
import KanbanProjectsPage from '../pages/KanbanProjectsPage/KanbanProjectsPage';
import Lk from '../pages/Lk/Lk';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';


interface IRoute {
	path: string;
	element: React.ReactNode
}

export const routes: IRoute[] = [
	{ path: '/', element: <Registration /> },
	{ path: '/calendar', element: <CalendarPage /> },
	{ path: '/calendar/:id', element: <DayPage /> },
	{ path: '/kanban', element: <KanbanProjectsPage /> },
	{ path: '/registration', element: <Registration /> },
	{ path: '/login', element: <Login /> },
	{ path: '/lk', element: <Lk /> },

]