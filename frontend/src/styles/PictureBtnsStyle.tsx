import { Button, Menu, styled } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const CustomMenuOutterBtnBox = styled(Button)({
  padding: 0,
  minWidth: 0,
  cursor: "pointer",
});

export const CustomMenuOutterBtn = styled(MoreHorizIcon)({
  color: "#fff",
  fontSize: "clamp(2rem, 5vw, 3rem)",
  filter: "drop-shadow(0 0 0.5rem black)",
  transition: "filter 0.3s ease",
});

export const CustomMenu = styled(Menu)({
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  "& .MuiMenu-list": {},
});