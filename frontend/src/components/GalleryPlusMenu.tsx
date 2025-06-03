import * as React from "react";
import Box from "@mui/material/Box";
import {
  AlbumMenu,
  AlbumMenuTab,
  CustomTabs,
  GalleryContentBox,
} from "../styles/GalleryStyles";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useEffect, useState } from "react";
import { getPictures } from "../services/picturesServices/productServices";
import type { FetchedPictureType } from "../types/pictureType";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, color: "#000", flexGrow: 1 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const GalleryPlusMenu = () => {
  const [value, setValue] = React.useState(1);
  const [fetchedPics, setFetchedPics] = useState<FetchedPictureType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPics = await getPictures();
        console.log("allPics", allPics);

        setFetchedPics(allPics);
      } catch (err) {
        console.log("fetching error", err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <GalleryContentBox>
        <CustomTabPanel value={value} index={0}>
          Item One
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
            <ImageList variant="masonry" cols={3} gap={8}>
              {fetchedPics.length > 0 ? (
                fetchedPics.map((pic) => (
                  <ImageListItem key={pic._id}>
                    <img
                      style={{ borderRadius: "6px" }}
                      src={`${pic.photoUrl}`}
                      alt={pic.fileName}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))
              ) : (
                <div>no data</div>
              )}
            </ImageList>
        </CustomTabPanel>
      </GalleryContentBox>
      <AlbumMenu>
        <CustomTabs
          value={value}
          centered
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <AlbumMenuTab label="אלבום חתונה" {...a11yProps(0)} />
          <AlbumMenuTab label="תמונות עבר" {...a11yProps(1)} />
        </CustomTabs>
      </AlbumMenu>
    </>
  );
};
