import 'dotenv/config';
import { prisma } from "./lib/prisma";
import { axiosInstance } from './lib/axios';


export interface Document {
    uuidDoc: string,
    nameDoc: string,
}

let page = 1;

try {
    while(page < 7) {
        console.log("Seedando página: ", page)
        axiosInstance.get('/documents', {
            params: {
                tokenAPI: process.env.SECRET_KEY,
                cryptKey: process.env.CRYPT_KEY,
                pg: page
            }
        }).then((response) => {
            const documents: Document[] = response.data;
            documents.forEach(async (document) => {
                await prisma.pDF.create({
                    data: {
                        id_d4sign: document.uuidDoc ?? "",
                        name: document.nameDoc ?? "",
                        url: "",
                        already_downloaded: false
                    }
                });
            });
        }).catch((error) => {
            console.error(error);
        });
        page++;
    }

} catch (error) {
    throw new Error(String(error));
}
