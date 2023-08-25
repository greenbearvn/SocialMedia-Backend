const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
var slug = require("slug");
const pagination = require('../Pagination/pagination')

class UserController {
  index = async (req, res) => {
    try {
      const pageNumber = parseInt(req.params.pageNumber);

      const { totalCount, totalPages, pageSize, offset } =
        pagination(pageNumber);
      const users = await prisma.user.findMany({
        skip: offset,
        take: pageSize,
      });

      return res.json({ users, totalCount, totalPages });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    } finally {
      await prisma.$disconnect();
    }
  };

  create = async (req, res) => {
    try {
      const newUser = await prisma.user.create({
        data: {
          name: req.body.name,
          email: req.body.email,
        },
      });
      res.json(newUser);
    } catch (error) {
      console.error("An error occurred:", error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the item." });
    } finally {
      await prisma.$disconnect();
    }
  };

  /// detail
  detail = async (req, res) => {
    try {
      const userId = parseInt(req.params.id);

      if (userId && userId !== 0) {
        const userDetail = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });
        return res.json({ userDetail });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: "Something went wrong!",
      });
    } finally {
      await prisma.$disconnect();
    }
  };

  update = async (req, res) => {
    try {
      const { name, email, id } = req.body;
      const userId = parseInt(id);
      console.log(req.body);
      const updateUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
          email,
        },
      });
      res.json(updateUser);
    } catch (error) {
      console.error("An error occurred:", error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the item." });
    } finally {
      await prisma.$disconnect();
    }
  };

  delete = async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const updateUser = await prisma.user.delete({
        where: {
          id: userId,
        },
      });
      res.json(updateUser);
    } catch (error) {
      console.error("An error occurred:", error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the item." });
    } finally {
      await prisma.$disconnect();
    }
  };

  // search = async (req, res) => {
  //   try {
  //     const { field, query } = req.body;
      
  //     const listUsers = await prisma.user.findMany({
  //       where: {
  //         name: {
  //           contains: query,
  //         },
  //       },
  //     });
  //     res.json(listUsers);
      

  //     // if (field === "name") {
  //     //   const listUsers = await prisma.user.findMany({
  //     //     where: {
  //     //       name: {
  //     //         contains: query,
  //     //       },
  //     //     },
  //     //   });
  //     //   res.json(listUsers);
  //     // } else {
  //     //   const listUsers = await prisma.user.findMany({
  //     //     where: {
  //     //       email: {
  //     //         contains: query,
  //     //       },
  //     //     },
  //     //   });
  //     //   res.json(listUsers);
  //     // }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //     res
  //       .status(500)
  //       .json({ error: "An error occurred while creating the item." });
  //   } finally {
  //     await prisma.$disconnect();
  //   }
  // };
  search = async (req, res) => {
    try {
      const { field, query } = req.body;
      console.log(query);
      const listUsers = await prisma.user.findMany({
        where: {
          name: {
            contains: query,
          },
        },
      });
      res.json(listUsers);
      
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).json({ error: "An error occurred while searching." });
    } finally {
      await prisma.$disconnect();
    }
  };

  sort = async (req, res) => {
    try {
      const { field, stt, pageNumber } = req.body;

      const { totalCount, totalPages, pageSize, offset } =
        pagination(pageNumber);

      console.log(pageSize);

      if (field === "id") {
        const users = await prisma.user.findMany({
          skip: offset,
          take: pageSize,
          orderBy: {
            id: stt,
          },
        });
        res.json(users);
      } else {
        const users = await prisma.user.findMany({
          skip: offset,
          take: pageSize,
          orderBy: {
            name: stt,
          },
        });
        res.json(users);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the item." });
    } finally {
      await prisma.$disconnect();
    }
  };
}

module.exports = new UserController();
