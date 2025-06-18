import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function Company() {
  const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('https://localhost:7266/api/Company/Upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Upload success' );
    } catch (err) {
      alert('Upload failed');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-center">Upload Your File</h5>
              <div className="form-group">
                <label htmlFor="fileInput" className="form-label">Choose File</label>
                <input
                  type="file"
                  id="fileInput"
                  className="form-control"
                  onChange={onFileChange}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <button
                  className="btn btn-primary"
                  onClick={onUpload}
                  disabled={!file}
                >
                  Upload
                </button>
                {file && (
                  <span className="text-muted">{file.name}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Company;
