import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import DayToggler from '../../models/calendarModels/DayToggler';
import { MonthDrawer } from '../../models/calendarModels/Month';

interface DayPageNavigationProps {
    date: Date;

}

const DayPageNavigation: FC<DayPageNavigationProps> = ({ date, }) => {

    let lastDayOfCurrentMonth = new MonthDrawer(date.getFullYear(), date.getMonth()).getLastDay(date.getFullYear(), date.getMonth());
    let lastDayOfPrevMonth = new MonthDrawer(date.getFullYear(), date.getMonth()).getLastDay(date.getFullYear(), date.getMonth() !== 0 ? date.getMonth() - 1 : 11)

    const router = useNavigate()

    const dayToggler = new DayToggler(lastDayOfCurrentMonth, lastDayOfPrevMonth, date)

    return (
        <div className="daypage__navigation navigation-daypage">
            <button className='_icon-arrow navigation-daypage__arrow navigation-daypage__prev' onClick={() => router(`/calendar/${dayToggler.prevDay()}`)} ></button>
            <button className='_icon-arrow navigation-daypage__arrow navigation-daypage__next' onClick={() => router(`/calendar/${dayToggler.nextDay()}`)} ></button>
        </div>
    )
}

export default DayPageNavigation
