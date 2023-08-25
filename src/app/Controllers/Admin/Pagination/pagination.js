const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const pagination = async(pageNumber) =>{
    const pageSize = 2;

    const offset = (pageNumber - 1) * pageSize;

    const totalCount = await prisma.user.count();
    const totalPages = Math.ceil(totalCount / pageSize);


    return {
      totalCount,
      totalPages,
      pageSize,
      offset,
    };

  }

module.exports = pagination; 