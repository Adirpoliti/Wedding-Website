import {
  Box,
  styled,
  Typography,
} from "@mui/material";

export const GalleryContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  backgroundColor: "#fff",
  overflowY: "auto",
});

export const GalleryTitleBox = styled(Box)({
  backgroundColor: "#fff",
  width: "100%",
  position: "sticky",
  top: 0,
  zIndex: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const GalleryTitle = styled(Typography)({
  fontFamily: "LiaBerta",
  fontSize: "clamp(2rem, 18vw, 10rem)",
  color: "#3C486C",
  paddingTop: "5.5rem",
  paddingLeft: "1rem",
  textAlign: "center",
  overflowY: "hidden",
  position: "relative",
});
