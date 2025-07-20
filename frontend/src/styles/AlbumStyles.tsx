import {
  Box,
  Checkbox,
  ImageListItem,
  styled,
  type CheckboxProps,
} from "@mui/material";

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
  display: "none",
  transition: "opacity 0.3s ease",
  pointerEvents: "none",
});

export const CheckBoxBtn = styled(Checkbox)<CheckboxProps>({
  padding: 0,
  margin: 0,
  color: "#fff",
  "&.Mui-checked": {
    color: "#fff",
  },
  "& svg": {
    fontSize: "24px",
  },
});

export const ImageListItemWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  "&:hover .btn-box": {
    display: "flex",
    pointerEvents: "auto",
  },
  [theme.breakpoints.down("sm")]: {
    "&:hover .btn-box": {
      display: "none",
    },
  },
}));

export const FadedImageWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "loaded",
})<{ loaded: boolean }>(({ loaded }) => ({
  position: "relative",
  width: "100%",
  paddingBottom: "100%",
  backgroundColor: "#f5f5f5",
  overflow: "hidden",
  borderRadius: "6px",
  cursor: "pointer",
  "& img": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity 0.3s ease-out",
    opacity: loaded ? 1 : 0,
  },
  "& video": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity 0.3s ease-out",
    opacity: loaded ? 1 : 0,
  },
}));
