import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/authSlice'; // You'll need to create this action

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout()); // Clear the auth state
        navigate('/login'); // Redirect to login page
    };

    return (
        <button
            onClick={handleLogout}
            className="logout-button"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
