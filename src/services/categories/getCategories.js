import { PrismaClient } from '@prisma/client'

const getCategories =  async () => {
  const prisma = new PrismaClient()

  return prisma.category.findMany()
  }


export default getCategories