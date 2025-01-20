import { useState, useEffect } from "react";
import { ImageData } from "../types/image";
import { getImageById } from "../services/image-service";

export const useImage = (id: string) => {
    const [image, setImage] = useState<ImageData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await getImageById(id);
                setImage(response.data);
            } catch (err) {
                setError("Failed to fetch image");
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [id]);

    return { image, loading, error };
};