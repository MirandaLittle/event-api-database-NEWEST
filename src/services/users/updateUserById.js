// import userData from "../../data/users.json" assert { type: "json" };

// const updateUserById = (id, updatedUser) => {
//   const userIndex = userData.users.findIndex((user) => user.id === id);

//   if (userIndex === -1) {
//     return null;
//   }

//   // We make sure that the ID and other, unknown properties are not inserted
//   const { username, name, password, image } = updatedUser;

//   userData.users[userIndex] = {
//     ...userData.users[userIndex],
//     username: username || userData.users[userIndex].username,
//     name: name || userData.users[userIndex].name,
//     password: password || userData.users[userIndex].password,
//     image: image || userData.users[userIndex].image,
//   };

//   return userData.users[userIndex];
// };

// export default updateUserById;


import { PrismaClient } from '@prisma/client'
import NotFoundError from '../../errors/NotFoundError.js'

const updateUserById = async (id, updatedUser) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.updateMany({ // update 0 or more users
    where: {
      id
    },
    data: updatedUser
  });

  if (!user || user.count === 0) {
    throw new NotFoundError('User', id)
  }

  return {
    message: `User with id ${id} was updated!` // we don't return the updated user because updateMany doesn’t return anything other than the count of the updated objects
  }
};

export default updateUserById;
