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
import {
  CustomDrawerMainContainer,
  DrawerListItem,
} from "../styles/GalleryStyles";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router";

interface CustomDrawerProps {
  onDownloadChecked: () => void;
  onSelectAllAndDownload: () => void;
}

export const CustomDrawer = ({
  onDownloadChecked,
  onSelectAllAndDownload,
}: CustomDrawerProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogin = () => {
    window.location.href = "http://localhost:3001/auth/google";
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
          <ListItemButton onClick={() => navigate("/home")}>
            <ListItemIcon>
              <HomeIcon htmlColor="#C89999" />
            </ListItemIcon>
            <DrawerListItem primary={"דף הבית"} />
          </ListItemButton>
        </ListItem>

        {!isLogin && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={onDownloadChecked}>
                <ListItemIcon>
                  <DownloadingIcon htmlColor="#C89999" />
                </ListItemIcon>
                <DrawerListItem primary={"הורדת בחירות"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={onSelectAllAndDownload}>
                <ListItemIcon>
                  <DownloadIcon htmlColor="#C89999" />
                </ListItemIcon>
                <DrawerListItem primary={"הורדת הכל"} />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>

      <Divider />

      <List>
        {isLogin ? (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon htmlColor="#C89999" />
              </ListItemIcon>
              <DrawerListItem primary={"יציאה"} />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogin}>
              <ListItemIcon>
                <LoginIcon htmlColor="#C89999" />
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
      <IconButton onClick={toggleDrawer(true)} sx={{ color: "#C89999" }}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </CustomDrawerMainContainer>
  );
};
