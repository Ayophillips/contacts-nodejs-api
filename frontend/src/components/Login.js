import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { loginSuccess } from '../features/authSlice';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/login', formData);
            const token = response.data.accessToken;
            const user = response.data.user;
            dispatch(loginSuccess({ user, token }));
            navigate('/contacts');
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    autoComplete="username"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                    autoComplete="current-password"
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
