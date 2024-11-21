// import categoriesData from "../../data/categories.json" assert { type: "json" };

// const getCategoryById = (id) => {
//   return categoriesData.categories.find((category) => category.id === id);
// };

// export default getCategoryById;

import { PrismaClient } from "@prisma/client";

const getCategoryById = async (id) => {
  const prisma = new PrismaClient()
  const category = await prisma.category.findUnique({ //findUnique only works with id, not name etc
    where: {
      id
    }
  })

  if (!category) {
    throw new NotFoundError('Category', id)
  }

  return category
}


export default getCategoryById    