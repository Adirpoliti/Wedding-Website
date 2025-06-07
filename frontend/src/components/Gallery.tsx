import {
  GallerTitleImg,
  GalleryContainer,
  GalleryTitle,
  GalleryTitleBox,
} from "../styles/GalleryStyles";
import { Album } from "./Album";

export const Gallery = () => {
  return (
    <GalleryContainer>
      <GalleryTitleBox>
        <GalleryTitle>רותם וטל</GalleryTitle>
        <GallerTitleImg src="/assets/images/ringspng.png" alt="rings" />
      </GalleryTitleBox>
      <Album />
    </GalleryContainer>
  );
};
