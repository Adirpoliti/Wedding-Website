import { useMediaQuery, useTheme, type TabsProps } from "@mui/material";

export const generalMediaQueries = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  return { isXs, isSm, isMd, isLgUp };
};

export const gridMediaQueries = (): number => {
  const { isXs, isSm, isMd, isLgUp } = generalMediaQueries();

  if (isXs) return 2;
  if (isSm) return 3;
  if (isMd) return 4;
  if (isLgUp) return 6;
  return 2;
};

export const albumSelectorMediaQueries = () => {
  const { isXs, isSm, isMd, isLgUp } = generalMediaQueries();

  const tabVariant: TabsProps["variant"] =
    isXs || isSm ? "scrollable" : "standard";
  const tabCentered = !(isXs || isSm);
  const scrollButtons: TabsProps["scrollButtons"] =
    isXs || isSm ? "auto" : false;

  return {
    isXs,
    isSm,
    isMd,
    isLgUp,
    tabVariant,
    tabCentered,
    scrollButtons,
  };
};
