import React, { FC } from 'react'
import { IEvent } from '../../types/CalendarTypes'
import DayPageEvent from './DayPageEvent'

interface DayPageInnerProps {
    events: IEvent[],
    setEventModal: (visible: boolean) => void
}

const DayPageInner: FC<DayPageInnerProps> = ({ events, setEventModal }) => {
    return (
        <div className="daypage__inner inner-daypage">
            {events.length > 0
                ? <div className="inner-daypage__events events-daypage">
                    {events.map((ev, index) => <DayPageEvent ev={ev} key={index} />)}
                </div>
                : <h3 className='inner-daypage__nothing'>Событий на этот день нет</h3>
            }
            <button onClick={() => setEventModal(true)} >Добавить</button>
        </div>
    )
}

export default DayPageInner
