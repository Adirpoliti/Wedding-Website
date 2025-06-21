import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { CustomMenu, CustomMenuBtn } from "../styles/GalleryStyles";
import { Typography } from "@mui/material";

interface BtnsContainerProps {
  item1: React.ReactNode;
  item2: React.ReactNode;
  item3: React.ReactNode;
}

export const BtnsMenu = ({ item1, item2, item3 }: BtnsContainerProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CustomMenuBtn
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon
          sx={{
            color: "#fff",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            filter: "drop-shadow(0 0 0.5rem black)",
            transition: "filter 0.3s ease",
          }}
        />
      </CustomMenuBtn>
      <CustomMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <Typography>בחירה</Typography> {item1}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography>הורדה</Typography> {item2}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography>מחיקה</Typography> {item3}
        </MenuItem>
      </CustomMenu>
    </>
  );
};
