import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setMessage('');

        try {
            // Get the presigned URL from the backend
            const response = await axios.get(`http://localhost:3000/api/presigned-url?filename=${file.name}`);
            const { signedUrl, headers } = response.data;

            // Upload the file to the signed URL
            await axios.put(signedUrl, file, { headers });

            setMessage('File uploaded successfully!');
        } catch (error) {
            console.error(error);
            setMessage('Failed to upload file.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="App">
            <h1>Upload File Ifeanyi</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default App;
