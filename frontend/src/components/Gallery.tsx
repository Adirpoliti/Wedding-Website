import { useState, useEffect } from "react";
import {
  GalleryContainer,
  GalleryTitle,
  GalleryTitleBox,
} from "../styles/GalleryStyles";
import { Album } from "./Album";
import { CustomDrawer } from "./CustomDrawer";
import { getPictures, downloadChecked } from "../services/albumServices";
import type { FetchedPictureType } from "../types/pictureType";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { loginSuccess } from "../features/user/userSlice";

export const Gallery = () => {
  const [checkedPics, setCheckedPics] = useState<string[]>([]);
  const [allPics, setAllPics] = useState<FetchedPictureType[]>([]);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      fetch("http://localhost:3001/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        setAllPics(pics);
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
        {/* <Typography sx={{fontSize: "1.5rem", color: "#3C486C", paddingTop: "2rem", fontFamily: "LiaBerta", position: "absolute", top: 45, right: 120}}>החתונה של</Typography> */}
        <GalleryTitle>רותם וטל</GalleryTitle>
      </GalleryTitleBox>
      <Album
        checkedPics={checkedPics}
        fetchedPictures={allPics}
        onCheckboxToggle={handleCheckboxToggle}
        onDeletePicture={handleDeletePicture}
      />
    </GalleryContainer>
  );
};
