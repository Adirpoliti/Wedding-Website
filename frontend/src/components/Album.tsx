// import * as React from "react";
// import { useState, useEffect } from "react";
// import { useAppSelector } from "../app/hooks";
// import { selectToken } from "../features/user/userSlice";
// import { deletePicture } from "../services/albumServices";
// import { grideMdiaQueries } from "../utils/MediaQueries";
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
//   GalleryContentBox,
//   ImageListItemWrapper,
// } from "../styles/AlbumStyles";

// interface AlbumProps {
//   checkedPics: string[];
//   fetchedPictures: FetchedPictureType[];
//   picsFromThePast: FetchedPictureType[];
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
//   oldPics: FetchedPictureType[]
// ): Record<string, FetchedPictureType[]> => ({
//   OldPics: oldPics,
//   weddingAlbum: weddingPics,
//   CeremonyPics: [],
// });

// export const Album = ({
//   checkedPics,
//   fetchedPictures,
//   picsFromThePast,
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
//   const [imagesLoaded, setImagesLoaded] = useState(false);
//   const [imagesRendered, setImagesRendered] = useState(false);
//   const [loadedImagesCount, setLoadedImagesCount] = useState(0);

//   const columns = grideMdiaQueries();
//   const albumPictures = splitPicturesByAlbum(fetchedPictures, picsFromThePast);

//   const preloadImages = (urls: string[]) => {
//     return Promise.all(
//       urls.map((url) => {
//         return new Promise<void>((resolve, reject) => {
//           const img = new Image();
//           img.src = url;
//           img.onload = () => resolve();
//           img.onerror = () => reject();
//         });
//       })
//     );
//   };

//   useEffect(() => {
//     const pics = albumPictures[myAlbums[value]?.key] ?? [];
//     const urls = pics.map(pic => pic.photoUrl);

//     setImagesLoaded(false);
//     setImagesRendered(false);
//     setLoadedImagesCount(0);

//     preloadImages(urls)
//       .then(() => setImagesLoaded(true))
//       .catch((err) => {
//         console.error("Failed to load some images", err);
//         setImagesLoaded(true);
//       });
//   }, [value, fetchedPictures, picsFromThePast]);

//   const handleSingleImageLoad = () => {
//     setLoadedImagesCount(prev => {
//       const newCount = prev + 1;
//       const pics = albumPictures[myAlbums[value]?.key] ?? [];
//       if (newCount >= pics.length) {
//         setImagesRendered(true);
//       }
//       return newCount;
//     });
//   };

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue);
//   };

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
//         {(() => {
//           const { label, key } = myAlbums[value];
//           const pics = albumPictures[key] ?? [];

//           return (
//             <CustomTabPanel key={key} value={value} index={value}>
//               {!imagesLoaded ? (
//                 <Box
//                   style={{ margin: "0 auto", width: "fit-content" }}
//                   aria-label={`${label} loading spinner`}
//                 >
//                   <CircularProgress sx={{ color: "#9B6237" }} />
//                 </Box>
//               ) : (
//                 <Box
//                   sx={{
//                     opacity: imagesRendered ? 1 : 0,
//                     transition: "opacity 0.3s ease-in-out",
//                   }}
//                 >
//                   <ImageList
//                     variant="masonry"
//                     cols={columns}
//                     gap={8}
//                     sx={{
//                       display: "block",
//                       justifyContent: "center",
//                     }}
//                   >
//                     {pics.map((pic, index) => (
//                       <ImageListItemWrapper key={pic._id}>
//                         <ImageListItem>
//                           <img
//                             style={{ borderRadius: "6px", cursor: "pointer" }}
//                             src={pic.photoUrl}
//                             alt={pic.fileName}
//                             loading="lazy"
//                             onLoad={handleSingleImageLoad}
//                             onClick={() => openViewer(index)}
//                           />
//                         </ImageListItem>

