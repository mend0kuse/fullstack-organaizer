import React, { FC } from 'react'
import { useAppDispatch } from '../../hooks/redux/reduxHooks';
import { deleteEvent } from '../../store/store';
import { IEvent } from '../../types/CalendarTypes'

interface DayPageEventProps {
    ev: IEvent;
}

const DayPageEvent: FC<DayPageEventProps> = ({ ev }) => {


    const dispatch = useAppDispatch()

    return (
        <div className="events-daypage__item item-events">
            <div className='item-events__circle' style={{ background: ev.bg }}></div>
            <p className='item-events__content'>{ev.content}</p>
            <button className='item-events__delete' onClick={() => dispatch(deleteEvent(ev.id))} >X</button>
        </div>
    )
}

export default DayPageEvent
