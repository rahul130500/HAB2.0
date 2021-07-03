
const Notice = require("../models/notice");
const Category = require("../models/category");


const fs = require("fs");

exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find({});
    const categories = await Category.find({});

    notices.sort(compare);
    return res.render("admin/notice/index", { notices, categories });
  } catch (error) {
    console.log(error.message);
  }
};

exports.addNoticeForm = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.render("admin/notice/add", { categories });
  } catch (error) {
    console.log(error.message);
  }
};

exports.postNotice = async (req, res) => {
  try {
    var { title, description, category, link } = req.body;
    let name = category.toLowerCase();

    const path = req.file ? req.file.filename : link;
    if (!path) {
      req.flash("error", "Please attach your pdf!!");
      return res.redirect("/admin/notice/add");
    }
    //console.log(path);
    const newNotice = await new Notice({
      title,
      description,
      category: name,
      path,
    }).save();
    if (!newNotice) {
      req.flash("error", "Unable to add new notice");
      res.redirect("/admin/notice/add");
    }
    const savedCategory = await Category.find({ name: name });

    if (savedCategory.length == 0) {
      const newCategory = new Category({ name });
      await newCategory.save();
    }
    req.flash("success", "Successfully added new notice");
    return res.redirect("/admin/notice");
  } catch (error) {
    console.log(error.message);
  }
};



exports.getEditForm = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.notice_id);
    const categories = await Category.find({});

    return res.render("admin/notice/edit", { notice, categories });
  } catch (error) {
    console.log(error.message);
  }
};

exports.editNotice = async (req, res) => {
  try {
    var { title, description, category, link } = req.body;
    let name = category.toLowerCase();

    const path = req.file ? req.file.filename : link;
    let data;
    if (!req.file && !link) {
      data = { title, description, category: name };
    } else {
      data = { title, description, path, category: name };
    }

    const savedCategory = await Category.find({ name: name });

    if (savedCategory.length == 0) {
      const newCategory = new Category({ name });
      await newCategory.save();
    }

    const updatedNotice = await Notice.findByIdAndUpdate(
      req.params.notice_id,
      data
    );

    if (!updatedNotice) {
      req.flash("error", "Unable to edit notice");
      return res.redirect("/admin/notice");
    }
    req.flash("success", "Successfully editted notice");
    return res.redirect("/admin/notice");
  } catch (error) {
    console.log(error.message);
  }
};

exports.getOneNotice = async (req, res) => {
  try {
    const id = req.params.notice_id;
    const notice = await Notice.findById(id);
    const filePath = "uploads/notice_pdf/" + notice.path;
    console.log(filePath);
    fs.readFile(filePath, (err, data) => {
      res.contentType("application/pdf");
      return res.send(data);
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteNotice = async (req, res) => {
  try {
    const id = req.params.notice_id;
    const notice = await Notice.findById(id);
    if (notice.path.indexOf("https://") == -1) {
      fs.unlinkSync(`uploads/notice_pdf/${notice.path}`);
      console.log("successfully deleted!");
    }
    await Notice.findByIdAndRemove(id);
    req.flash("success", "Successfully deleted notice");
    return res.redirect("/admin/notice");
  } catch (err) {
    // handle the error
    console.log(err);
    return res.redirect("/admin/notice");
  }
};


const compare = (a, b) => {
  return b.creation - a.creation;
};
