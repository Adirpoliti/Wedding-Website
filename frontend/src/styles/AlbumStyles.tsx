import { Box, Checkbox, styled, type CheckboxProps } from "@mui/material";

export const GalleryContentBox = styled(Box)(() => ({
  flexGrow: 1,
  width: "100%",
  backgroundColor: "#fff",
}));

export const BtnBox = styled(Box)({
  position: "absolute",
  top: 0,
  right: 0,
  opacity: 0,
  display: "flex",
  transition: "opacity 0.3s ease",
  pointerEvents: "none",
});

export const CheckBoxBtn = styled(Checkbox)<CheckboxProps>({
  color: "#3C486C",
  "&.Mui-checked": {
    color: "#3C486C",
  },
});

export const ImageListItemWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  "&:hover .btn-box": {
    opacity: 1,
    pointerEvents: "auto",
  },
  [theme.breakpoints.down("sm")]: {
    "&:hover .btn-box": {
      opacity: 0,
    },
  },
}));
