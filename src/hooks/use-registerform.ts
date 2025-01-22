import { useState } from "react";
import { registerUserAndProfile } from "../services/user-profile-service";
import { useNotification } from "./use-notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { usePasswordValidation } from "./use-password-validation";
import { Profile } from "../types/profile";

const avatars = ["owl.jpg", "deer.jpg", "wolf.jpg", "rabbit.jpg", "lynx.jpg"];

interface RegisterFormData extends Omit<Profile, "id" | "user_id"> {
  firstName: string;
  lastName: string;
  email: string;
}

export const useRegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    bio: "",
    avatar: avatars[0],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {
    notificationOpen,
    notificationType,
    notificationMessage,
    showNotification,
    handleNotificationClose,
  } = useNotification();
  const navigate = useNavigate();

  const {
    password,
    confirmPassword,
    confirmPasswordError,
    handlePasswordChange,
    handleConfirmPasswordChange,
    resetPasswords,
  } = usePasswordValidation();

  const handleAvatarClick = (avatar: string) => {
    setFormData({ ...formData, avatar });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showNotification("error", "Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await registerUserAndProfile({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password,
        username: formData.username,
        bio: formData.bio,
        avatar: formData.avatar,
      });

      if (response.status === 201) {
        console.log("Registration successful:", response.data);
        showNotification("success", "User and profile created successfully");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          bio: "",
          avatar: avatars[0],
        });
        resetPasswords();
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
          showNotification("error", err.response.data.message);
        } else {
          setError("An error occurred");
          showNotification("error", "An error occurred");
        }
      } else {
        setError("An error occurred");
        showNotification("error", "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    notificationOpen,
    notificationType,
    notificationMessage,
    passwordError: confirmPasswordError,
    handleAvatarClick,
    handleChange,
    handleSubmit,
    handleNotificationClose,
    password,
    confirmPassword,
    handlePasswordChange,
    handleConfirmPasswordChange,
  };
};