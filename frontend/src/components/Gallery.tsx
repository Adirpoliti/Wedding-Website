import { useState, useEffect } from "react";
import {
  GallerTitleImg,
  GalleryContainer,
  GalleryTitle,
  GalleryTitleBox,
} from "../styles/GalleryStyles";
import { Album } from "./Album";
import { CustomDrawer } from "./CustomDrawer";
import { getPictures, downloadChecked } from "../services/albumServices";
import type { FetchedPictureType } from "../types/pictureType";

export const Gallery = () => {
  const [checkedPics, setCheckedPics] = useState<string[]>([]);
  const [allPics, setAllPics] = useState<FetchedPictureType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pics = await getPictures();
        setAllPics(pics);
      } catch (err) {
        console.error("Error fetching pictures:", err);
      }
    };
    fetchData();
  }, []);

  const handleCheckboxToggle = (id: string) => {
    setCheckedPics((prevChecked) => {
      if (prevChecked.includes(id)) {
        return prevChecked.filter((picId) => picId !== id);
      } else {
        return [...prevChecked, id];
      }
    });
  };

  const handleDownloadChecked = async (ids: string[]) => {
    try {
      const response = await downloadChecked(ids);
      const url = URL.createObjectURL(response.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "WeddingAlbum.zip";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleSelectAllAndDownload = async () => {
    const allIds = allPics.map((pic) => pic._id);
    await handleDownloadChecked(allIds);
  };

  return (
    <GalleryContainer>
      <GalleryTitleBox>
        <CustomDrawer
          onDownloadChecked={() => handleDownloadChecked(checkedPics)}
          onSelectAllAndDownload={handleSelectAllAndDownload}
        />
        <GalleryTitle>רותם וטל</GalleryTitle>
        <GallerTitleImg src="/assets/images/ringspng.png" alt="rings" />
      </GalleryTitleBox>
      <Album
        checkedPics={checkedPics}
        onCheckboxToggle={handleCheckboxToggle}
        pictures={allPics}
      />
    </GalleryContainer>
  );
};
