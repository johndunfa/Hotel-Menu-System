// components/ImageUpload.jsx
'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt, FaTimes, FaSpinner } from 'react-icons/fa';

export default function ImageUpload({ onImageUpload, existingImage, label }) {
  const [preview, setPreview] = useState(existingImage || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError('Only JPEG, PNG, GIF, and WEBP images are allowed');
        return;
      }

      setError('');
      setUploading(true);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
        onImageUpload(file);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const removeImage = () => {
    setPreview(null);
    onImageUpload(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
      'image/webp': [],
    },
    maxFiles: 1,
  });

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border border-gray-300"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
          >
            <FaTimes />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition
            ${isDragActive ? 'border-amber-500 bg-amber-50' : 'border-gray-300 hover:border-amber-400'}
            ${error ? 'border-red-500 bg-red-50' : ''}
          `}
        >
          <input {...getInputProps()} />
          <FaCloudUploadAlt className="mx-auto text-4xl text-gray-400 mb-2" />
          {uploading ? (
            <div className="flex items-center justify-center">
              <FaSpinner className="animate-spin text-amber-500 text-2xl" />
              <span className="ml-2 text-gray-600">Uploading...</span>
            </div>
          ) : (
            <>
              <p className="text-gray-600">
                {isDragActive
                  ? 'Drop the image here...'
                  : 'Drag & drop an image, or click to select'}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Supports: JPEG, PNG, GIF, WEBP (Max 5MB)
              </p>
            </>
          )}
        </div>
      )}
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}