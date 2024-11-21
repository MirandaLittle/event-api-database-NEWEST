// import userData from "../../data/users.json" assert { type: "json" };

// const deleteUserById = (id) => {
//   const userIndex = userData.users.findIndex((user) => user.id === id);

//   if (userIndex === -1) {
//     return null;
//   }

//   const deletedUser = userData.users.splice(userIndex, 1);

//   return deletedUser;
// };

// export default deleteUserById;


import { PrismaClient } from '@prisma/client'
import NotFoundError from '../../errors/NotFoundError.js'

const deleteUser = async (id) => {
  const prisma = new PrismaClient()


  const deleteUser = await prisma.user.deleteMany({ //delete 0 or more items, the delete (without Many) function throws error if not found, we want to use our own error handler
    where: {
      id
    }
  })

  if (!deleteUser || deleteUser.count === 0) {
    throw new NotFoundError('User', id)
  }

  return id
}
export default deleteUser