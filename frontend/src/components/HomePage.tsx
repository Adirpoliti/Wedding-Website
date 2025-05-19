import {
  AlbumTitle,
  MainContainer,
  MediaContainer,
  BtnsContainer,
  HomeBtns,
  CameraIcon,
  CollectionIcon,
} from "../styles/HomePage";

export const HomePage = () => {
  return (
    <>
      <MainContainer>
        <MediaContainer>
          <AlbumTitle>רותם וטל</AlbumTitle>
          <BtnsContainer>
            <HomeBtns>
              <CollectionIcon />
            </HomeBtns>
            <HomeBtns>
              <CameraIcon />
            </HomeBtns>
          </BtnsContainer>
        </MediaContainer>
      </MainContainer>
    </>
  );
};

//
