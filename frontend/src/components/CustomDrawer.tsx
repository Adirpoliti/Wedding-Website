import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import DownloadIcon from "@mui/icons-material/Download";
import DownloadingIcon from "@mui/icons-material/Downloading";
import CollectionsIcon from "@mui/icons-material/Collections";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import ElderlyIcon from "@mui/icons-material/Elderly";
import { IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { logout, selectUserRole } from "../features/user/userSlice";
import {
  CustomDrawerMainContainer,
  DrawerListBox,
  DrawerListItem,
} from "../styles/CustomDrawer";

interface CustomDrawerProps {
  onDownloadChecked?: () => void;
  onSelectAllAndDownload?: () => void;
  goToAlbumByKey?: (key: string) => void;
}

export const CustomDrawer = ({
  onDownloadChecked,
  onSelectAllAndDownload,
  goToAlbumByKey,
}: CustomDrawerProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const role = useAppSelector(selectUserRole);
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isHome = location.pathname === "/home";
  const isGallery = location.pathname === "/gallery";
  const FirstIcon = isHome ? CollectionsIcon : HomeIcon;

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/home");
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <DrawerListBox dir="rtl" role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate(isHome ? "/gallery" : "/home")}
          >
            <ListItemIcon>
              <FirstIcon htmlColor="#fff" />
            </ListItemIcon>
            <DrawerListItem primary={isHome ? "גלריה" : "דף הבית"} />
          </ListItemButton>
        </ListItem>
        {role === "Admin" && !isHome && (
          <>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={onDownloadChecked}>
                <ListItemIcon>
                  <DownloadingIcon htmlColor="#fff" />
                </ListItemIcon>
                <DrawerListItem primary={"הורדת בחירות"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={onSelectAllAndDownload}>
                <ListItemIcon>
                  <DownloadIcon htmlColor="#fff" />
                </ListItemIcon>
                <DrawerListItem primary={"הורדת הכל"} />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
      {!isHome && (
        <>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/gallery");
                if (isGallery) goToAlbumByKey?.("weddingAlbum");
              }}
            >
              <ListItemIcon>
                <VisibilityIcon htmlColor="#fff" />
              </ListItemIcon>
              <DrawerListItem primary={"עין קטנה"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/gallery");
                if (isGallery) goToAlbumByKey?.("CeremonyPics");
              }}
            >
              <ListItemIcon>
                <LoyaltyIcon htmlColor="#fff" />
              </ListItemIcon>
              <DrawerListItem primary={"חופה וקידושין"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/gallery");
                if (isGallery) goToAlbumByKey?.("OldPics");
              }}
            >
              <ListItemIcon>
                <ElderlyIcon htmlColor="#fff" />
              </ListItemIcon>
              <DrawerListItem primary={"מבט אל העבר"} />
            </ListItemButton>
          </ListItem>
        </>
      )}
      <Divider />

      <List>
        {isAuthenticated ? (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon htmlColor="#ffff" />
              </ListItemIcon>
              <DrawerListItem primary={"יציאה"} />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogin}>
              <ListItemIcon>
                <LoginIcon htmlColor="#ffff" />
              </ListItemIcon>
              <DrawerListItem primary={"התחברות"} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </DrawerListBox>
  );

  return (
    <CustomDrawerMainContainer>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{ color: isHome ? "#FEF5E4" : "#3C486C" }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            color: "#fff",
            borderTopLeftRadius: "1rem",
            borderBottomLeftRadius: "1rem",
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </CustomDrawerMainContainer>
  );
};
