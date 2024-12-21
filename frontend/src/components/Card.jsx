import React from 'react'
import { Link} from "react-router-dom";


function Card({event}) {
  
  const date = new Date(event.date)

  return (
    <div className='group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl md:min-h-[438px]'>
    <Link path={`/events/${event._id}`}>
       <img src={event.imageURL} alt="" className='rounded-md h-[40vh] object-cover w-full'/>
       <div className='py-5 px-2 '>
        <h4 className='font-bold text-[1.2rem]'>{event.title}</h4>
        <div className='py-5 flex justify-between'><span className='pr-8'><i className="fa-solid fa-calendar-days mr-2"></i>{date.toLocaleDateString('ur-PK')}</span>
        <span><i className="fa-solid fa-location-dot mr-2"></i>{event.location}</span></div>
        <p>{event.description}</p>
        <div className='mt-5 mb-3 flex justify-between items-center'>
          <span className='bg-black text-white py-2 rounded-full px-4'>Only {eval(event.capacity-event.bookedSeats)} Seats Left</span>
          <button className='bg-transparent border-2 border-black rounded-full py-2 px-4 hover:bg-black hover:text-white'>Book Seat</button>
        </div>
       </div>
    </Link>
    </div>
  )
}

export default Card