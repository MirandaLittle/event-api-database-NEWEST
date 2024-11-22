// import eventData from "../../data/events.json" assert { type: "json" };

// const updateEventById = (id, updatedEvent) => {
//   const eventIndex = eventData.events.findIndex((event) => event.id === id);

//   if (eventIndex === -1) {
//     return null;
//   }

//   const {
//     title,
//     description,
//     location,
//     image,
//     startTime,
//     endTime,
//     createdBy,
//     categoryIds,
//   } = updatedEvent;

//   eventData.events[eventIndex] = {
//     ...eventData.events[eventIndex],
//     title: title || eventData.events[eventIndex].title,
//     description: description || eventData.events[eventIndex].description,
//     location: location || eventData.events[eventIndex].location,
//     image: image || eventData.events[eventIndex].image,
//     startTime: startTime || eventData.events[eventIndex].startTime,
//     endTime: endTime || eventData.events[eventIndex].endTime,
//     createdBy: createdBy || eventData.events[eventIndex].createdBy,
//     categoryIds: categoryIds || eventData.events[eventIndex].categoryIds,
//   };

//   return eventData.events[eventIndex];
// };

// export default updateEventById;


import { PrismaClient } from '@prisma/client'
import NotFoundError from '../../errors/NotFoundError.js'

const updateEventById = async (id, updatedEvent) => {
  const prisma = new PrismaClient();
  const { categoryIds, createdBy, ...rest } = updatedEvent;

// Here we can't use updateMany() because we need to update the createdBy and categories fields if it is passed
  const event = await prisma.event.update({
    
    where: { id },
    data: {
      ...rest,
      createdBy: createdBy
        ? {
            connect: { id: createdBy },
          }
        : undefined,
      categories: categoryIds
        ? {
            set: categoryIds.map((id) => ({ id })),
          }
        : undefined,
    },
  });

  console.log('Data:', {
    title,
    description,
    location,
    image,
    startTime,
    endTime,
    createdBy,
    categoryIds,
    });

  if (!event || event.count === 0) {
    throw new NotFoundError('Event', id)
  }

return event;
};


export default updateEventById;

// De ? en de : zijn een soort if-check, eigenlijk staat hier de volgende code:
// if (createdBy) {
//   data.createdBy = { connect: { id: createdBy } };
// } else {
//   data.createdBy = undefined;
// }
// connect maakt hier een link aan met een bestaand item, terwijl set een bestaande relatie weghaalt en een nieuwe aanmaakt.
// Set is handig om te gebruiken als je met meerdere categorieën werkt welke vaker kunnen veranderen. De createdBy verandert in principe niet.

