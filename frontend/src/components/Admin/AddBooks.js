import React, { useState } from 'react';
import "./AddBooks.css";

export default function AddBooks() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'text/csv') {
            setSelectedFile(file);
        } else {
            alert('Please select a CSV file.');
        }
    };

    const handleUploadClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleFileUpload = async () => {
        
        if (!selectedFile) {
            alert('No file selected.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://localhost:7000/api/upload', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                alert('File uploaded successfully!');
            } 
            else {
                alert('File upload failed.');
            }

        } 
        catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className='add-books'>
            <div className="books-container">
                <div className="books-card">
                    <div className='content'>

                        <div className='title'>
                            <h2 className="books-title">Add Books</h2>
                        </div>

                        <div className='cate'>

                            <div className='one-book'>
                                <p className='me-2'>Single Book:</p>
                                <button className='btn btn-primary btn-md buttoning'>Add Book</button>
                            </div>

                            <div className='multi-book'>

                                <p className='me-2'>Multiple Books:</p>
                                <button className='btn btn-primary btn-md buttoning' onClick={handleUploadClick}>
                                    Add Book
                                </button>

                                <input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                    accept=".csv"
                                    onChange={handleFileChange}
                                />
                                <button
                                    className='btn btn-primary btn-md buttoning'
                                    onClick={handleFileUpload}
                                    disabled={!selectedFile}
                                >
                                    Upload
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
