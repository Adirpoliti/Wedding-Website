import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { selectUserRole } from "../features/user/userSlice";
import {
  CustomMenu,
  CustomMenuOutterBtn,
  CustomMenuOutterBtnBox,
} from "../styles/PictureBtnsStyle";

interface BtnsContainerProps {
  item1: React.ReactNode;
  item2: React.ReactNode;
  item3: React.ReactNode;
}

export const PictureBtns = ({ item1, item2, item3 }: BtnsContainerProps) => {
  const role = useAppSelector(selectUserRole);
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
      <CustomMenuOutterBtnBox
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <CustomMenuOutterBtn />
      </CustomMenuOutterBtnBox>
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
        {role === "Admin" && (
          <MenuItem onClick={handleClose}>
            <Typography>בחירה</Typography> {item1}
          </MenuItem>
        )}
        <MenuItem onClick={handleClose}>
          <Typography>הורדה</Typography> {item2}
        </MenuItem>
        {role === "Admin" && (
          <MenuItem onClick={handleClose}>
            <Typography>מחיקה</Typography>
            {item3}
          </MenuItem>
        )}
      </CustomMenu>
    </>
  );
};
