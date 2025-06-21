import { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { generalMediaQueries } from "../utils/mediaQueries";

interface PictureViewerProps {
  pictures: { _id: string; photoUrl: string; fileName: string }[];
  currentIndex: number;
  onClose: () => void;
  onChangeIndex: (newIndex: number) => void;
}

export const PictureViewer = ({
  pictures,
  currentIndex,
  onClose,
  onChangeIndex,
}: PictureViewerProps) => {
  const { isXs } = generalMediaQueries();
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragEndX, setDragEndX] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

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
    <Box
      onClick={onClose}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300,
        overflow: "hidden",
        touchAction: "none",
      }}
    >
      {!isXs && (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onChangeIndex(
              (currentIndex - 1 + pictures.length) % pictures.length
            );
          }}
          sx={{
            position: "absolute",
            left: 16,
            color: "white",
            fontSize: "3rem",
          }}
          aria-label="Previous Picture"
        >
          &#10094;
        </IconButton>
      )}

      <Box
        sx={{
          maxHeight: "80vh",
          maxWidth: "80vw",
          overflow: "hidden",
          borderRadius: 2,
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
        onTouchMove={(e) => setTouchEndX(e.touches[0].clientX)}
        onTouchEnd={handleSwipe}
        onMouseDown={(e) => setDragStartX(e.clientX)}
        onMouseMove={(e) => dragStartX !== null && setDragEndX(e.clientX)}
        onMouseUp={handleDrag}
        onMouseLeave={handleDrag}
      >
        <img
          src={pictures[currentIndex].photoUrl}
          alt={pictures[currentIndex].fileName}
          style={{
            maxHeight: "80vh",
            maxWidth: "80vw",
            display: "block",
          }}
        />
      </Box>

      {!isXs && (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onChangeIndex((currentIndex + 1) % pictures.length);
          }}
          sx={{
            position: "absolute",
            right: 16,
            color: "white",
            fontSize: "3rem",
          }}
          aria-label="Next Picture"
        >
          &#10095;
        </IconButton>
      )}
    </Box>
  );
};
