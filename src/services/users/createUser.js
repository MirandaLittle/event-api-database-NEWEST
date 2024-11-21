// import { v4 as uuidv4 } from "uuid";
// import userData from "../../data/users.json" assert { type: "json" };

// const createUser = (username, name, password, image) => {
//   const newUser = {
//     id: uuidv4(),
//     name,
//     username,
//     password,
//     image,
//   };

//   userData.users.push(newUser);

//   return newUser;
// };

// export default createUser;

import { PrismaClient } from '@prisma/client'

const createUser = async (username, name, password, image) => {
  const prisma = new PrismaClient()
  

  return prisma.user.create({
    data: {
    name,
    username,
    password,
    image,
    }
  })
}

export default createUser;