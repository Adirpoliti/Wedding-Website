import {
  Box,
  Tab,
  Tabs,
  Menu,
  Button,
  styled,
  Checkbox,
  Typography,
  ListItemText,
  type TabsProps,
  type CheckboxProps,
} from "@mui/material";

export const GalleryContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  backgroundColor: "#fff",
  overflowY: "auto"
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
  justifyContent: "center",
});

export const GalleryTitle = styled(Typography)({
  fontFamily: "LiaBerta",
  fontSize: "clamp(2rem, 18vw, 10rem)",
  color: "#C89999",
  paddingTop: "5.5rem",
  paddingLeft: "1rem",
  textAlign: "center",
  overflowY: "hidden",
});

export const GallerTitleImg = styled("img")({
  width: "clamp(2rem, 18vw, 10rem)",
  height: "clamp(2rem, 18vw, 10rem)",
  marginTop: "4rem",
});

export const GalleryContentBox = styled(Box)(() => ({
  flexGrow: 1,
  width: "100%",
  backgroundColor: "#fff",
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

export const BtnBox = styled(Box)({
  position: "absolute",
  top: 0,
  right: 0,
  opacity: 0,
  display: "flex",
  transition: "opacity 0.3s ease",
  pointerEvents: "none",
});

export const CustomMenu = styled(Menu)({
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  "& .MuiMenu-list": {
  },
})

export const CustomMenuBtn = styled(Button)({
  padding: 0,
  minWidth: 0,
  cursor: "pointer"
})

export const CheckBoxBtn = styled(Checkbox)<CheckboxProps>({
  color: "#C89999",
  "&.Mui-checked": {
    color: "#C89999"
  }
})

export const ImageListItemWrapper = styled(Box)({
  position: "relative",
  "&:hover .btn-box": {
    opacity: 1,
    pointerEvents: "auto",
  },
});

export const DrawerListItem = styled(ListItemText)({
  textAlign: "right"
})

export const CustomDrawerMainContainer = styled(Box)({
  position: "absolute",
  top: 0,
  right: 0
})