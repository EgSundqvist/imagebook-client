import { useState, useEffect } from "react";
import { fetchUserInfo, changePassword } from "../services/user-profile-service";
import { useNotification } from "./use-notifications";
import axios from "axios";
import { usePasswordValidation } from "./use-password-validation";
import { User } from "../types/user"; // Importera typen User

// Definiera en typ för formulärdata som inkluderar old_password
interface AccountFormData extends Partial<User> {
    old_password?: string;
}

export const useAccountForm = () => {
    const [formData, setFormData] = useState<AccountFormData>({
        first_name: "",
        last_name: "",
        email: "",
        old_password: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const {
        notificationOpen,
        notificationType,
        notificationMessage,
        showNotification,
        handleNotificationClose,
    } = useNotification();

    const {
        password,
        confirmPassword,
        confirmPasswordError,
        handlePasswordChange,
        handleConfirmPasswordChange,
        resetPasswords,
        arePasswordsValid,
    } = usePasswordValidation();

    useEffect(() => {
        const fetchUserInformation = async () => {
            setLoading(true);
            try {
                const response = await fetchUserInfo();
                const userInfo: AccountFormData = {
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    email: response.data.email,
                    old_password: "",
                };
                setFormData(userInfo);
            } catch (err) {
                showNotification("error", "Failed to fetch user information");
            } finally {
                setLoading(false);
            }
        };

        fetchUserInformation();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!arePasswordsValid(formData.old_password || "")) {
            showNotification("error", "Please fill in all password fields correctly");
            return;
        }
        setLoading(true);
        try {
            await changePassword({
                old_password: formData.old_password || "", // Använd en fallback-tom sträng om old_password är undefined
                new_password: password,
            });
            showNotification("success", "Password updated successfully");
            setFormData((prevFormData) => ({
                ...prevFormData,
                old_password: "",
            }));
            resetPasswords();
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                const errorMessage = err.response.data.message || "Failed to update password";
                showNotification("error", errorMessage);
            } else {
                showNotification("error", "Failed to update password");
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        loading,
        notificationOpen,
        notificationType,
        notificationMessage,
        handleChange,
        handleSubmit,
        handleNotificationClose,
        password,
        confirmPassword,
        confirmPasswordError,
        handlePasswordChange,
        handleConfirmPasswordChange,
        arePasswordsValid,
    };
};