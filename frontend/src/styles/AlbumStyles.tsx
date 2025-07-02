import { Box, Checkbox, ImageListItem, styled, type CheckboxProps } from "@mui/material";

export const GalleryContentBox = styled(Box)(() => ({
  flexGrow: 1,
  width: "100%",
  backgroundColor: "#fff",
}));

export const StyledImageListItem = styled(ImageListItem, {
  shouldForwardProp: (prop) => prop !== "isChecked",
})<{ isChecked: boolean }>(({ isChecked }) => ({
  position: "relative",

  "& img": {
    borderRadius: "6px",
    cursor: "pointer",
    filter: isChecked ? "blur(3px)" : "none",
    transition: "filter 0.2s ease",
  },
}));

export const CheckedOverlay = styled(Box)({
  display: "flex",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "#3C486C",
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
});

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
