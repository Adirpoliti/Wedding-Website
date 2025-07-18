// import * as React from "react";
// import { useState } from "react";
// import { useAppSelector } from "../app/hooks";
// import { selectToken } from "../features/user/userSlice";
// import { deletePicture } from "../services/albumServices";
// import { gridMediaQueries } from "../utils/MediaQueries";
// import type { FetchedPictureType } from "../types/pictureType";
// import {
//   Box,
//   ImageListItem,
//   IconButton,
//   ImageList,
//   CircularProgress,
// } from "@mui/material";
// import DownloadIcon from "@mui/icons-material/Download";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { PictureBtns } from "./PictureBtns";
// import { CustomTabPanel } from "./CustomTabPanel";
// import { PictureViewer } from "./PictureViewer";
// import { AlbumSelector } from "./AlbumSelector";
// import {
//   BtnBox,
//   CheckBoxBtn,
//   FadedImageWrapper,
//   GalleryContentBox,
//   ImageListItemWrapper,
// } from "../styles/AlbumStyles";

// interface AlbumProps {
//   checkedPics: string[];
//   fetchedPictures: FetchedPictureType[];
//   picsFromThePast: FetchedPictureType[];
//   picsFromCeremony: FetchedPictureType[];
//   onCheckboxToggle: (id: string) => void;
//   onDeletePicture: (id: string) => void;
//   albumFromUrl?: string | null;
// }

// const myAlbums = [
//   { label: "מבט אל העבר", key: "OldPics" },
//   { label: "חופה וקידושין", key: "CeremonyPics" },
//   { label: "עין קטנה", key: "weddingAlbum" },
// ];

// const splitPicturesByAlbum = (
//   weddingPics: FetchedPictureType[],
//   oldPics: FetchedPictureType[],
//   ceremonyPics: FetchedPictureType[]
// ): Record<string, FetchedPictureType[]> => ({
//   OldPics: oldPics,
//   weddingAlbum: weddingPics,
//   CeremonyPics: ceremonyPics,
// });

// export const Album = ({
//   checkedPics,
//   fetchedPictures,
//   picsFromThePast,
//   picsFromCeremony,
//   onCheckboxToggle,
//   onDeletePicture,
//   albumFromUrl,
// }: AlbumProps) => {
//   const token = useAppSelector(selectToken);
//   const albumIndex = myAlbums.findIndex((a) => a.key === albumFromUrl);
//   const [value, setValue] = useState(
//     albumIndex >= 0 ? albumIndex : myAlbums.length - 1
//   );

//   const [isViewerOpen, setIsViewerOpen] = useState(false);
//   const [albumsCurrentIndex, setAlbumsCurrentIndex] = useState(0);

//   const columns = gridMediaQueries();
//   const albumPictures = splitPicturesByAlbum(fetchedPictures, picsFromThePast, picsFromCeremony);

// const handleChange = (_: React.SyntheticEvent, newValue: number) => {
//   setValue(newValue);
// };

