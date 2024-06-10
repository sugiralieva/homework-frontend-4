'use client'
import React, { ChangeEvent, useState } from 'react';
import { axiosInstance } from "@/app/api/apiClient";
import { AxiosError, AxiosProgressEvent, AxiosResponse } from "axios";
import { toast } from 'react-toastify';

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
        toast.success("Product successfully uploaded!")
    };

    return (
        <div className="min-h-screen max-w-7xl mx-auto p-6 bg-white shadow-md">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                    <input type='text' placeholder='Title'
                           className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                    <input type='text' placeholder='Category'
                           className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                    <input type='text' placeholder='Price'
                           className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea cols={30} rows={5} placeholder='Description'
                              className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                    <input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="fileInput"
                        multiple
                    />
                    <div className="flex flex-wrap items-center gap-4">
                        <button type="button" onClick={() => document.getElementById('fileInput')?.click()}
                                className="w-20 h-20 bg-gray-200 hover:bg-gray-300 text-gray-500 flex items-center justify-center text-3xl rounded focus:outline-none focus:shadow-outline">
                            +
                        </button>
                        <div className="flex flex-wrap gap-4">
                            {fileProgress.map((fileProg, index) => (
                                <div key={index} className="w-20 h-20 relative">
                                    <img src={URL.createObjectURL(fileProg.file)} alt="Preview"
                                         className="w-full h-full object-cover rounded"/>
                                    <div
                                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xs">
                                        {fileProg.progress < 100 ? (
                                            <progress value={fileProg.progress} max="100" className="w-3/4"/>
                                        ) : (
                                            <span>{fileProg.status}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button type="button" onClick={handleSubmit}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Send
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
