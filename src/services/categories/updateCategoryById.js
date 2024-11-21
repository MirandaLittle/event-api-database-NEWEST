// import categoriesData from "../../data/categories.json" assert { type: "json" };

// const updateCategoryById = (id, updatedCategory) => {
//   const categoryIndex = categoriesData.categories.findIndex(
//     (category) => category.id === id
//   );

//   if (categoryIndex === -1) {
//     return null;
//   }

//   const { name } = updatedCategory;

//   categoriesData.categories[categoryIndex] = {
//     ...categoriesData.categories[categoryIndex],
//     name: name || categoriesData.categories[categoryIndex].name,
//   };

//   return categoriesData.categories[categoryIndex];
// };

// export default updateCategoryById;


import { PrismaClient } from '@prisma/client'
import NotFoundError from '../../errors/NotFoundError.js'

const updateCategoryById = async (id, updatedCategory) => {
  const prisma = new PrismaClient();
  const category = await prisma.category.updateMany({ // update 0 or more categories
    where: {
      id
    },
    data: {
      updatedCategory,
    }
  });

  if (!category || category.count === 0) {
    throw new NotFoundError('Category', id)
  }

  return {
    message: `Category with id ${id} was updated!` // we don't return the updated category because updateMany doesn’t return anything other than the count of the updated objects
  }
};

export default updateCategoryById;