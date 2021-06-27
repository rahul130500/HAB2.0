const express = require("express");
const router = express.Router({ mergeParams: true });
const { isAdmin, isLoggedIn } = require("../middlewares/adminauth");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/notice_pdf");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.replace(/\s/g, "");
    cb(null, Date.now().toString() + fileName);
  },
});
const noticeController = require("../controllers/notice-controller");
const upload = multer({ storage: storage });

router.get("/", isLoggedIn,isAdmin, noticeController.getNotices);

router.get("/add", isLoggedIn,isAdmin, noticeController.addNoticeForm);

router.post(
  "/",
  isLoggedIn,
  isAdmin,
  upload.single("notice"),
  noticeController.postNotice
);



router.get("/:notice_id", noticeController.getEditForm);

router.get("/pdf/:notice_id", noticeController.getOneNotice);

router.put(
  "/:notice_id",
  isLoggedIn,
  isAdmin,  
  upload.single("notice"),
  noticeController.editNotice
);


module.exports = router;
