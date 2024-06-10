import React from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';


const axiosQueryInstance  = axios.create({
    baseURL: 'https://fakestoreapi.com/'
})

const axiosInstance = axios.create({
    baseURL: 'https://api.escuelajs.co/api/v1/',
});

export  {
    axiosQueryInstance, axiosInstance
};