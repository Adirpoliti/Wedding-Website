
import * as React from "react";
import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectToken } from "../features/user/userSlice";
import { deletePicture } from "../services/albumServices";
import { gridMediaQueries } from "../utils/MediaQueries";
import type { FetchedPictureType } from "../types/pictureType";
import {
  Box,
  ImageListItem,
  ImageList,
  CircularProgress,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import { PictureBtns } from "./PictureBtns";
import { CustomTabPanel } from "./CustomTabPanel";
import { PictureViewer } from "./PictureViewer";
import { AlbumSelector } from "./AlbumSelector";
import {
  AlbumsVideoPlayBtn,
  BtnBox,
  CheckBoxBtn,
  FadedImageWrapper,
  GalleryContentBox,
  ImageListItemWrapper,
} from "../styles/AlbumStyles";
import { ItemBox, ItemBoxA } from "../styles/PictureBtnsStyle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface AlbumProps {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  albums: { label: string; key: string }[];
  checkedPics: string[];
  fetchedPictures: FetchedPictureType[];
  picsFromThePast: FetchedPictureType[];
  picsFromCeremony: FetchedPictureType[];
  onCheckboxToggle: (id: string) => void;
  onDeletePicture: (id: string) => void;
}

const splitPicturesByAlbum = (
  weddingPics: FetchedPictureType[],
  oldPics: FetchedPictureType[],
  ceremonyPics: FetchedPictureType[]
): Record<string, FetchedPictureType[]> => ({
  OldPics: oldPics,
  weddingAlbum: weddingPics,
  CeremonyPics: ceremonyPics,
});

export const Album = ({
  value,
  onChange,
  albums,
  checkedPics,
  fetchedPictures,
  picsFromThePast,
  picsFromCeremony,
  onCheckboxToggle,
  onDeletePicture,
}: AlbumProps) => {
  const token = useAppSelector(selectToken);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [albumsCurrentIndex, setAlbumsCurrentIndex] = useState(0);
  const columns = gridMediaQueries();
  const albumPictures = splitPicturesByAlbum(
    fetchedPictures,
    picsFromThePast,
    picsFromCeremony
  );

  const isAdmin = useAppSelector((state) => state.user.user?.role === "Admin");

  const handleDelete = async (picId: string) => {
    if (!token) return;
    try {
      await deletePicture(token, picId);
      onDeletePicture(picId);
      setAlbumsCurrentIndex((prevIndex) => {
        const newPics = albumPictures[albums[value]?.key] ?? [];
        const filteredPics = newPics.filter((pic) => pic._id !== picId);
        return prevIndex >= filteredPics.length
          ? Math.max(filteredPics.length - 1, 0)
          : prevIndex;
      });
    } catch (err) {
      console.log(err);
    }
  };

  const openViewer = (index: number) => {
    setAlbumsCurrentIndex(index);
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
  };

  return (
    <>
      <GalleryContentBox>
        {albums.map(({ label, key }, index) => {
          const pics = albumPictures[key] ?? [];
          const displayedPics =
            key === "CeremonyPics" ? pics : pics.slice().reverse();

          return (
            <CustomTabPanel key={key} value={value} index={index}>
              {pics.length === 0 ? (
                <Box style={{ margin: "0 auto", width: "fit-content" }}>
                  <CircularProgress sx={{ color: "#9B6237" }} />
                </Box>
              ) : (
                <ImageList cols={columns} gap={8}>
                  {displayedPics.map((pic, index) => (
                    <ImageListItemWrapper key={pic._id}>
                      <ImageListItem>
                        <FadeImage
                          src={pic.compressedUrl || pic.originalUrl}
                          alt={pic.fileName}
                          type={pic.type as "image" | "video"}
                          onClick={() => openViewer(index)}
                        />
                      </ImageListItem>
                      {(isAdmin || (!isAdmin && key === "weddingAlbum")) && (
                        <BtnBox className="btn-box">
                          <PictureBtns
                            albumKey={key}
                            item1={
                              <ItemBox
                                onClick={() => onCheckboxToggle(pic._id)}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                    color: "#fff",
                                  }}
                                >
                                  בחירה
                                </Typography>
                                <Box
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  <CheckBoxBtn
                                    checked={checkedPics.includes(pic._id)}
                                  />
                                </Box>
                              </ItemBox>
                            }
                            item2={
                              <ItemBoxA
                                component="a"
                                href={pic.originalUrl}
                                download={pic.fileName}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                    color: "#fff",
                                  }}
                                >
                                  הורדה
                                </Typography>
                                <DownloadIcon
                                  htmlColor="#fff"
                                  fontSize="medium"
                                />
                              </ItemBoxA>
                            }
                            item3={
                              <ItemBox onClick={() => handleDelete(pic._id)}>
                                <Typography
                                  sx={{
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                    color: "#fff",
                                  }}
                                >
                                  מחיקה
                                </Typography>
                                <DeleteIcon
                                  htmlColor="#fff"
                                  fontSize="medium"
                                />
                              </ItemBox>
                            }
                          />
                        </BtnBox>
                      )}
                    </ImageListItemWrapper>
                  ))}
                </ImageList>
              )}
            </CustomTabPanel>
          );
        })}
      </GalleryContentBox>
      {isViewerOpen && (
        <PictureViewer
          albumKey={albums[value]?.key}
          pictures={
            (albumPictures[albums[value]?.key] ?? []) as {
              _id: string;
              originalUrl: string;
              compressedUrl: string;
              fileName: string;
              type: "image" | "video";
            }[]
          }
          currentIndex={albumsCurrentIndex}
          onClose={closeViewer}
          onChangeIndex={setAlbumsCurrentIndex}
          onDelete={handleDelete}
          checkedPics={checkedPics}
          onCheckboxToggle={onCheckboxToggle}
        />
      )}
      <AlbumSelector value={value} onChange={onChange} albums={albums} />
    </>
  );
};

const FadeImage = ({
  src,
  alt,
  type,
  onClick,
}: {
  src: string;
  alt: string;
  type: "image" | "video";
  onClick?: () => void;
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <FadedImageWrapper loaded={loaded} onClick={onClick}>
      {type === "video" ? (
        <>
          <video
            src={src}
            onLoadedData={() => setLoaded(true)}
            muted
            playsInline
            controls={false}
            style={{ width: "100%", height: "auto" }}
          />
          <AlbumsVideoPlayBtn>
            <PlayArrowIcon
              style={{
                fontSize: "5rem",
                color: "#fff",
              }}
            />
          </AlbumsVideoPlayBtn>
        </>
      ) : (
        <img src={src} alt={alt} onLoad={() => setLoaded(true)} />
      )}
    </FadedImageWrapper>
  );
};