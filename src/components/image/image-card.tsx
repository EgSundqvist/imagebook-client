import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ImageData } from "../../types/image";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../../App.css";

interface ImageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: ImageData;
  innerRef?: React.Ref<HTMLDivElement>;
  isDetailPage?: boolean;
}

const ImageCard: FC<ImageCardProps> = ({
  image,
  innerRef,
  isDetailPage = false,
  ...props
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isDetailPage) {
      navigate(`/images/${image.ID}`);
    }
  };

  return (
    <Card
      ref={innerRef}
      {...props}
      className="sketchy-border"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px",
        width: isDetailPage ? "100%" : "100%",
        maxWidth: isDetailPage ? "800px" : "600px",
        cursor: isDetailPage ? "default" : "pointer",
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        image={image.PresignedURL}
        alt={image.Description}
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
      />
      <CardContent>
        <Typography
          variant="body1"
          sx={{
            fontSize: "18px",
            fontFamily: "'Shadows Into Light', cursive",
            color: "textSecondary",
          }}
          component="p"
        >
          {image.Description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
