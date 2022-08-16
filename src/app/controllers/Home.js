class HomeController {
  // [GET] /new
  index(req, res) {
    res.render("home");
  }
}

// thêm từ khóa new nó sẽ tạo ra 1 đối tượng mới export ra ngoài
module.exports = new HomeController();
