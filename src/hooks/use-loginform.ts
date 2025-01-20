import { useState } from "react";
import { useAuth } from "./use-auth";
import axios from "axios";

export const useLoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { handleLogin, notificationOpen, notificationType, notificationMessage, handleNotificationClose } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await handleLogin(formData.email, formData.password);
      if (response && response.status === 200) {
        console.log("Login successful:", response.data); // Logga "Login successful" och response.data
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("An error occurred");
        }
      } else {
        setError("An error occurred");
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
    handleChange,
    handleSubmit,
    handleNotificationClose,
  };
};