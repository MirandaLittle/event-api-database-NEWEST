// import eventsData from "../../data/events.json" assert { type: "json" };

// const getEventById = (id) => {
//   return eventsData.events.find((event) => event.id === id);
// };

// export default getEventById;
import { PrismaClient } from "@prisma/client";
import NotFoundError from '../../errors/NotFoundError.js'

const getEventById = async (id) => {
  const prisma = new PrismaClient();
  const event = await prisma.event.findUnique({ //findUnique only works with id, not name etc
    where: { id },
  })

  if (!event) {
    throw new NotFoundError('Event', id)
  }

  return event;
}

export default getEventById   