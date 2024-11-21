// import eventData from "../../data/events.json" assert { type: "json" };

// const deleteEventById = (id) => {
//   const eventIndex = eventData.events.findIndex((event) => event.id === id);

//   if (eventIndex === -1) {
//     return null;
//   }

//   const deletedevent = eventData.events.splice(eventIndex, 1);

//   return deletedevent;
// };

// export default deleteEventById;

import { PrismaClient } from '@prisma/client'
import NotFoundError from '../../errors/NotFoundError.js'

const deleteEvent = async (id) => {
  const prisma = new PrismaClient()


  const deleteEvent = await prisma.event.deleteMany({ //delete 0 or more items, the delete (without Many) function throws error if not found, we want to use our own error handler
    where: {
      id
    }
  })

  if (!deleteEvent || deleteEvent.count === 0) {
    throw new NotFoundError('Event', id)
  }

  return id
}
export default deleteEvent