import { useEffect, useState } from "react";
import { generalMediaQueries } from "../utils/MediaQueries";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "../app/hooks";
import { selectUserRole } from "../features/user/userSlice";
import {
  PictureViewerArrowBtn,
  PictureViewerCheckboxBox,
  PictureViewerImg,
  PictureViewerMainContainer,
  PictureViewerMediaBox,
  PictureViewerPicBox,
  PictureViewerPicIconBtn,
  PictureViewerUnderPicBtnsBox,
  PictureViewerVideo,
} from "../styles/PictureViewerStyles";
import { CheckBoxBtn } from "../styles/AlbumStyles";

interface PictureViewerProps {
  albumKey: string;
  pictures: { _id: string; photoUrl: string; fileName: string }[];
  currentIndex: number;
  checkedPics: string[];
  onClose: () => void;
  onDelete: (id: string) => void;
  onChangeIndex: (newIndex: number) => void;
  onCheckboxToggle: (id: string) => void;
}

export const PictureViewer = ({
  albumKey,
  pictures,
  currentIndex,
  checkedPics,
  onClose,
  onDelete,
  onChangeIndex,
  onCheckboxToggle,
}: PictureViewerProps) => {
  const { isXs } = generalMediaQueries();
  const role = useAppSelector(selectUserRole);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragEndX, setDragEndX] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const currentMedia = pictures[currentIndex];

  const isVideo = (url: string) => {
    return url.match(/\.(mp4|webm|ogg)$/i);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        onChangeIndex((currentIndex + 1) % pictures.length);
      } else if (e.key === "ArrowLeft") {
        onChangeIndex((currentIndex - 1 + pictures.length) % pictures.length);
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, onChangeIndex, onClose, pictures.length]);

  const handleDrag = () => {
    if (dragStartX !== null && dragEndX !== null) {
      const diff = dragEndX - dragStartX;
      if (diff > 50) {
        onChangeIndex((currentIndex - 1 + pictures.length) % pictures.length);
      } else if (diff < -50) {
        onChangeIndex((currentIndex + 1) % pictures.length);
      }
    }
    setDragStartX(null);
    setDragEndX(null);
  };

  const handleSwipe = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const diff = touchEndX - touchStartX;
      if (diff > 50) {
        onChangeIndex((currentIndex - 1 + pictures.length) % pictures.length);
      } else if (diff < -50) {
        onChangeIndex((currentIndex + 1) % pictures.length);
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <PictureViewerMainContainer onClick={onClose}>
      {!isXs && (
        <PictureViewerArrowBtn
          side="left"
          onClick={(e) => {
            e.stopPropagation();
            onChangeIndex(
              (currentIndex - 1 + pictures.length) % pictures.length
            );
          }}
          aria-label="Previous Picture"
        >
          &#10094;
        </PictureViewerArrowBtn>
      )}

      <PictureViewerMediaBox>
        <PictureViewerPicBox
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
          onTouchMove={(e) => setTouchEndX(e.touches[0].clientX)}
          onTouchEnd={handleSwipe}
          onMouseDown={(e) => setDragStartX(e.clientX)}
          onMouseMove={(e) => dragStartX !== null && setDragEndX(e.clientX)}
          onMouseUp={handleDrag}
          onMouseLeave={handleDrag}
        >
          {isVideo(currentMedia.photoUrl) ? (
            <PictureViewerVideo src={currentMedia.photoUrl} controls />
          ) : (
            <PictureViewerImg
              src={currentMedia.photoUrl}
              alt={currentMedia.fileName}
            />
          )}
        </PictureViewerPicBox>

        <PictureViewerUnderPicBtnsBox>
          {role === "Admin" && (
            <PictureViewerPicIconBtn
              onClick={(e) => {
                e.stopPropagation();
                onDelete(currentMedia._id);
              }}
            >
              <DeleteIcon htmlColor="#3C486C" />
            </PictureViewerPicIconBtn>
          )}

          {albumKey === "weddingAlbum" && !isVideo(currentMedia.photoUrl) && (
            <PictureViewerPicIconBtn
              onClick={(e) => e.stopPropagation()}
              style={{ backgroundColor: "white" }}
            >
              <a
                href={currentMedia.photoUrl}
                download={currentMedia.fileName}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <DownloadIcon htmlColor="#3C486C" />
              </a>
            </PictureViewerPicIconBtn>
          )}

          {role === "Admin" && (
            <PictureViewerCheckboxBox
              onClick={(e) => {
                e.stopPropagation();
                onCheckboxToggle(currentMedia._id);
              }}
            >
              <CheckBoxBtn checked={checkedPics.includes(currentMedia._id)} />
            </PictureViewerCheckboxBox>
          )}
        </PictureViewerUnderPicBtnsBox>
      </PictureViewerMediaBox>

      {!isXs && (
        <PictureViewerArrowBtn
          side="right"
          onClick={(e) => {
            e.stopPropagation();
            onChangeIndex((currentIndex + 1) % pictures.length);
          }}
          aria-label="Next Picture"
        >
          &#10095;
        </PictureViewerArrowBtn>
      )}
    </PictureViewerMainContainer>
  );
};
