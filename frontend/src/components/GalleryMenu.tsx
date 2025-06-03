import * as React from "react";
import { AlbumMenu, AlbumMenuTab, CustomTabs } from "../styles/GalleryStyles";

export default function CenteredTabs() {
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <AlbumMenu>
      <CustomTabs
        value={value}
        onChange={handleChange}
        centered
      >
        <AlbumMenuTab label="תמונות עבר" />
        <AlbumMenuTab label="אלבום חתונה" />
      </CustomTabs>
    </AlbumMenu>
  );
}
