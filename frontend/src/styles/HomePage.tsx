import { Box, IconButton, styled, Typography } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CollectionsIcon from "@mui/icons-material/Collections";

export const MainContainer = styled(Box)({
  margin: 0,
  padding: 0,
  backgroundImage: "url('assets/images/pic.jpg')",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  width: "100%",
  height: "100vh",
});

export const MediaContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
  height: "100%",
});

export const AlbumTitle = styled(Typography)({
  fontFamily: "LiaBerta",
  fontSize: "7.5rem",
  color: "#FEF6E3",
});

export const BtnsContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "5rem",
  //   marginTop: "auto"
});

export const HomeBtns = styled(IconButton)({
  backgroundColor: "rgba(255, 255, 255, 0.2);",
});

export const CameraIcon = styled(CameraAltIcon)({
  color: "#FEF6E3",
  fontSize: "4rem",
});
export const CollectionIcon = styled(CollectionsIcon)({
  color: "#FEF6E3",
  fontSize: "4rem",
});
