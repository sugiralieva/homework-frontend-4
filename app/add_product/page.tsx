'use client'
import React, {ChangeEvent, useState} from 'react';
import {axiosInstance} from "@/app/api/apiClient";
import {AxiosError, AxiosProgressEvent, AxiosResponse} from "axios";
import Link from "next/link";

const AddProduct = () => {
    const [file, setFile] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [status, setStatus] = useState<string>('');
    const [loadedBytes, setLoadedBytes] = useState<number>(0);
    const [totalBytes, setTotalBytes] = useState<number>(0);

    const uploadFile = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        setFile(URL.createObjectURL(selectedFile));
        const formData = new FormData();
        formData.append("file", selectedFile);

        axiosInstance.post('files/upload', formData, {
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                const loaded = progressEvent.loaded;
                const total = progressEvent.total  || 0; ;
                setLoadedBytes(loaded);
                setTotalBytes(total);
                const percent = (loaded / total) * 100;
                setUploadProgress(Math.round(percent));
                setStatus(Math.round(percent) + "% uploaded...");
            }
        })
            .then((response: AxiosResponse) => {
                setStatus("Upload successful!");
                setUploadProgress(100);
                console.log(response.data);
            })
            .catch((error: AxiosError) => {
                setStatus("Upload failed!");
                console.error(error);
            });
    };
    return (
        <div>
            <form>
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
                    <input type="file" name="file" onChange={uploadFile} />
                    <div>
                    <label>
                        File progress: <progress value={uploadProgress} max="100" />
                    </label>
                    <p>{status}</p>
                    <p>uploaded {loadedBytes} bytes of {totalBytes}</p>
                    {file && <img src={file} alt="Preview" style={{ width: "300px", height: "100px" }} />}
                    </div>
                </div>
                <button>Send</button>
            </form>
        </div>
    );
};

export default AddProduct;