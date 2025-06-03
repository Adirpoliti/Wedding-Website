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
  height: "100vh",
  backgroundColor: "#fff",
});

export const GalleryTitleBox = styled(Box)({
  backgroundColor: "rgba(249,249,249, 0.9)",
  width: "100%",
  position: "sticky",
  top: 0,
  zIndex: 10,
  display: "flex",
  flexDirection: "row-reverse",
  alignItems: "center",
  justifyContent: "center"
});

export const GalleryTitle = styled(Typography)({
  fontFamily: "LiaBerta",
  fontSize: "5rem",
  color: "#C89999",
  paddingTop: "4.3rem",
  textAlign: "center",
});

export const GallerTitleImg = styled("img")({
  width: "7rem",
  height: "7rem",
  marginTop: "2rem",
})

export const GalleryContentBox = styled(Box)(() => ({
  flexGrow: 1,
  width: "100%",
  backgroundColor: "#fff"
}));

export const AlbumMenu = styled(Box)({
  width: "100%",
  backgroundColor: "rgba(249,249,249, 0.9)",
  position: "sticky",
  bottom: 0,
  zIndex: 10,
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
