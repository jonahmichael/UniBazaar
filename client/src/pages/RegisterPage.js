import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        collegeId: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { name, email, password, collegeId } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError(''); // Clear previous errors
        try {
            const newUser = { name, email, password, collegeId };
            // Make the API call to our backend's register endpoint
            const res = await axios.post('http://localhost:5001/api/auth/register', newUser);
            
            console.log('Registration successful:', res.data);
            // After a successful registration, automatically send the user to the login page
            navigate('/login');

        } catch (err) {
            console.error(err.response.data);
            // Set an error message to display to the user
            setError(err.response.data.msg || 'Something went wrong during registration');
        }
    };

    return (
        <div className="form-container">
            <h2>Register Your Account</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Your Name" name="name" value={name} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="College Email Address" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required minLength="6" />
                </div>
                <div className="form-group">
                    <label>College ID</label>
                    <input type="text" placeholder="Your College ID" name="collegeId" value={collegeId} onChange={onChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
    );
};

export default RegisterPage;