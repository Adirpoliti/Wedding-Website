import { Box, styled, Typography } from "@mui/material";

export const GalleryContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#fff"
});

export const GalleryTitleBox = styled(Box)({
    backgroundColor: "rgba(249,249,249, 0.6)",
    position: "fixed",
    zIndex: "999",
    width: "100%",
});

export const GalleryTitle = styled(Typography)({
  fontFamily: "LiaBerta",
  fontSize: "6.5rem",
  color: "#C89999",
  paddingTop: "4.3rem",
  textAlign: "center"
});
