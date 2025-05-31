import {
  GalleryContainer,
  GalleryTitle,
  GalleryTitleBox,
} from "../styles/GalleryStyles";
import GalleryMenu from "./GalleryMenu";
import { Pictures } from "./Pictures";

export const Gallery = () => {
  return (
    <GalleryContainer>
      <GalleryTitleBox>
        <GalleryTitle>רותם וטל</GalleryTitle>
      </GalleryTitleBox>
      <Pictures />
      <GalleryMenu />
    </GalleryContainer>
  );
};
