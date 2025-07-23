import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import { useAppSelector } from "../app/hooks";
import { selectUserRole } from "../features/user/userSlice";
import {
  CustomMenu,
  CustomMenuOutterBtn,
  CustomMenuOutterBtnBox,
} from "../styles/PictureBtnsStyle";

interface BtnsContainerProps {
  albumKey: string;
  item1?: React.ReactNode;
  item2?: React.ReactNode;
  item3?: React.ReactNode;
}

export const PictureBtns = ({
  albumKey,
  item1,
  item2,
  item3,
}: BtnsContainerProps) => {
  const role = useAppSelector(selectUserRole);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isAdmin = role === "Admin";
  const canDownload = isAdmin || albumKey === "weddingAlbum";
  const canShowMenu = isAdmin || canDownload;

  if (!canShowMenu) return null;

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
        {isAdmin && item1 && (
          <MenuItem onClick={handleClose}>{item1}</MenuItem>
        )}
        {canDownload && item2 && (
          <MenuItem onClick={handleClose}>{item2}</MenuItem>
        )}
        {isAdmin && item3 && (
          <MenuItem onClick={handleClose}>{item3}</MenuItem>
        )}
      </CustomMenu>
    </>
  );
};
