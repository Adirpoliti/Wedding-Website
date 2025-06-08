import React, { useRef } from "react";
import {
  AlbumTitle,
  MainContainer,
  MediaContainer,
  BtnsContainer,
  HomeBtns,
  CameraIcon,
  CollectionIcon,
} from "../styles/HomePage";
import { addPicture } from "../services/picturesServices/albumServices";
import { useSelector } from "react-redux"; // אחסון טוקן צריך לשבת על זה לראות מה אנחנו שומרים

export const HomePage = () => {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photoFile", file);
    try {
      await addPicture(formData as any);
      alert("התמונה הועלתה בהצלחה!");
    } catch (err) {
      console.error("שגיאה בהעלאה:", err);
      alert("שגיאה בהעלאת תמונה");
    }
  };

  return (
    <MainContainer>
      <MediaContainer>
        <AlbumTitle>רותם וטל</AlbumTitle>

        {/* זה להעלאה מהמצלמה , צריך לבדוק */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {/* זה להעלאה מהגלריה , צריך לבדוק */}
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <BtnsContainer>
          <HomeBtns onClick={() => galleryInputRef.current?.click()}>
            <CollectionIcon />
          </HomeBtns>
          <HomeBtns onClick={() => cameraInputRef.current?.click()}>
            <CameraIcon />
          </HomeBtns>
        </BtnsContainer>
      </MediaContainer>
    </MainContainer>
  );
};
