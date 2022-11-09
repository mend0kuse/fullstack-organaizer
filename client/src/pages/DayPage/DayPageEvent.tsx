import React, { FC, useContext } from 'react'
import { AuthToken } from '../../context/authContext';
import { useAppDispatch } from '../../hooks/redux/reduxHooks';
import { calendarApi } from '../../services/calendarApi';
import { deleteEvent } from '../../store/store';
import { IEvent } from '../../types/CalendarTypes'

interface DayPageEventProps {
    ev: IEvent;
}

const DayPageEvent: FC<DayPageEventProps> = ({ ev }) => {
    const { jwtToken, setJwtToken } = useContext(AuthToken)
    const dispatch = useAppDispatch()

    const [deleteOneEvent] = calendarApi.useDeleteEventMutation()

    const deleteEventHandler = async () => {
        jwtToken ? await deleteOneEvent(ev.id) : dispatch(deleteEvent(ev.id))
    }


    return (
        <div className="events-daypage__item item-events">
            <div className='item-events__circle' style={{ background: ev.bg }}></div>
            <p className='item-events__content'>{ev.content}</p>
            <button className='item-events__delete' onClick={deleteEventHandler}>X</button>
        </div>
    )
}

export default DayPageEvent
