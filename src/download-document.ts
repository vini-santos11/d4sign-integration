import axios from "axios";
import { axiosInstance } from "./lib/axios";
import 'dotenv/config';

import fs from "fs";
import path from "path";

export interface DownloadDocument {
    url: string,
    name: string
}

export async function downloadFile(fileId: string | undefined, number: number) {
    try {
        const response = await axiosInstance.post(`/documents/${fileId}/download`, { type: 'pdf', language: 'pt' }, {
            params: {
                tokenAPI: process.env.SECRET_KEY,
                cryptKey: process.env.CRYPT_KEY,
            }
        })
        
        const document: DownloadDocument = response.data;
        console.log(document)

        const destination = String(`/Users/vinicius/Documents/d4sign/${document.name}.pdf`)
        //E:/G_/Arquivos_2/ContratosAssinados

        const documentFetchted = await axios({
            url: document.url,
            method: 'GET',
            responseType: 'stream',
        })

        documentFetchted.data.pipe(fs.createWriteStream(destination))
        console.log(number + 'Document downloaded successfully!')
    } catch (error) {
        console.error(error);
    }
}