import { PrismaClient } from '@prisma/client'
import NotFoundError from '../../errors/NotFoundError.js'

const deleteCategoryById = async (id) => {
  const prisma = new PrismaClient()


  const deleteCategory = await prisma.category.deleteMany({ //delete 0 or more items, the delete (without Many) function throws error if not found, we want to use our own error handler
    where: {
      id
    }
  })

  if (!deleteCategory || deleteCategory.count === 0) {
    throw new NotFoundError('Category', id)
  }

  return id
}
export default deleteCategoryById