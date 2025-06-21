// import * as React from "react";
// import { useState } from "react";
// import type { FetchedPictureType } from "../types/pictureType";
// import { deletePicture } from "../services/albumServices";
// import {
//   Box,
//   ImageListItem,
//   IconButton,
//   ImageList,
//   CircularProgress,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import DownloadIcon from "@mui/icons-material/Download";
// import DeleteIcon from "@mui/icons-material/Delete";
// import {
//   AlbumMenu,
//   AlbumMenuTab,
//   BtnBox,
//   CheckBoxBtn,
//   CustomTabs,
//   GalleryContentBox,
//   ImageListItemWrapper,
// } from "../styles/GalleryStyles";
// import { PictureBtns } from "./PictureBtns";
// import { useAppSelector } from "../app/hooks";
// import { selectToken } from "../features/user/userSlice";

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// function CustomTabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3, color: "#000", flexGrow: 1 }}>{children}</Box>
//       )}
//     </div>
//   );
// }

// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

// interface AlbumProps {
//   checkedPics: string[];
//   pictures: FetchedPictureType[];
//   onCheckboxToggle: (id: string) => void;
//   onDeletePicture: (id: string) => void;
// }

// export const Album = ({
//   checkedPics,
//   pictures,
//   onCheckboxToggle,
//   onDeletePicture,
// }: AlbumProps) => {
//   const [value, setValue] = useState(1);
//   const label = { inputProps: { "aria-label": "Checkbox demo" } };
//   const token = useAppSelector(selectToken);

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
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const theme = useTheme();

//   const isXs = useMediaQuery(theme.breakpoints.down("sm"));
//   const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
//   const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
//   const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

//   let columns = 2;
//   if (isXs) columns = 2;
//   else if (isSm) columns = 3;
//   else if (isMd) columns = 4;
//   else if (isLgUp) columns = 6;

//   return (
//     <>
//       <GalleryContentBox>
//         <CustomTabPanel value={value} index={0}>
//           <Box style={{ margin: "0 auto", width: "fit-content" }}>
//             <CircularProgress sx={{ color: "#C89999" }} />
//           </Box>
//         </CustomTabPanel>
//         <CustomTabPanel value={value} index={1}>
//           <ImageList
//             variant="masonry"
//             cols={columns}
//             gap={8}
//             sx={{
//               display: pictures.length > 0 ? "block" : "flex",
//               justifyContent: "center",
//             }}
//           >
//             {Array.isArray(pictures) && pictures.length > 0 ? (
//               pictures.map((pic) => (
//                 <ImageListItemWrapper key={pic._id}>
//                   <ImageListItem>
//                     <img
//                       style={{ borderRadius: "6px" }}
//                       src={pic.photoUrl}
//                       alt={pic.fileName}
//                       loading="lazy"
//                     />
//                   </ImageListItem>
//                   <BtnBox className="btn-box">
//                     <PictureBtns
//                       item1={
//                         <CheckBoxBtn
//                           checked={checkedPics.includes(pic._id)}
//                           onClick={() => onCheckboxToggle(pic._id)}
//                           {...label}
//                         />
//                       }
//                       item2={
//                         <IconButton>
//                           <a href={pic.photoUrl} download={pic.fileName}>
//                             <DownloadIcon
//                               htmlColor="#C89999"
//                               style={{ marginTop: "10px" }}
//                               titleAccess="הורדת תמונה"
//                             />
//                           </a>
//                         </IconButton>
//                       }
//                       item3={
//                         <IconButton onClick={() => handleDelete(pic._id)}>
//                           <DeleteIcon htmlColor="#C89999" titleAccess="מחיקה" />
//                         </IconButton>
//                       }
//                     />
//                   </BtnBox>
//                 </ImageListItemWrapper>
//               ))
//             ) : (
//               <li>
//                 <Box style={{ display: "inline-block" }}>
//                   <CircularProgress sx={{ color: "#C89999" }} />
//                 </Box>
//               </li>
//             )}
//           </ImageList>
//         </CustomTabPanel>
//       </GalleryContentBox>
//       <AlbumMenu>
//         <CustomTabs
//           value={value}
//           centered
//           onChange={handleChange}
//           aria-label="basic tabs example"
//         >
//           <AlbumMenuTab label="תמונות עבר" {...a11yProps(0)} />
//           <AlbumMenuTab label="אלבום חתונה" {...a11yProps(1)} />
//         </CustomTabs>
//       </AlbumMenu>
//     </>
//   );
// };

import * as React from "react";
import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectToken, selectUserRole } from "../features/user/userSlice";
import { deletePicture } from "../services/albumServices";
import { grideMdiaQueries } from "../utils/mediaQueries";
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
} from "../styles/GalleryStyles";

interface AlbumProps {
  checkedPics: string[];
  fetchedPictures: FetchedPictureType[]; // pictures for weddingAlbum only
  onCheckboxToggle: (id: string) => void;
  onDeletePicture: (id: string) => void;
}

const myAlbums = [
  { label: "תמונות עבר", key: "pastPhotos" },
  { label: "אלבום חתונה", key: "weddingAlbum" },
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
  const role = useAppSelector(selectUserRole);
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
                      {role === "Admin" && (
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
          pictures={albumPictures[myAlbums[value]?.key] ?? []}
          currentIndex={albumsCurrentIndex}
          onClose={closeViewer}
          onChangeIndex={setAlbumsCurrentIndex}
        />
      )}

      <AlbumSelector value={value} onChange={handleChange} albums={myAlbums} />
    </>
  );
};
