import multer from "multer";
import path from "path";
import { Request } from "express";

const uploadDirectory = "uploads/";

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: Function
  ) {
    let dest = "";
    if (file.fieldname === "image") {
      dest = path.join(uploadDirectory, "images");
    } else if (file.fieldname === "trailer") {
      dest = path.join(uploadDirectory, "trailers");
    } else if (file.fieldname === "avatar") {
      dest = path.join(uploadDirectory, "avatar");
    }
    cb(null, dest);
  },
  filename: function (req: Request, file: Express.Multer.File, cb: Function) {
    const extension = file.originalname.split(".").pop();
    const fileName = file.originalname.replace(`.${extension}`, "");
    const finalFileName = `${fileName}.${extension}`;
    cb(null, finalFileName);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
  if (file.fieldname === "image" && file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else if (
    file.fieldname === "trailer" &&
    (file.mimetype === "audio/mpeg" || file.mimetype === "video/mp4")
  ) {
    cb(null, true);
  } else if (
    file.fieldname === "avatar" &&
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
