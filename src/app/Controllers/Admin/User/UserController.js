const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
var slug = require("slug");

class UserController {
  index = async (req, res) => {
    try {
      const users = await prisma.user.findMany();

      if (users.length === 0) {
        return res
          .status(404)
          .json({ ok: false, message: "List of users is empty" });
      }

      return res.json({ ok: true, users }); // Changed 'ok' value to true
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
      console.log(req.body)
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
}

module.exports = new UserController();