//                         <BtnBox className="btn-box">
//                           <PictureBtns
//                             item1={
//                               <CheckBoxBtn
//                                 checked={checkedPics.includes(pic._id)}
//                                 onClick={() => onCheckboxToggle(pic._id)}
//                               />
//                             }
//                             item2={
//                               myAlbums[value]?.key === "weddingAlbum" ? (
//                                 <IconButton>
//                                   <a href={pic.photoUrl} download={pic.fileName}>
//                                     <DownloadIcon
//                                       htmlColor="#859394"
//                                       style={{ marginTop: "10px" }}
//                                       titleAccess="הורדת תמונה"
//                                     />
//                                   </a>
//                                 </IconButton>
//                               ) : undefined
//                             }
//                             item3={
//                               <IconButton onClick={() => handleDelete(pic._id)}>
//                                 <DeleteIcon
//                                   htmlColor="#859394"
//                                   titleAccess="מחיקה"
//                                 />
//                               </IconButton>
//                             }
//                           />
//                         </BtnBox>
//                       </ImageListItemWrapper>
//                     ))}
//                   </ImageList>
//                 </Box>
//               )}
//             </CustomTabPanel>
//           );
//         })()}
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



import * as React from "react";
import { useState, useEffect } from "react";
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
  fetchedPictures: FetchedPictureType[];
  picsFromThePast: FetchedPictureType[];
  onCheckboxToggle: (id: string) => void;
  onDeletePicture: (id: string) => void;
  albumFromUrl?: string | null;
}

const myAlbums = [
  { label: "מבט אל העבר", key: "OldPics" },
  { label: "חופה וקידושין", key: "CeremonyPics" },
  { label: "עין קטנה", key: "weddingAlbum" },
];

const splitPicturesByAlbum = (
  weddingPics: FetchedPictureType[],
  oldPics: FetchedPictureType[]
): Record<string, FetchedPictureType[]> => ({
  OldPics: oldPics,
  weddingAlbum: weddingPics,
  CeremonyPics: [],
});

export const Album = ({
  checkedPics,
  fetchedPictures,
  picsFromThePast,
  onCheckboxToggle,
  onDeletePicture,
  albumFromUrl,
}: AlbumProps) => {
  const token = useAppSelector(selectToken);
  const albumIndex = myAlbums.findIndex((a) => a.key === albumFromUrl);
  const [value, setValue] = useState(
    albumIndex >= 0 ? albumIndex : myAlbums.length - 1
  );

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [albumsCurrentIndex, setAlbumsCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const albumIndex = myAlbums.findIndex((a) => a.key === albumFromUrl);
    if (albumIndex >= 0) {
      setValue(albumIndex);
    }
  }, [albumFromUrl]);

 useEffect(() => {
  const pics = albumPictures[myAlbums[value]?.key] ?? [];
  const urls = pics.map(pic => pic.photoUrl);

  setImagesLoaded(false);

  preloadImages(urls)
    .then(() => setImagesLoaded(true))
    .catch((err) => {
      console.error("Failed to load some images", err);
      setImagesLoaded(true);
    });
}, [value, fetchedPictures, picsFromThePast]);

  const preloadImages = (urls: string[]) => {
  return Promise.all(
    urls.map((url) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve();
        img.onerror = () => reject();
      });
    })
  );
};


  const columns = grideMdiaQueries();
  const albumPictures = splitPicturesByAlbum(fetchedPictures, picsFromThePast);

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
                            myAlbums[value]?.key === "weddingAlbum" ? (
                              <IconButton>
                                <a href={pic.photoUrl} download={pic.fileName}>
                                  <DownloadIcon
                                    htmlColor="#859394"
                                    style={{ marginTop: "10px" }}
                                    titleAccess="הורדת תמונה"
                                  />
                                </a>
                              </IconButton>
                            ) : undefined
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
          albumKey={myAlbums[value]?.key}
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