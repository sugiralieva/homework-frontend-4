'use client'
import React, { ChangeEvent, useState } from 'react';
import { axiosInstance } from "@/app/api/apiClient";
import { AxiosError, AxiosProgressEvent, AxiosResponse } from "axios";

interface FileUploadProgress {
    file: File;
    progress: number;
    status: string;
}

const AddProduct = () => {
    const [fileProgress, setFileProgress] = useState<FileUploadProgress[]>([]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (!selectedFiles) return;

        const newFiles = Array.from(selectedFiles);
        const newFileProgress = newFiles.map((file) => ({
            file,
            progress: 0,
            status: 'Pending'
        }));

        setFileProgress((prevProgress) => [...prevProgress, ...newFileProgress]);

        newFiles.forEach((file) => {
            uploadFile(file);
        });
    };

    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response: AxiosResponse = await axiosInstance.post('files/upload', formData, {
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    const loaded = progressEvent.loaded;
                    const total = progressEvent.total || 0;
                    const percent = (loaded / total) * 100;

                    setFileProgress((prevProgress) =>
                        prevProgress.map((progress) =>
                            progress.file === file
                                ? { ...progress, progress: Math.round(percent), status: `${Math.round(percent)}% uploaded...` }
                                : progress
                        )
                    );
                }
            });

            setFileProgress((prevProgress) =>
                prevProgress.map((progress) =>
                    progress.file === file
                        ? { ...progress, progress: 100, status: 'Upload successful!' }
                        : progress
                )
            );
            console.log(response.data);
        } catch (error: AxiosError | any) {
            setFileProgress((prevProgress) =>
                prevProgress.map((progress) =>
                    progress.file === file
                        ? { ...progress, status: 'Upload failed!' }
                        : progress
                )
            );
            console.error(error);
        }
    };

    const handleSubmit = () => {
        alert('Files uploaded successfully!');
    };

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label>Title</label>
                    <input type='text' placeholder='Title' />
                </div>
                <div>
                    <label>Price</label>
                    <input type='text' placeholder='Price' />
                </div>
                <div>
                    <label>Description</label>
                    <input type='text' placeholder='Description' />
                </div>
                <div>
                    <label>Category</label>
                    <input type='text' placeholder='Category' />
                </div>
                <div>
                    <label>Image</label>
                    <input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="fileInput"
                        multiple
                    />
                    <button type="button" onClick={() => document.getElementById('fileInput')?.click()}>Add File</button>
                    <div>
                        {fileProgress.map((fileProg, index) => (
                            <div key={index}>
                                <img src={URL.createObjectURL(fileProg.file)} alt="Preview" style={{ width: "300px", height: "100px" }} />
                                <label>
                                    File progress: <progress value={fileProg.progress} max="100" />
                                </label>
                                <p>{fileProg.status}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="button" onClick={handleSubmit}>Send</button>
            </form>
        </div>
    );
};

export default AddProduct;
