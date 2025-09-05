import React, { useState } from 'react';
import axios from 'axios';
// We can re-use the form styles we already created
import '../App.css'; 

const SellerDashboard = () => {
    // This state remains the same
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'Stationery',
        listingType: 'sell',
        price: '',
        pricePerDay: '',
        lateFeePerDay: ''
    });

    // --- NEW CHANGES START HERE ---

    // State to hold the selected image file
    const [imageFile, setImageFile] = useState(null); 
    // State to manage the loading status during upload
    const [isUploading, setIsUploading] = useState(false); 

    // --- EXISTING STATE REMAINS ---
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { name, description, category, listingType, price, pricePerDay, lateFeePerDay } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    // --- NEW FUNCTION TO HANDLE FILE SELECTION ---
    const handleFileChange = (e) => {
        // e.target.files is an array of files, we just want the first one
        setImageFile(e.target.files[0]); 
    };

    // --- UPDATED onSubmit FUNCTION ---
    const onSubmit = async e => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        // 1. Check if an image was selected
        if (!imageFile) {
            setErrorMessage("Please upload an image for your item.");
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setErrorMessage('You must be logged in to list an item.');
            return;
        }

        setIsUploading(true); // Disable button to prevent multiple submissions
        try {
            // 2. Create FormData for the image upload
            const imageUploadData = new FormData();
            imageUploadData.append('image', imageFile);

            // 3. Upload the image to our backend's upload route FIRST
            const uploadConfig = {
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'multipart/form-data' // Important header for file uploads
                }
            };
            const uploadRes = await axios.post('http://localhost:5001/api/upload', imageUploadData, uploadConfig);
            const imageUrl = uploadRes.data.secure_url; // Get the public URL from our GCS backend

            // 4. Now, create the product using the returned image URL
            const productData = {
                ...formData,
                images: [imageUrl] // Add the image URL to our product data
            };
            
            const productConfig = {
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json'
                }
            };
            const productRes = await axios.post('http://localhost:5001/api/products', productData, productConfig);

            console.log('Product created:', productRes.data);
            setSuccessMessage('Your item has been listed successfully!');
            
            // Clear the form and the file input
            setFormData({ name: '', description: '', category: 'Stationery', listingType: 'sell', price: '', pricePerDay: '', lateFeePerDay: '' });
            setImageFile(null);
            document.getElementById('image-input').value = null; // Reset the file input field

        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
            setErrorMessage(err.response ? (err.response.data.msg || 'An error occurred') : 'Server Error. Please try again.');
        } finally {
            setIsUploading(false); // Re-enable the button
        }
    };

    return (
        <div className="form-container">
            <h2>List a New Item on UniBazaar</h2>
            <form onSubmit={onSubmit}>
                {/* All existing form groups remain unchanged */}
                <div className="form-group">
                    <label>Item Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} placeholder="e.g., Scientific Calculator FX-991" required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={description} onChange={onChange} placeholder="Describe the item, its condition, and any accessories." required></textarea>
                </div>
                
                <div className="form-group">
                    <label>Category</label>
                    <select name="category" value={category} onChange={onChange}>
                        {/* Replace the old options with these new ones */}
                        <option value="Academics & Study">Academics & Study</option>
                        <option value="Dorm & Housing">Dorm & Housing</option>
                        <option value="Kitchen & Food">Kitchen & Food</option>
                        <option value="Personal Care">Personal Care</option>
                        <option value="Clothing & Accessories">Clothing & Accessories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Listing Type</label>
                    <select name="listingType" value={listingType} onChange={onChange}>
                        <option value="sell">Sell</option>
                        <option value="borrow">Borrow</option>
                    </select>
                </div>
                {listingType === 'sell' ? (
                    <div className="form-group">
                        <label>Price (₹)</label>
                        <input type="number" name="price" value={price} onChange={onChange} placeholder="e.g., 500" required />
                    </div>
                ) : (
                    <>
                        <div className="form-group">
                            <label>Price Per Day (₹)</label>
                            <input type="number" name="pricePerDay" value={pricePerDay} onChange={onChange} placeholder="e.g., 20" required />
                        </div>
                        <div className="form-group">
                            <label>Late Fee Per Day (₹)</label>
                            <input type="number" name="lateFeePerDay" value={lateFeePerDay} onChange={onChange} placeholder="e.g., 30" required />
                        </div>
                    </>
                )}

                {/* --- NEW FILE INPUT FIELD --- */}
                <div className="form-group">
                    <label>Product Image</label>
                    {/* The `accept` attribute helps users select the right file types */}
                    <input id="image-input" type="file" name="image" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" required />
                </div>

                {/* --- UPDATED SUBMIT BUTTON --- */}
                <button type="submit" className="btn btn-primary" disabled={isUploading}>
                    {isUploading ? 'Uploading...' : 'List My Item'}
                </button>
            </form>
            {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
        </div>
    );
};

export default SellerDashboard;