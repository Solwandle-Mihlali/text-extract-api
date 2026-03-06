import express, {} from "express";
import { handleUpload } from "../controllers/uploadController.js";
import { upload } from "../middleware/uploadMiddlewear.js";
const uploadRouter = express.Router();
uploadRouter.get("/uploads", (req, res) => {
    res.json({
        messge: "Hello Uploader",
    });
});
uploadRouter.post("/upload", upload.single("file"), handleUpload);
export default uploadRouter;
//# sourceMappingURL=uploadRoute.js.map