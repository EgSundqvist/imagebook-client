import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../contexts/theme-context";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAuth } from "./use-auth";
import { Profile } from "../types/profile";
import { useAuthContext } from "../contexts/auth-context";

export const useTopMenu = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { setThemeMode, themeMode } = useThemeContext();
    const navigate = useNavigate();
    const userProfile = useSelector((state: RootState) => state.auth.user?.profile) as Profile;
    const { handleLogout } = useAuth();
    const { isAuthenticated } = useAuthContext();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleThemeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setThemeMode(event.target.checked ? "dark" : "light");
    };

    const handleMenuItemClick = (path: string) => {
        if (path === "/login") {
            handleLogout();
        } else {
            navigate(path);
        }
        handleCloseUserMenu();
    };

    return {
        anchorElNav,
        anchorElUser,
        themeMode,
        userProfile,
        handleOpenNavMenu,
        handleOpenUserMenu,
        handleCloseNavMenu,
        handleCloseUserMenu,
        handleThemeSwitch,
        handleMenuItemClick,
        isAuthenticated,
    };
};