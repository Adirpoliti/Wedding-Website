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
// import { BtnsMenu } from "./BtnsMenu";
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
//                     <BtnsMenu
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
import { useState, useEffect } from "react";
import type { FetchedPictureType } from "../types/pictureType";
import { deletePicture } from "../services/albumServices";
import {
  Box,
  ImageListItem,
  IconButton,
  ImageList,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  AlbumMenu,
  AlbumMenuTab,
  BtnBox,
  CheckBoxBtn,
  CustomTabs,
  GalleryContentBox,
  ImageListItemWrapper,
} from "../styles/GalleryStyles";
import { BtnsMenu } from "./BtnsMenu";
import { useAppSelector } from "../app/hooks";
import { selectToken } from "../features/user/userSlice";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, color: "#000", flexGrow: 1 }}>{children}</Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface AlbumProps {
  checkedPics: string[];
  pictures: FetchedPictureType[];
  onCheckboxToggle: (id: string) => void;
  onDeletePicture: (id: string) => void;
}

export const Album = ({
  checkedPics,
  pictures,
  onCheckboxToggle,
  onDeletePicture,
}: AlbumProps) => {
  const [value, setValue] = useState(1);
  const token = useAppSelector(selectToken);

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

  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  let columns = 2;
  if (isXs) columns = 2;
  else if (isSm) columns = 3;
  else if (isMd) columns = 4;
  else if (isLgUp) columns = 6;

  // 🖼️ Picture viewer modal state
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openViewer = (index: number) => {
    setCurrentIndex(index);
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
  };

  // ⌨️ Keyboard navigation
  useEffect(() => {
    if (!isViewerOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % pictures.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + pictures.length) % pictures.length);
      } else if (e.key === "Escape") {
        closeViewer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isViewerOpen, pictures.length]);

  // 🖱️ Mouse drag & 📱 touch swipe state + handlers
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragEndX, setDragEndX] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleDrag = () => {
    if (dragStartX !== null && dragEndX !== null) {
      const diff = dragEndX - dragStartX;
      if (diff > 50) {
        setCurrentIndex((prev) => (prev - 1 + pictures.length) % pictures.length);
      } else if (diff < -50) {
        setCurrentIndex((prev) => (prev + 1) % pictures.length);
      }
    }
    setDragStartX(null);
    setDragEndX(null);
  };

  const handleSwipe = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const diff = touchEndX - touchStartX;
      if (diff > 50) {
        setCurrentIndex((prev) => (prev - 1 + pictures.length) % pictures.length);
      } else if (diff < -50) {
        setCurrentIndex((prev) => (prev + 1) % pictures.length);
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <>
      <GalleryContentBox>
        <CustomTabPanel value={value} index={0}>
          <Box style={{ margin: "0 auto", width: "fit-content" }}>
            <CircularProgress sx={{ color: "#C89999" }} />
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ImageList
            variant="masonry"
            cols={columns}
            gap={8}
            sx={{
              display: pictures.length > 0 ? "block" : "flex",
              justifyContent: "center",
            }}
          >
            {Array.isArray(pictures) && pictures.length > 0 ? (
              pictures.map((pic, index) => (
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
                    <BtnsMenu
                      item1={
                        <CheckBoxBtn
                          checked={checkedPics.includes(pic._id)}
                          onClick={() => onCheckboxToggle(pic._id)}
                          inputProps={{ "aria-label": "Checkbox demo" }}
                        />
                      }
                      item2={
                        <IconButton>
                          <a href={pic.photoUrl} download={pic.fileName}>
                            <DownloadIcon
                              htmlColor="#C89999"
                              style={{ marginTop: "10px" }}
                              titleAccess="הורדת תמונה"
                            />
                          </a>
                        </IconButton>
                      }
                      item3={
                        <IconButton onClick={() => handleDelete(pic._id)}>
                          <DeleteIcon htmlColor="#C89999" titleAccess="מחיקה" />
                        </IconButton>
                      }
                    />
                  </BtnBox>
                </ImageListItemWrapper>
              ))
            ) : (
              <li>
                <Box style={{ display: "inline-block" }}>
                  <CircularProgress sx={{ color: "#C89999" }} />
                </Box>
              </li>
            )}
          </ImageList>
        </CustomTabPanel>
      </GalleryContentBox>

      {/* 🖼️ Picture viewer modal with drag/swipe support */}
      {isViewerOpen && (
        <Box
          onClick={closeViewer}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1300,
            overflow: "hidden",
            touchAction: "none",
          }}
        >
       
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((prev) => (prev - 1 + pictures.length) % pictures.length);
              }}
              sx={{
                position: "absolute",
                left: 16,
                color: "white",
                fontSize: "3rem",
              }}
              aria-label="Previous Picture"
            >
              &#10094;
            </IconButton>
          

          <Box
            sx={{
              maxHeight: "80vh",
              maxWidth: "80vw",
              overflow: "hidden",
              borderRadius: 2,
            }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
            onTouchMove={(e) => setTouchEndX(e.touches[0].clientX)}
            onTouchEnd={handleSwipe}
            onMouseDown={(e) => setDragStartX(e.clientX)}
            onMouseMove={(e) => dragStartX !== null && setDragEndX(e.clientX)}
            onMouseUp={handleDrag}
            onMouseLeave={handleDrag}
          >
            <img
              src={pictures[currentIndex].photoUrl}
              alt={pictures[currentIndex].fileName}
              style={{
                maxHeight: "80vh",
                maxWidth: "80vw",
                display: "block",
              }}
            />
          </Box>

          
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((prev) => (prev + 1) % pictures.length);
              }}
              sx={{
                position: "absolute",
                right: 16,
                color: "white",
                fontSize: "3rem",
              }}
              aria-label="Next Picture"
            >
              &#10095;
            </IconButton>
        </Box>
      )}

      <AlbumMenu>
        <CustomTabs
          value={value}
          centered
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <AlbumMenuTab label="תמונות עבר" {...a11yProps(0)} />
          <AlbumMenuTab label="אלבום חתונה" {...a11yProps(1)} />
        </CustomTabs>
      </AlbumMenu>
    </>
  );
};