//   const handleDelete = async (picId: string) => {
//     if (!token) {
//       console.warn("Token is missing. Cannot delete.");
//       return;
//     }
//     try {
//       await deletePicture(token, picId);
//       onDeletePicture(picId);
//       setAlbumsCurrentIndex((prevIndex) => {
//         const newPics = albumPictures[myAlbums[value]?.key] ?? [];
//         const filteredPics = newPics.filter((pic) => pic._id !== picId);
//         if (prevIndex >= filteredPics.length) {
//           return Math.max(filteredPics.length - 1, 0);
//         }
//         return prevIndex;
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const openViewer = (index: number) => {
//     setAlbumsCurrentIndex(index);
//     setIsViewerOpen(true);
//   };

//   const closeViewer = () => {
//     setIsViewerOpen(false);
//   };

//   return (
//     <>
//       <GalleryContentBox>
//         {myAlbums.map(({ label, key }, index) => {
//           const pics = albumPictures[key] ?? [];

//           return (
//             <CustomTabPanel key={key} value={value} index={index}>
//               {pics.length === 0 ? (
//                 <Box
//                   style={{ margin: "0 auto", width: "fit-content" }}
//                   aria-label={`${label} loading spinner`}
//                 >
//                   <CircularProgress sx={{ color: "#9B6237" }} />
//                 </Box>
//               ) : (
//                 <ImageList
//                   variant="masonry"
//                   cols={columns}
//                   gap={8}
//                   sx={{
//                     display: "block",
//                     justifyContent: "center",
//                   }}
//                 >
//                   {pics.map((pic, index) => (
//                     <ImageListItemWrapper key={pic._id}>
//                       <ImageListItem>
//                         <FadeImage
//                           src={pic.photoUrl}
//                           alt={pic.fileName}
//                           onClick={() => openViewer(index)}
//                         />
//                       </ImageListItem>

//                       <BtnBox className="btn-box">
//                         <PictureBtns
//                           item1={
//                             <CheckBoxBtn
//                               checked={checkedPics.includes(pic._id)}
//                               onClick={() => onCheckboxToggle(pic._id)}
//                             />
//                           }
//                           item2={
//                             myAlbums[value]?.key === "weddingAlbum" ? (
//                               <IconButton>
//                                 <a href={pic.photoUrl} download={pic.fileName}>
//                                   <DownloadIcon
//                                     htmlColor="#859394"
//                                     style={{ marginTop: "10px" }}
//                                     titleAccess="הורדת תמונה"
//                                   />
//                                 </a>
//                               </IconButton>
//                             ) : undefined
//                           }
//                           item3={
//                             <IconButton onClick={() => handleDelete(pic._id)}>
//                               <DeleteIcon
//                                 htmlColor="#859394"
//                                 titleAccess="מחיקה"
//                               />
//                             </IconButton>
//                           }
//                         />
//                       </BtnBox>
//                     </ImageListItemWrapper>
//                   ))}
//                 </ImageList>
//               )}
//             </CustomTabPanel>
//           );
//         })}
//       </GalleryContentBox>

//       {isViewerOpen && (
//         <PictureViewer
//           albumKey={myAlbums[value]?.key}
//           pictures={albumPictures[myAlbums[value]?.key] ?? []}
//           currentIndex={albumsCurrentIndex}
//           onClose={closeViewer}
//           onChangeIndex={setAlbumsCurrentIndex}
//           onDelete={handleDelete}
//           checkedPics={checkedPics}
//           onCheckboxToggle={onCheckboxToggle}
//         />
//       )}

//       <AlbumSelector value={value} onChange={handleChange} albums={myAlbums} />
//     </>
//   );
// };

// /**
//  * FadeImage Component – fade in with background placeholder
//  */
// const FadeImage = ({
//   src,
//   alt,
//   onClick,
// }: {
//   src: string;
//   alt: string;
//   onClick?: () => void;
// }) => {
//   const [loaded, setLoaded] = useState(false);

//   return (
//     <FadedImageWrapper loaded={loaded} onClick={onClick}>
//       <img src={src} alt={alt} onLoad={() => setLoaded(true)} />
//     </FadedImageWrapper>
//   );
// };


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
  FadedImageWrapper,
  GalleryContentBox,
  ImageListItemWrapper,
} from "../styles/AlbumStyles";

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
  const albumPictures = splitPicturesByAlbum(fetchedPictures, picsFromThePast, picsFromCeremony);

  const handleDelete = async (picId: string) => {
    if (!token) return;
    try {
      await deletePicture(token, picId);
      onDeletePicture(picId);
      setAlbumsCurrentIndex((prevIndex) => {
        const newPics = albumPictures[albums[value]?.key] ?? [];
        const filteredPics = newPics.filter((pic) => pic._id !== picId);
        return prevIndex >= filteredPics.length ? Math.max(filteredPics.length - 1, 0) : prevIndex;
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
          return (
            <CustomTabPanel key={key} value={value} index={index}>
              {pics.length === 0 ? (
                <Box style={{ margin: "0 auto", width: "fit-content" }}>
                  <CircularProgress sx={{ color: "#9B6237" }} />
                </Box>
              ) : (
                <ImageList variant="masonry" cols={columns} gap={8}>
                  {pics.map((pic, index) => (
                    <ImageListItemWrapper key={pic._id}>
                      <ImageListItem>
                        <FadeImage
                          src={pic.photoUrl}
                          alt={pic.fileName}
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
                            albums[value]?.key === "weddingAlbum" ? (
                              <IconButton>
                                <a href={pic.photoUrl} download={pic.fileName}>
                                  <DownloadIcon htmlColor="#859394" style={{ marginTop: "10px" }} />
                                </a>
                              </IconButton>
                            ) : undefined
                          }
                          item3={
                            <IconButton onClick={() => handleDelete(pic._id)}>
                              <DeleteIcon htmlColor="#859394" />
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
          albumKey={albums[value]?.key}
          pictures={albumPictures[albums[value]?.key] ?? []}
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
  onClick,
}: {
  src: string;
  alt: string;
  onClick?: () => void;
}) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <FadedImageWrapper loaded={loaded} onClick={onClick}>
      <img src={src} alt={alt} onLoad={() => setLoaded(true)} />
    </FadedImageWrapper>
  );
};
