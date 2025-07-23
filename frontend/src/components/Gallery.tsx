import { useState, useEffect } from "react";
import {
  GalleryContainer,
  GalleryTitle,
  GalleryTitleBox,
} from "../styles/GalleryStyles";
import { Album } from "./Album";
import { CustomDrawer } from "./CustomDrawer";
import {
  getPictures,
  downloadChecked,
  getPicsFromThePast,
  getPicsFromCeremony,
} from "../services/albumServices";
import type { FetchedPictureType } from "../types/pictureType";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { loginSuccess } from "../features/user/userSlice";
import { Typography } from "@mui/material";

export const Gallery = () => {
  const [checkedPics, setCheckedPics] = useState<string[]>([]);
  const [allPics, setAllPics] = useState<FetchedPictureType[]>([]);
  const [picsFromThePast, setPicsFromThePast] = useState<FetchedPictureType[]>([]);
  const [picsFromCeremony, setPicsFromCeremony] = useState<FetchedPictureType[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const myAlbums = [
    { label: "מבט אל העבר", key: "OldPics" },
    { label: "חופה וקידושין", key: "CeremonyPics" },
    { label: "עין קטנה", key: "weddingAlbum" },
  ];

  const [albumIndex, setAlbumIndex] = useState(() => {
    const fromUrl = new URLSearchParams(location.search).get("album");
    const foundIndex = myAlbums.findIndex((a) => a.key === fromUrl);
    return foundIndex >= 0 ? foundIndex : myAlbums.length - 1;
  });

  const handleAlbumChange = (_: React.SyntheticEvent, newIndex: number) => {
    setAlbumIndex(newIndex);
  };

  const goToAlbumByKey = (key: string) => {
    const index = myAlbums.findIndex((a) => a.key === key);
    if (index !== -1) setAlbumIndex(index);
  };

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    if (token) {
      fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((user) => {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(loginSuccess({ token, user }));
          navigate("/gallery", { replace: true });
        })
        .catch((err) => {
          console.error("Login failed", err);
        });
    }
  }, [location.search, dispatch, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pics = await getPictures();
        const oldPics = await getPicsFromThePast();
        const ceremonyPics = await getPicsFromCeremony();
        setAllPics(pics);
        setPicsFromThePast(oldPics);
        setPicsFromCeremony(ceremonyPics);
      } catch (err) {
        console.error("Error fetching pictures:", err);
      }
    };
    fetchData();
  }, []);

  const handleDeletePicture = (picId: string) => {
    setAllPics((prev) => prev.filter((pic) => pic._id !== picId));
  };

  const handleCheckboxToggle = (id: string) => {
    setCheckedPics((prevChecked) =>
      prevChecked.includes(id)
        ? prevChecked.filter((picId) => picId !== id)
        : [...prevChecked, id]
    );
  };

  const handleDownloadChecked = async (ids: string[]) => {
    try {
      const response = await downloadChecked(ids);
      const url = URL.createObjectURL(response.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "WeddingAlbum.zip";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleSelectAllAndDownload = async () => {
    let selectedPics: FetchedPictureType[] = [];

    switch (albumIndex) {
      case 0:
        selectedPics = picsFromThePast;
        break;
      case 1:
        selectedPics = picsFromCeremony;
        break;
      case 2:
      default:
        selectedPics = allPics;
        break;
    }

    const allIds = selectedPics.map((pic) => pic._id);
    await handleDownloadChecked(allIds);
  };

  return (
    <GalleryContainer>
      <GalleryTitleBox>
        <CustomDrawer
          onDownloadChecked={() => handleDownloadChecked(checkedPics)}
          onSelectAllAndDownload={handleSelectAllAndDownload}
          goToAlbumByKey={goToAlbumByKey}
        />
        <Typography
          sx={{
            position: "absolute",
            top: { xs: "22%", sm: "17%", md: "15%" },
            right: { xs: "35%", sm: "37%", md: "35%", lg: "43%" },
            fontSize: "clamp(0.7rem, 5vw, 3rem)",
            color: "#3C486C",
            paddingTop: "2rem",
            fontFamily: "Lia Berta",
          }}
        >
          החתונה של
        </Typography>
        <GalleryTitle>רותם וטל</GalleryTitle>
      </GalleryTitleBox>
      <Album
        value={albumIndex}
        onChange={handleAlbumChange}
        albums={myAlbums}
        checkedPics={checkedPics}
        fetchedPictures={allPics}
        picsFromThePast={picsFromThePast}
        picsFromCeremony={picsFromCeremony}
        onCheckboxToggle={handleCheckboxToggle}
        onDeletePicture={handleDeletePicture}
      />
    </GalleryContainer>
  );
};
