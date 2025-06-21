import * as React from "react";
import Box from "@mui/material/Box";
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
import {
  CustomDrawerMainContainer,
  DrawerListItem,
} from "../styles/GalleryStyles";
import { IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { logout, selectUserRole } from "../features/user/userSlice";

interface CustomDrawerProps {
  onDownloadChecked?: () => void;
  onSelectAllAndDownload?: () => void;
}

export const CustomDrawer = ({
  onDownloadChecked,
  onSelectAllAndDownload,
}: CustomDrawerProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const role = useAppSelector(selectUserRole);
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isHome = location.pathname === "/home";

  const handleLogin = () => {
    window.location.href = "http://localhost:3001/auth/google";
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
    <Box
      dir="rtl"
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate(isHome ? "/gallery" : "/home")}
          >
            <ListItemIcon>
              {isHome ? (
                <CollectionsIcon htmlColor="#000" />
              ) : (
                <HomeIcon htmlColor="#859394" />
              )}
            </ListItemIcon>
            <DrawerListItem primary={isHome ? "גלריה" : "דף הבית"} />
          </ListItemButton>
        </ListItem>

        {role === "Admin" && !isHome && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={onDownloadChecked}>
                <ListItemIcon>
                  <DownloadingIcon htmlColor="#859394" />
                </ListItemIcon>
                <DrawerListItem primary={"הורדת בחירות"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={onSelectAllAndDownload}>
                <ListItemIcon>
                  <DownloadIcon htmlColor={"#859394"} />
                </ListItemIcon>
                <DrawerListItem primary={"הורדת הכל"} />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>

      <Divider />

      <List>
        {isAuthenticated ? (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon htmlColor={isHome ? "#000" : "#859394"} />
              </ListItemIcon>
              <DrawerListItem primary={"יציאה"} />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogin}>
              <ListItemIcon>
                <LoginIcon htmlColor={isHome ? "#000" : "#859394"} />
              </ListItemIcon>
              <DrawerListItem primary={"התחברות"} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <CustomDrawerMainContainer>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{ color: isHome ? "#3C486C" : "#859394" }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </CustomDrawerMainContainer>
  );
};
