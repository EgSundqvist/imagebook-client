import { useState } from "react";

export const usePasswordValidation = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPassword(value);
        validatePasswords(value, confirmPassword);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setConfirmPassword(value);
        validatePasswords(password, value);
    };

    const validatePasswords = (password: string, confirmPassword: string) => {
        if (password === "" && confirmPassword === "") {
            setConfirmPasswordError(null);
        } else if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
        } else {
            setConfirmPasswordError(null);
        }
    };

    const resetPasswords = () => {
        setPassword("");
        setConfirmPassword("");
        setConfirmPasswordError(null);
    };

    const arePasswordsValid = (oldPassword: string) => {
        return oldPassword !== "" && password !== "" && confirmPassword !== "" && password === confirmPassword;
    };

    return {
        password,
        confirmPassword,
        confirmPasswordError,
        handlePasswordChange,
        handleConfirmPasswordChange,
        resetPasswords,
        arePasswordsValid,
    };
};