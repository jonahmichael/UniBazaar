import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // We will use this later to set the user state

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { setUser } = useContext(UserContext); // Get the setUser function from our context
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError(''); // Clear previous errors
        try {
            // Make the API call to our backend's login endpoint
            const res = await axios.post('http://localhost:5001/api/auth/login', { email, password });
            
            // IMPORTANT: Store the token in the browser's local storage
            localStorage.setItem('token', res.data.token);
            
            console.log('Login Successful!');
            // After logging in, redirect to the homepage
            navigate('/');

            // We will add the logic to set the user in the global state in the next sprint
            // For now, redirecting is enough proof that it works.

        } catch (err) {
            console.error(err.response.data);
            setError(err.response.data.msg || 'Invalid Credentials');
        }
    };

    return (
        <div className="form-container">
            <h2>Login to Your Account</h2>
            <form onSubmit={onSubmit}>
                 <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} minLength="6" required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
    );
};

export default LoginPage;