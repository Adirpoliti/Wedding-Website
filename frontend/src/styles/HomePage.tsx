import { Alert, Box, Button, IconButton, styled, Typography } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CollectionsIcon from "@mui/icons-material/Collections";

export const MainContainer = styled(Box)({
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
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
  fontSize: "clamp(4rem, 25vw, 15rem)",
  color: "#FEF6E3",
  position: "relative",
  top: "2rem"
});

export const LowerContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2rem",
})

export const BtnsContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "5rem",
});

export const HomeBtns = styled(IconButton)({
  backgroundColor: "rgba(255, 255, 255, 0.2);",
});

export const CameraIcon = styled(CameraAltIcon)({
  color: "#FEF6E3",
  fontSize: "clamp(4rem, 20vw, 6rem)",
});

export const CollectionIcon = styled(CollectionsIcon)({
  color: "#FEF6E3",
  fontSize: "clamp(4rem, 20vw, 6rem)",
});

export const MoveToGallery = styled("a")({
  textDecoration: "none",
  color: "#FEF6E3",
  fontSize: "1.2rem",
  fontWeight: "bold"
})

export const CustomAlert = styled(Alert)({
  position: "fixed",
  top: "10px",
  left: 0,
  right: 0,
  margin: "0 auto",
  direction: "rtl",
  width: "fit-content",
  fontFamily: "Tahoma",
});

export const CustomAlertBtn = styled(Button)({
  marginRight: 30,
  border: "1px solid white",
  fontFamily: "Tahoma",
})
