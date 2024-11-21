import { PrismaClient } from '@prisma/client'
import categoryData from '../src/data/categories.json' assert { type: 'json' }
import userData from '../src/data/users.json' assert { type: 'json' }
import eventData from '../src/data/events.json' assert { type: 'json' }


const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })


async function main () {
  const { categories } = categoryData
  const { users } = userData
  const { events } = eventData


  for (const category of categories) {
    await prisma.category.upsert({ // update and insert
      where: { id: category.id },
      update: {},
      create: category
    })
  }

   for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user
    })
  }

  for (const event of events) {
    await prisma.event.upsert({
      where: { id: event.id },
      update: {},
      create: {
        id: event.id,
        createdBy: event.createdBy,
        title: event.title,
        description: event.description,
        image: event.image,
        categories: {
          connect: event.categoryIds.map((id) => ({ id })),
      }, location: event.location,
      startTime: event.startTime,
      endTime: event.endTime


    }
    })
  }
}

// id          String  @id @default(uuid())
//   createdBy   String
//   title       String
//   description String
//   image       String
//   categoryIds String
//   location    String
//   startTime   DateTime
//   endTime     DateTime
//   categories 


main() //promise handlers
  .then(async () => {
    await prisma.$disconnect() //disconnect client
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

