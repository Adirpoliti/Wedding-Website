import * as React from "react";
import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectToken } from "../features/user/userSlice";
import { deletePicture } from "../services/albumServices";
import { grideMdiaQueries } from "../utils/MediaQueries";
import type { FetchedPictureType } from "../types/pictureType";
import {
  Box,
  ImageListItem,
  IconButton,
  ImageList,
  CircularProgress,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import { PictureBtns } from "./PictureBtns";
import { CustomTabPanel } from "./CustomTabPanel";
import { PictureViewer } from "./PictureViewer";
import { AlbumSelector } from "./AlbumSelector";
import {
  BtnBox,
  CheckBoxBtn,
  GalleryContentBox,
  ImageListItemWrapper,
} from "../styles/AlbumStyles";

interface AlbumProps {
  checkedPics: string[];
  fetchedPictures: FetchedPictureType[]; // pictures for weddingAlbum only
  onCheckboxToggle: (id: string) => void;
  onDeletePicture: (id: string) => void;
}

const myAlbums = [
  { label: "מבט אל העבר", key: "OldPics" },
  { label: "חופה וקידושין", key: "CeremonyPics" },
  { label: "עין קטנה", key: "weddingAlbum" },
];

const splitPicturesByAlbum = (
  weddingPics: FetchedPictureType[]
): Record<string, FetchedPictureType[]> => ({
  pastPhotos: [], // no pictures for this album yet
  weddingAlbum: weddingPics,
});

export const Album = ({
  checkedPics,
  fetchedPictures,
  onCheckboxToggle,
  onDeletePicture,
}: AlbumProps) => {
  const token = useAppSelector(selectToken);
  const [value, setValue] = useState(myAlbums.length - 1);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [albumsCurrentIndex, setAlbumsCurrentIndex] = useState(0);

  const columns = grideMdiaQueries();
  const albumPictures = splitPicturesByAlbum(fetchedPictures);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDelete = async (picId: string) => {
    if (!token) {
      console.warn("Token is missing. Cannot delete.");
      return;
    }
    try {
      await deletePicture(token, picId);
      onDeletePicture(picId);
      setAlbumsCurrentIndex((prevIndex) => {
        const newPics = albumPictures[myAlbums[value]?.key] ?? [];
        const filteredPics = newPics.filter((pic) => pic._id !== picId);
        if (prevIndex >= filteredPics.length) {
          return Math.max(filteredPics.length - 1, 0);
        }
        return prevIndex;
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
        {myAlbums.map(({ label, key }, index) => {
          const pics = albumPictures[key] ?? [];

          return (
            <CustomTabPanel key={key} value={value} index={index}>
              {pics.length === 0 ? (
                <Box
                  style={{ margin: "0 auto", width: "fit-content" }}
                  aria-label={`${label} loading spinner`}
                >
                  <CircularProgress sx={{ color: "#9B6237" }} />
                </Box>
              ) : (
                <ImageList
                  variant="masonry"
                  cols={columns}
                  gap={8}
                  sx={{
                    display: "block",
                    justifyContent: "center",
                  }}
                >
                  {pics.map((pic, index) => (
                    <ImageListItemWrapper key={pic._id}>
                      <ImageListItem>
                        <img
                          style={{ borderRadius: "6px", cursor: "pointer" }}
                          src={pic.photoUrl}
                          alt={pic.fileName}
                          loading="lazy"
                          onClick={() => openViewer(index)}
                        />
                      </ImageListItem>

                      <BtnBox className="btn-box">
                        <PictureBtns
                          item1={
                            <CheckBoxBtn
                              checked={checkedPics.includes(pic._id)}
                              onClick={() => onCheckboxToggle(pic._id)}
                            />
                          }
                          item2={
                            <IconButton>
                              <a href={pic.photoUrl} download={pic.fileName}>
                                <DownloadIcon
                                  htmlColor="#859394"
                                  style={{ marginTop: "10px" }}
                                  titleAccess="הורדת תמונה"
                                />
                              </a>
                            </IconButton>
                          }
                          item3={
                            <IconButton onClick={() => handleDelete(pic._id)}>
                              <DeleteIcon
                                htmlColor="#859394"
                                titleAccess="מחיקה"
                              />
                            </IconButton>
                          }
                        />
                      </BtnBox>
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
          pictures={albumPictures[myAlbums[value]?.key] ?? []}
          currentIndex={albumsCurrentIndex}
          onClose={closeViewer}
          onChangeIndex={setAlbumsCurrentIndex}
          onDelete={handleDelete}
          checkedPics={checkedPics}
          onCheckboxToggle={onCheckboxToggle}
        />
      )}

      <AlbumSelector value={value} onChange={handleChange} albums={myAlbums} />
    </>
  );
};
