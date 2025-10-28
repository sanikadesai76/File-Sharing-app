import React, { useState, useEffect, useRef } from 'react';
import { filesAPI } from '../services/api';

interface FileItem {
  id: number;
  filename: string;
  fileSize: number;
  contentType: string;
  createdAt: string;
  downloadUrl: string | null;
}

const Dashboard: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      setLoading(true);
      const filesData = await filesAPI.getFiles();
      setFiles(filesData);
    } catch (error: any) {
      setError('Failed to load files');
      console.error('Error loading files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const file = selectedFiles[0];
    await uploadFile(file);
  };

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length === 0) return;

    const file = droppedFiles[0];
    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    try {
      setUploading(true);
      setError('');
      setSuccess('');

      await filesAPI.uploadFile(file);
      setSuccess('File uploaded successfully!');
      await loadFiles(); // Refresh the file list
    } catch (error: any) {
      setError(error.response?.data?.error || 'Upload failed');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (file: FileItem) => {
    try {
      if (file.downloadUrl) {
        // Direct download if URL is available
        const link = document.createElement('a');
        link.href = file.downloadUrl;
        link.download = file.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Get download URL from API
        const response = await filesAPI.downloadFile(file.id);
        const link = document.createElement('a');
        link.href = response.downloadUrl;
        link.download = response.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error: any) {
      setError('Download failed');
      console.error('Download error:', error);
    }
  };

  const handleDelete = async (fileId: number) => {
    if (!window.confirm('Are you sure you want to delete this file?')) {
      return;
    }

    try {
      await filesAPI.deleteFile(fileId);
      setSuccess('File deleted successfully!');
      await loadFiles(); // Refresh the file list
    } catch (error: any) {
      setError('Delete failed');
      console.error('Delete error:', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container">
      <div className="card">
        <h2>File Manager</h2>
        
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div
          className="upload-area"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
        >
          <p>Click to select files or drag and drop</p>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
            Supported formats: All file types
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        {uploading && (
          <div className="loading">
            Uploading file...
          </div>
        )}

        <div style={{ marginTop: '30px' }}>
          <h3>Your Files ({files.length})</h3>
          
          {loading ? (
            <div className="loading">Loading files...</div>
          ) : files.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
              No files uploaded yet. Upload your first file above!
            </p>
          ) : (
            <div className="file-grid">
              {files.map((file) => (
                <div key={file.id} className="file-item">
                  <div className="file-info">
                    <div className="file-name">{file.filename}</div>
                    <div className="file-meta">
                      {formatFileSize(file.fileSize)} • {formatDate(file.createdAt)}
                    </div>
                  </div>
                  <div className="file-actions">
                    <button
                      onClick={() => handleDownload(file)}
                      className="btn btn-primary"
                      style={{ fontSize: '12px', padding: '8px 12px' }}
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="btn btn-danger"
                      style={{ fontSize: '12px', padding: '8px 12px' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

