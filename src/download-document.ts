import axios from "axios";
import { axiosInstance } from "./lib/axios";
import 'dotenv/config';

import fs from "fs";
import path from "path";

export interface DownloadDocument {
    url: string,
    name: string
}

export async function downloadFile(fileId: string | undefined) {
    try {
        await axiosInstance.post(`/documents/${fileId}/download`, { type: 'pdf', language: 'pt' }, {
            params: {
                tokenAPI: process.env.SECRET_KEY,
                cryptKey: process.env.CRYPT_KEY,
            }
        }).then( async response => {
            const document: DownloadDocument = response.data;
            console.log(document)

            const destination = String(`/Users/vinicius/Documents/d4sign/${document.name}.pdf`, )
            //E:/G_/Arquivos_2/ContratosAssinados

            await axios({
                url: document.url,
                method: 'GET',
                responseType: 'stream',
            }).then(response => {
                response.data.pipe(fs.createWriteStream(destination))
                return new Promise((resolve, reject) => {
                    response.data.on('end', () => {
                        resolve(destination)
                    })
                    response.data.on('error', (err: any) => {
                        reject(err)
                    })
                })
            })
        });
              

    } catch (error) {
        console.error(error);
    }
}