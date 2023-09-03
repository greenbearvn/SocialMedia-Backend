const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const pagination = async(pageNumber) =>{
    


    return {
      totalCount,
      totalPages,
      pageSize,
      offset,
    };

  }

module.exports = pagination; 