


class HomeController {
  /// LIST BLOG
  async CreatePost(req, res) {
    res.json({ message: "File(s) uploaded successfully" });
  }
}

module.exports = new HomeController();
