import express from "express";
import archiver from "archiver";
import axios from "axios";
import { PhotoModel } from "../models/PhotoModel";

const router = express.Router();

router.post("/photo/download-zip", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { photoIds } = req.body;

    if (!Array.isArray(photoIds) || photoIds.length === 0) {
      res.status(400).json({ message: "No photo IDs provided" });
      return;
    }

    const photos = await PhotoModel.find({ _id: { $in: photoIds } })
      .select("photoUrl fileName")
      .lean();

    const archive = archiver("zip", { zlib: { level: 9 } });

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", "attachment; filename=photos.zip");

    archive.on("error", err => next(err));
    archive.pipe(res);

    for (const photo of photos) {
      const response = await axios.get(photo.photoUrl, { responseType: "stream" });
      const fileName = photo.fileName || photo.photoUrl.split("/").pop() || "file.jpg";
      archive.append(response.data, { name: fileName });
    }

    archive.finalize();
  } catch (error) {
    next(error);
  }
});

export default router;