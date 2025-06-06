import * as React from "react";
import { useEffect, useState } from "react";
import type { FetchedPictureType } from "../types/pictureType";
import {
  deletePicture,
  getPictures,
} from "../services/picturesServices/productServices";
import { Box, ImageListItem, IconButton, ImageList } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  AlbumMenu,
  AlbumMenuTab,
  BtnBox,
  CustomTabs,
  GalleryContentBox,
  ImageListItemWrapper,
} from "../styles/GalleryStyles";

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
      {value === index && (
        <Box sx={{ p: 3, color: "#000", flexGrow: 1 }}>{children}</Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const Album = () => {
  const [value, setValue] = React.useState(1);
  const [fetchedPics, setFetchedPics] = useState<FetchedPictureType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPics = await getPictures();
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

  const handleDelete = async (token: string, picId: string) => {
    console.log("token:", token, "picid:", picId);
    try {
      await deletePicture(token, picId);
    } catch (err) {
      console.log(err);
    }
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
                <ImageListItemWrapper key={pic._id}>
                  <ImageListItem>
                    <img
                      style={{ borderRadius: "6px" }}
                      src={`${pic.photoUrl}`}
                      alt={pic.fileName}
                      loading="lazy"
                    />
                  </ImageListItem>
                  <BtnBox className="btn-box">
                    <IconButton>
                      <a href={`${pic.photoUrl}`} download={`${pic.fileName}`}>
                        <DownloadIcon
                          htmlColor="#fff"
                          style={{ marginTop: "10px" }}
                          titleAccess="הורדת תמונה"
                        />
                      </a>
                    </IconButton>
                    <IconButton onClick={() => handleDelete("123", pic._id)}>
                      <DeleteIcon htmlColor="#fff" titleAccess="מחיקה" />
                    </IconButton>
                  </BtnBox>
                </ImageListItemWrapper>
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
