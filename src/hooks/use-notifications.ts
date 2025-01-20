import { useState } from "react";

export const useNotification = () => {
    const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
    const [notificationType, setNotificationType] = useState<"success" | "error">(
        "success"
    );
    const [notificationMessage, setNotificationMessage] = useState<string>("");

    const showNotification = (type: "success" | "error", message: string) => {
        setNotificationType(type);
        setNotificationMessage(message);
        setNotificationOpen(true);
    };

    const handleNotificationClose = () => {
        setNotificationOpen(false);
    };

    return {
        notificationOpen,
        notificationType,
        notificationMessage,
        showNotification,
        handleNotificationClose,
    };
};