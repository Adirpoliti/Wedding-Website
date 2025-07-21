import { Alert, Box, Button, styled, Typography } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

export const MainContainer = styled(Box)({
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
  backgroundImage: "url('assets/images/pic.jpg')",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  width: "100%",
  height: "100dvh",
});

export const MediaContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
  height: "100%",
});

export const AlbumTitle = styled(Typography)({
  fontFamily: "Lia Berta",
  fontSize: "clamp(4rem, 25vw, 15rem)",
  color: "#FEF5E4",
  position: "relative",
  top: "2rem",
});

export const LowerContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2rem",
});

export const BtnsContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "5rem",
});

export const CameraIcon = styled(AddAPhotoIcon)({
  color: "#FEF5E4",
  fontSize: "clamp(4rem, 20vw, 6rem)",
});

export const CollectionIcon = styled(AddPhotoAlternateIcon)({
  color: "#FEF5E4",
  fontSize: "clamp(5.5rem, 20vw, 6.5rem)",
  transform: "scaleX(-1)"
});

export const CustomAlert = styled(Alert)({
  position: "fixed",
  top: "10px",
  left: 0,
  right: 0,
  margin: "0 auto",
  direction: "rtl",
  width: "fit-content",
  zIndex: 9999,
});

export const CustomAlertBtn = styled(Button)({
  marginRight: 30,
  border: "1px solid white",
});
