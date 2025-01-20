import React from "react";
import { Snackbar, Alert, AlertProps } from "@mui/material";

interface NotificationProps extends AlertProps {
  open: boolean;
  onClose: () => void;
  autoHideDuration?: number;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  message: string; // Lägg till message här
}

const Notification: React.FC<NotificationProps> = ({
  open,
  onClose,
  autoHideDuration = 6000,
  anchorOrigin = { vertical: "bottom", horizontal: "center" },
  message, // Lägg till message här
  ...alertProps
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert onClose={onClose} {...alertProps}>
        {message} {/* Lägg till message här */}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
