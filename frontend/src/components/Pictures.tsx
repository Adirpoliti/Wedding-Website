import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useEffect, useState } from "react";
import { getPictures } from "../services/picturesServices/productServices";
import type { FetchedPictureType } from "../types/pictureType";

export const Pictures = () => {
  const [fetchedPics, setFetchedPics] = useState<FetchedPictureType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPics = await getPictures();
        console.log("allPics", allPics);

        setFetchedPics(allPics);
      } catch (err) {
        console.log("fetching error", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "green",
      }}
    >
      <ImageList variant="masonry" cols={3} gap={8}>
        {fetchedPics.length > 0 ? (
          fetchedPics.map((pic) => (
            <ImageListItem key={pic._id}>
              <img
                style={{ borderRadius: "6px" }}
                src={`${pic.photoUrl}`}
                alt={pic.fileName}
                loading="lazy"
              />
            </ImageListItem>
          ))
        ) : (
          <div>no data</div>
        )}
      </ImageList>
    </Box>
  );
};