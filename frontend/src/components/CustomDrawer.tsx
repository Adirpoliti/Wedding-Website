import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import DownloadingIcon from '@mui/icons-material/Downloading';
import { DrawerListItem } from "../styles/GalleryStyles";
import { IconButton } from "@mui/material";
import { downloadChecked } from "../services/picturesServices/albumServices";


interface CustomDrawerProps {
  checkedList: string[]
}
export const CustomDrawer = ({ checkedList }: CustomDrawerProps) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

    const handleDownloadChecked = async (checkedList: string[]) => {
      const response = await downloadChecked(checkedList);
      const url = URL.createObjectURL(response.data);
  
      const a = document.createElement("a");
      a.href = url;
      a.download = "WeddingAlbum.zip";
      a.click();
      URL.revokeObjectURL(url);
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
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <DrawerListItem primary={"דף הבית"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DownloadingIcon />
            </ListItemIcon>
            <DrawerListItem onClick={() => handleDownloadChecked(checkedList)} primary={"הורדת בחירות"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <DrawerListItem primary={"יציאה"} />
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

  return (
    <div style={{position: "absolute", top: 0, right: 0}}>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon htmlColor="#C89999" fontSize="large" />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};
