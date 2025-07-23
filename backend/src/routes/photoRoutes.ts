import express from "express";
import archiver from "archiver";
import axios from "axios";
import {
  PhotoModel,
  PhotosFromThePastModel,
  PhotosFromTheCanopyModel,
} from "../models/PhotoModel";

const router = express.Router();

router.post(
  "/photo/download-zip",
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const { photoIds } = req.body;

      if (!Array.isArray(photoIds) || photoIds.length === 0) {
        res.status(400).json({ message: "No photo IDs provided" });
        return;
      }

      const [photos1, photos2, photos3] = await Promise.all([
        PhotoModel.find({ _id: { $in: photoIds } })
          .select("originalUrl fileName")
          .lean(),
        PhotosFromThePastModel.find({ _id: { $in: photoIds } })
          .select("originalUrl fileName")
          .lean(),
        PhotosFromTheCanopyModel.find({ _id: { $in: photoIds } })
          .select("originalUrl fileName")
          .lean(),
      ]);

      const allPhotos = [...photos1, ...photos2, ...photos3];

      const archive = archiver("zip", { zlib: { level: 9 } });

      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", "attachment; filename=photos.zip");

      archive.on("error", (err) => next(err));
      archive.pipe(res);

      await Promise.all(
        allPhotos.map(async (photo) => {
          try {
            const url = photo.originalUrl;
            if (!url) return;

            const response = await axios.get(url, { responseType: "stream" });
            const fileName = photo.fileName ?? url.split("/").pop() ?? "file.jpg";
            archive.append(response.data, { name: fileName });
          } catch (err) {
            console.warn(`Failed to fetch file: ${photo.originalUrl}`, err);
          }
        })
      );

      archive.finalize();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
