import {
  Box,
  styled,
  Typography,
  Tab,
  Tabs,
  type TabsProps,
} from "@mui/material";

export const GalleryContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#fff",
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
  textAlign: "center",
});

export const AlbumMenu = styled(Box)({
  width: "100%",
  backgroundColor: "rgba(249,249,249, 0.6)",
  position: "sticky",
  bottom: 0,
  zIndex: "999",
});

export const AlbumMenuTab = styled(Tab)<TabsProps>({
  color: "#C89999",

  "&.Mui-selected": {
    color: "#C89999",
    fontWeight: "bold",
  },
});

export const CustomTabs = styled(Tabs)<TabsProps>({
  "& .MuiTabs-indicator": {
    backgroundColor: "#C89999",
    height: 3,
  },
});
