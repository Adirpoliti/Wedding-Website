import { Box, IconButton, styled, type BoxProps } from "@mui/material";

interface ArrowBtnProps {
  side: "left" | "right";
}

export const PictureViewerMainContainer = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1300,
  overflow: "hidden",
  touchAction: "none",
});

export const PictureViewerArrowBtn = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "side",
})<ArrowBtnProps>(({ side }) => ({
  position: "absolute",
  [side]: 16,
  color: "white",
  fontSize: "3rem",
}));

export const PictureViewerMediaBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
});

export const PictureViewerImg = styled("img")({
  maxHeight: "80vh",
  maxWidth: "80vw",
  display: "block",
});

export const PictureViewerVideo = styled("video")({
  width: "100%",
  height: "auto",
  maxWidth: "100%",
  maxHeight: "80vh",
  objectFit: "contain",
  display: "block",
  borderRadius: "1rem",
  aspectRatio: "2 / 3", 
});



export const PictureViewerPicBox = styled(Box)({
  maxHeight: "80vh",
  maxWidth: "80vw",
  overflow: "hidden",
  borderRadius: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});


export const PictureViewerUnderPicBtnsBox = styled(Box)({
  display: "flex",
  gap: "0.625rem",
});

export const PictureViewerPicIconBtn = styled(IconButton)({
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(10px)",
  borderRadius: "50%",
  width: "2.6rem",
  height: "2.6rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
});

export const PictureViewerDownloadLink = styled(Box)<BoxProps<'a'>>({
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(10px)",
  borderRadius: "50%",
  width: "2.6rem",
  height: "2.6rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
});


export const PictureViewerCheckboxBox = styled(Box)({
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(10px)",
  borderRadius: "50%",
  width: "2.6rem",
  height: "2.6rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
