class HomeController {
  /// LIST BLOG
  async CreatePost(req, res) {
    const fileNames = req.files.map((file) => file.originalname);

    // Do something with the file names, like sending a response
    res.json({ fileNames });
  }
}

module.exports = new HomeController();
