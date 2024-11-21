import { PrismaClient } from '@prisma/client'

const createCategory = async (name) => {
  const prisma = new PrismaClient()

  return prisma.category.create({
    data: {
      name
    }
  })
}

export default createCategory;