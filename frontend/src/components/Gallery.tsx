import { useState } from "react";
import {
  GallerTitleImg,
  GalleryContainer,
  GalleryTitle,
  GalleryTitleBox,
} from "../styles/GalleryStyles";
import { Album } from "./Album";
import { CustomDrawer } from "./CustomDrawer";

export const Gallery = () => {
  const [checkedPics, setCheckedPics] = useState<string[]>([]);

  const handleCheckboxToggle = (id: string) => {
    setCheckedPics((prevChecked) => {
      if (prevChecked.includes(id)) {
        return prevChecked.filter((picId) => picId !== id);
      } else {
        return [...prevChecked, id];
      }
    });
  };

  return (
    <GalleryContainer>
      <GalleryTitleBox>
        <CustomDrawer checkedList={checkedPics} />
        <GalleryTitle>רותם וטל</GalleryTitle>
        <GallerTitleImg src="/assets/images/ringspng.png" alt="rings" />
      </GalleryTitleBox>
      <Album checkedPics={checkedPics}
      onCheckboxToggle={handleCheckboxToggle}/>
    </GalleryContainer>
  );
};
