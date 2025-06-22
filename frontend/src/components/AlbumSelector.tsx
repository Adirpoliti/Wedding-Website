import * as React from "react";
import { a11yProps } from "./CustomTabPanel";
import { albumSelectorMediaQueries } from "../utils/MediaQueries";
import { AlbumMenu, AlbumMenuTab, CustomTabs } from "../styles/AlbumSelector";

interface AlbumMenuComponentProps {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  albums: { label: string; key: string }[];
}

export const AlbumSelector = ({
  value,
  onChange,
  albums,
}: AlbumMenuComponentProps) => {
  const { tabVariant, tabCentered, scrollButtons } = albumSelectorMediaQueries();

  return (
    <AlbumMenu>
      <CustomTabs
        value={value}
        onChange={onChange}
        variant={tabVariant}
        centered={tabCentered}
        scrollButtons={scrollButtons}
        aria-label="album tabs"
      >
        {albums.map(({ label }, index) => (
          <AlbumMenuTab key={index} label={label} {...a11yProps(index)} />
        ))}
      </CustomTabs>
    </AlbumMenu>
  );
};
