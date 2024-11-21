// import userData from "../../data/users.json" assert { type: "json" };

// const getUsers = () => {
//   return userData.users;
// };

// export default getUsers;

import { PrismaClient } from '@prisma/client'

const getUsers =  async (title, location) => {
  const prisma = new PrismaClient()

  return prisma.user.findMany()
}

export default getUsers
