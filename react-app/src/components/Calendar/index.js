import React from "react";
import { useState, useEffect } from "react";
import { filterEventThunk, loadUserEventsThunk } from "../../store/events-in-user";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from 'framer-motion'
import './calendar.css'


export const ShowCalendar = ({ setSubmit, allEvents }) => {
    // user id
    const { id } = useParams()
    const [errors, setErrors] = useState([])
    const [date, setDate] = useState()
    const dispatch = useDispatch()



    console.log(allEvents, 'all events prop')

    let filteredEvents;
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(date, '<-- date on submission')


        console.log(typeof (date), '+++++ type of date')

        if (typeof (date) != String && !date) {
            const errors = []
            errors.push('Please enter a valid date')
            setErrors(errors)
            return
        }
        setErrors([])
        const formatDate = date.split('T').join(' ') + ':00'


        const payload = {
            datetime: formatDate
        }

        console.log(payload, '<- payload going into thunk')

        filteredEvents = await dispatch(filterEventThunk(payload, id))
        setSubmit(true)
    }

    const eventsFromThunk = useSelector(state => Object.values(state.usersEvents))


    console.log(eventsFromThunk, '<- filtered events from thunk')

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    {errors && errors.map((error) => (
                        <li className='error' key={error} style={{ color: 'red' }}>{error}</li>
                    ))}
                    <input
                        type="datetime-local"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >Pick a Date</motion.button>

                </form>
                <motion.button
                    onClick={() => dispatch(loadUserEventsThunk(id))}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: .9 }}
                >Clear Filter</motion.button>
            </div>
            <div className='calendarRes'>
                {eventsFromThunk?.map(event => (
                    <a href={`/events/${event.id}`}>
                        <p className="calContent">{event.title}</p>
                        <img src={event.background_img} style={{ width: 300, height: 200 }} />
                        {/* <p>{event.location}</p> */}
                    </a>
                ))}
            </div>
        </>
    )
}
