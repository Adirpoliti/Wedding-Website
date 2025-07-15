// import React, { useRef, useState } from "react";
// import {
//   AlbumTitle,
//   MainContainer,
//   MediaContainer,
//   BtnsContainer,
//   CameraIcon,
//   CollectionIcon,
//   CustomAlert,
//   CustomAlertBtn,
//   LowerContainer,
// } from "../styles/HomePage";
// import { addPicture } from "../services/albumServices";
// import { useNavigate } from "react-router";
// import { Box, IconButton } from "@mui/material";
// import { CustomDrawer } from "./CustomDrawer";

// export const HomePage = () => {
//   const navigate = useNavigate();
//   const [alertInfo, setAlertInfo] = useState<{
//     severity: "success" | "error";
//     message: React.ReactNode;
//   } | null>(null);

//   const cameraInputRef = useRef<HTMLInputElement>(null);
//   const galleryInputRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files || files.length === 0) return;

//     const formData = new FormData();
//     for (const file of Array.from(files)) {
//       formData.append("photoFile", file);
//     }

//     try {
//       await addPicture(formData as any); // assuming it handles multiple
//       setAlertInfo({
//         severity: "success",
//         message: "התמונות הועלו בהצלחה!",
//       });
//     } catch (err) {
//       console.error("שגיאה בהעלאה:", err);
//       setAlertInfo({ severity: "error", message: "שגיאה בהעלאה" });
//     }
//   };

//   const handleAlertBtn = () => {
//     navigate("/gallery");
//   };

//   return (
//     <>
//       {alertInfo && (
//         <CustomAlert
//           variant="filled"
//           severity={alertInfo.severity}
//           action={
//             alertInfo.severity === "success" && (
//               <CustomAlertBtn
//                 onClick={handleAlertBtn}
//                 color="inherit"
//                 size="small"
//               >
//                 מעבר לגלריה
//               </CustomAlertBtn>
//             )
//           }
//         >
//           {alertInfo.message}
//         </CustomAlert>
//       )}

//       <MainContainer>
//         <CustomDrawer />
//         <MediaContainer>
//           <Box>
//             <AlbumTitle>רותם וטל</AlbumTitle>
//           </Box>

//           {/* זה להעלאה מהמצלמה , צריך לבדוק */}
//           <input
//             ref={cameraInputRef}
//             type="file"
//             accept="image/*,video/*"
//             capture="environment"
//             style={{ display: "none" }}
//             onChange={handleFileChange}
//             multiple
//           />

//           {/* זה להעלאה מהגלריה , צריך לבדוק */}
//           <input
//             ref={galleryInputRef}
//             type="file"
//             accept="image/*,video/*"
//             style={{ display: "none" }}
//             onChange={handleFileChange}
//             multiple
//           />

//           <LowerContainer>
//             <BtnsContainer>
//               <IconButton onClick={() => galleryInputRef.current?.click()}>
//                 <CollectionIcon />
//               </IconButton>
//               <IconButton onClick={() => cameraInputRef.current?.click()}>
//                 <CameraIcon />
//               </IconButton>
//             </BtnsContainer>
//           </LowerContainer>
//         </MediaContainer>
//       </MainContainer>
//     </>
//   );
// };


import React, { useRef, useState } from "react";
import {
  AlbumTitle,
  MainContainer,
  MediaContainer,
  BtnsContainer,
  CameraIcon,
  CollectionIcon,
  CustomAlert,
  CustomAlertBtn,
  LowerContainer,
} from "../styles/HomePage";
import { addPicture } from "../services/albumServices";
import { useNavigate } from "react-router";
import { Box, IconButton, Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { CustomDrawer } from "./CustomDrawer";

export const HomePage = () => {
  const navigate = useNavigate();
  const [alertInfo, setAlertInfo] = useState<{
    severity: "success" | "error";
    message: React.ReactNode;
  } | null>(null);
  const [cameraChoiceOpen, setCameraChoiceOpen] = useState(false);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    for (const file of Array.from(files)) {
      formData.append("photoFile", file);
    }

    try {
      await addPicture(formData as any);
      setAlertInfo({
        severity: "success",
        message: "תודה ששיתפתם אותנו בעוד רגע מתוק!",
      });
    } catch (err) {
      console.error("שגיאה בהעלאה:", err);
      setAlertInfo({ severity: "error", message: "שגיאה בהעלאה" });
    }
  };

  const handleAlertBtn = () => {
    navigate("/gallery");
  };

  return (
    <>
      {alertInfo && (
        <CustomAlert
          variant="filled"
          severity={alertInfo.severity}
          action={
            alertInfo.severity === "success" && (
              <CustomAlertBtn onClick={handleAlertBtn} color="inherit" size="small">
                מעבר לגלריה
              </CustomAlertBtn>
            )
          }
        >
          {alertInfo.message}
        </CustomAlert>
      )}

      <MainContainer>
        <CustomDrawer />
        <MediaContainer>
          <Box>
            <AlbumTitle>רותם וטל</AlbumTitle>
          </Box>

          {/* Inputs */}
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            capture="environment"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <LowerContainer>
            <BtnsContainer>
              <IconButton onClick={() => galleryInputRef.current?.click()}>
                <CollectionIcon />
              </IconButton>
              <IconButton onClick={() => setCameraChoiceOpen(true)}>
                <CameraIcon />
              </IconButton>
            </BtnsContainer>
          </LowerContainer>
        </MediaContainer>
      </MainContainer>

      {/* Camera choice modal */}
      <Dialog open={cameraChoiceOpen} onClose={() => setCameraChoiceOpen(false)}>
        <DialogTitle>בחר פעולה</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setCameraChoiceOpen(false);
              photoInputRef.current?.click();
            }}
          >
            צילום תמונה
          </Button>
          <Button
            onClick={() => {
              setCameraChoiceOpen(false);
              videoInputRef.current?.click();
            }}
          >
            צילום וידאו
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
