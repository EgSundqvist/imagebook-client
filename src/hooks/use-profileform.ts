import { useState, useEffect } from "react";
import { fetchProfile, updateProfile } from "../services/user-profile-service";
import { useNotification } from "./use-notifications";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setUser } from "../redux/slices/auth-slice";
import { Profile } from "../types/profile"; // Importera typen Profile
import { User } from "../types/user"; // Importera typen User

export const useProfileForm = () => {
    const [formData, setFormData] = useState<Profile>({
        id: 0,
        user_id: 0,
        username: "",
        bio: "",
        avatar: "",
    });
    const [initialFormData, setInitialFormData] = useState<Profile>({
        id: 0,
        user_id: 0,
        username: "",
        bio: "",
        avatar: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [hasChanges, setHasChanges] = useState<boolean>(false);
    const {
        notificationOpen,
        notificationType,
        notificationMessage,
        showNotification,
        handleNotificationClose,
    } = useNotification();
    const dispatch = useDispatch();
    const authState = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            try {
                const response = await fetchProfile();
                const profileData: Profile = response.data;
                setFormData(profileData);
                setInitialFormData(profileData);
            } catch (err) {
                showNotification("error", "Failed to fetch profile");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
            const updatedFormData = { ...prevFormData, [name]: value };
            setHasChanges(JSON.stringify(updatedFormData) !== JSON.stringify(initialFormData));
            return updatedFormData;
        });
    };

    const handleAvatarClick = (avatar: string) => {
        setFormData((prevFormData) => {
            const updatedFormData = { ...prevFormData, avatar };
            setHasChanges(JSON.stringify(updatedFormData) !== JSON.stringify(initialFormData));
            return updatedFormData;
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log("Submitting form data:", formData); // Logga formData
            const response = await updateProfile(formData);
            const updatedProfile: Profile = response.data.profile; // Uppdatera med rätt struktur
            showNotification("success", "Profile updated successfully");
            setInitialFormData(updatedProfile);
            setFormData(updatedProfile);
            setHasChanges(false);
            if (authState.user) {
                const updatedUser: User = {
                    ...authState.user,
                    profile: updatedProfile,
                };
                dispatch(setUser(updatedUser)); // Uppdatera Redux state
            }
        } catch (err) {
            showNotification("error", "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        loading,
        hasChanges,
        notificationOpen,
        notificationType,
        notificationMessage,
        handleChange,
        handleAvatarClick,
        handleSubmit,
        handleNotificationClose,
    };
};