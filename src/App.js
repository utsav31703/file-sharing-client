import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [downloadLink, setDownloadLink] = useState('');

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:5000/upload', formData, {
      onUploadProgress: (e) => {
        const percent = Math.round((e.loaded * 100) / e.total);
        setProgress(percent);
      }
    })
    .then(res => setDownloadLink(res.data.downloadUrl))
    .catch(() => alert('Upload failed'));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>File Sharing App</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload} style={{ marginLeft: '10px' }}>Upload</button>
      <p>Progress: {progress}%</p>
      {downloadLink && <p><a href={downloadLink} target="_blank" rel="noreferrer">Download File</a></p>}
    </div>
  );
}

export default App;
