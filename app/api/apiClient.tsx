import React from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';


const axiosQueryInstance  = axios.create({
    baseURL: 'https://fakestoreapi.com/'
})

export  {
    axiosQueryInstance
};