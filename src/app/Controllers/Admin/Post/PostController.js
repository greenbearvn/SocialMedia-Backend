const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class PostController {
  index = async (req, res) => {
    try {
      const pageNumber = parseInt(req.params.pageNumber);
      const pageSize = 2;

      const offset = (pageNumber - 1) * pageSize;

      const totalCount = await prisma.post.count();
      const totalPages = Math.ceil(totalCount / pageSize);

      const listPosts = await prisma.post.findMany({
        skip: offset,
        take: pageSize,
        select: {
          postId: true,
          desc: true,
          imageUrl: true,
          status:true,
          createAt:true,
          mode: {
            select: {
              modeId: true,
              modeName: true, 
            },
          },
          reaction: {
            select: {
              reactionId: true,
              nameReaction: true,
            }
          },
          user: {
            select: {
              profile: {
                select: {
                  fullname: true,
                },
              },
            },
          },
        },
      });

      return res.json({ listPosts, totalCount, totalPages });
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

  listMode = async (req, res) => {
    try {
      const modes = await prisma.mode.findMany();
      if (modes) {
        return res.json({ modes });
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

  listReact = async (req, res) => {
    try {
      const reactions = await prisma.reaction.findMany();

      if (reactions) {
        return res.json({ reactions });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        ok: false,
        error: "Something went wrong!",
        details: error.message,
      });
    } finally {
      // await prisma.$disconnect(); // Move this outside the finally block
    }
    await prisma.$disconnect(); // Disconnect here
  };

  listUser = async (req, res) => {
    try {
      const users = await prisma.$queryRawUnsafe("SELECT * FROM user");
      if (users) {
        return res.json({ users });
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

  // create = async (req, res) => {
  //   try {
  //     const date = new Date();

  //     const { des, modes, reacts, users, image } = req.body;

  //     if (image && des && modes && reacts && users) {
  //       const newPost = await prisma.post.create({
  //         data: {
  //           desc: des,
  //           imageUrl: image,
  //           createAt: date,
  //           modeId: modes,
  //           reactionId: reacts,
  //           userId: users,
  //         },
  //       });
  //       res.json(newPost);
  //     } else if (!image && des && modes && reacts && users) {
  //       const newPost = await prisma.post.create({
  //         data: {
  //           desc: des,
  //           createAt: date,
  //           modeId: modes,
  //           reactionId: reacts,
  //           userId: users,
  //         },
  //       });
  //       res.json(newPost);
  //     } else if (image && !des && modes && reacts && users) {
  //       const newPost = await prisma.post.create({
  //         data: {
  //           imageUrl: image,
  //           createAt: date,
  //           modeId: modes,
  //           reactionId: reacts,
  //           userId: users,
  //         },
  //       });
  //       res.json(newPost);
  //     } else if (image && des && !modes && reacts && users) {
  //       const newPost = await prisma.post.create({
  //         data: {
  //           desc: des,
  //           imageUrl: image,
  //           createAt: date,

  //           reactionId: reacts,
  //           userId: users,
  //         },
  //       });
  //       res.json(newPost);
  //     } else if (image && des && modes && !reacts && users) {
  //       const newPost = await prisma.post.create({
  //         data: {
  //           desc: des,
  //           imageUrl: image,
  //           createAt: date,
  //           modeId: modes,
  //           userId: users,
  //         },
  //       });
  //       res.json(newPost);
  //     } else if (image && des && modes && reacts && !users) {
  //       const newPost = await prisma.post.create({
  //         data: {
  //           desc: des,
  //           imageUrl: image,
  //           createAt: date,
  //           modeId: modes,
  //           reactionId: reacts,
  //         },
  //       });
  //       res.json(newPost);
  //     }

  //     res.json(newPost);
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //     res
  //       .status(500)
  //       .json({ error: "An error occurred while creating the item." });
  //   } finally {
  //     await prisma.$disconnect();
  //   }
  // };
  detail = async (req, res) => {
    try {
      const postId = parseInt(req.params.id);

      if (postId && postId !== 0) {
        const detail = await prisma.post.findUnique({
          where: {
            postId: postId,
          },
        });
        return res.json({ detail });
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

  create = async (req, res) => {
    try {
      const date = new Date();
      const { desc, imageUrl, modes, reacts, users } = req.body;

      const postData = {
        createAt: date,
        userId: users,
      };

      if (desc) postData.desc = desc;
      if (imageUrl) postData.imageUrl = imageUrl;
      if (modes) postData.modeId = modes;
      if (reacts) postData.reactionId = reacts;

      const newPost = await prisma.post.create({
        data: postData,
      });

      res.json(newPost);
    } catch (error) {
      console.error("An error occurred:", error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the item." });
    } finally {
      await prisma.$disconnect();
    }
  };

  update = async (req, res) => {
    try {
      const { postId, date, desc, imageUrl, modes, reacts, users } = req.body;

      const postData = {
        postId: postId,
      };

      if (desc) postData.desc = desc;
      if (imageUrl) postData.imageUrl = imageUrl;
      if (modes) postData.modeId = modes;
      if (reacts) postData.reactionId = reacts;
      if (users) postData.userId = users;

      const newPost = await prisma.post.update({
        where: {
          postId: postId,
        },
        data: postData,
      });

      res.json(newPost);
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
      const postId = parseInt(req.params.postId);
      const user = await prisma.user.delete({
        where: {
          id: postId,
        },
      });
      res.json(user);
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

module.exports = new PostController();
