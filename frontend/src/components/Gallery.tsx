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
} from "../services/albumServices";
import type { FetchedPictureType } from "../types/pictureType";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { loginSuccess } from "../features/user/userSlice";

export const Gallery = () => {
  const [checkedPics, setCheckedPics] = useState<string[]>([]);
  const [allPics, setAllPics] = useState<FetchedPictureType[]>([]);
  const [picsFromThePast, setPicsFromThePast] = useState<FetchedPictureType[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const params = new URLSearchParams(location.search);
  const albumFromUrl = params.get("album");

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      fetch("http://localhost:3001/auth/me", {
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
  }, [location.search, dispatch, navigate, params]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pics = await getPictures();
        const oldPics = await getPicsFromThePast();
        setAllPics(pics);
        setPicsFromThePast(oldPics);
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
    const allIds = allPics.map((pic) => pic._id);
    await handleDownloadChecked(allIds);
  };

  return (
    <GalleryContainer>
      <GalleryTitleBox>
        <CustomDrawer
          onDownloadChecked={() => handleDownloadChecked(checkedPics)}
          onSelectAllAndDownload={handleSelectAllAndDownload}
        />
        <GalleryTitle>רותם וטל</GalleryTitle>
      </GalleryTitleBox>
      <Album
        albumFromUrl={albumFromUrl}
        checkedPics={checkedPics}
        fetchedPictures={allPics}
        picsFromThePast={picsFromThePast}
        onCheckboxToggle={handleCheckboxToggle}
        onDeletePicture={handleDeletePicture}
      />
    </GalleryContainer>
  );
};
