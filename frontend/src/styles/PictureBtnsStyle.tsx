import { Box, Button, Menu, styled, type BoxProps } from "@mui/material";
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

export const CustomMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: 8,
    minWidth: 180,
    padding: "8px 0",
  },
  "& .MuiMenu-list": {
    padding: 0,
  },
}));

export const ItemBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "2rem",
  padding: "0.5rem 1rem",
  textDecoration: "none",
  width: "100%",
  cursor: "pointer",
});

export const ItemBoxA = styled(Box)<BoxProps<"a">>({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "2rem",
  padding: "0.5rem 1rem",
  textDecoration: "none",
  width: "100%",
  cursor: "pointer",
});
