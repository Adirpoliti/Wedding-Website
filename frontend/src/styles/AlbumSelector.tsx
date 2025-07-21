import { Box, styled, Tab, Tabs, type TabsProps } from "@mui/material";

export const AlbumMenu = styled(Box)({
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  backgroundColor: "rgba(249,249,249, 0.9)",
  zIndex: 10,
  backdropFilter: "blur(10px)",
  borderTop: "1px solid rgba(255,255,255,0.9)",
});


export const AlbumMenuTab = styled(Tab)<TabsProps>({
  color: "#9B6237",
  "&.Mui-selected": {
    color: "#9B6237",
    fontWeight: "bold",
  },
});

export const CustomTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: "#9B6237",
    height: 3,
  },

  "& .MuiTabs-flexContainer": {
    justifyContent: "center",
  },

  [theme.breakpoints.down("sm")]: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
}));