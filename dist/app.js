"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
require("dotenv/config");
var baseUrl = process.env.API_URL || '';
var page = 1;
var totalPages = Math.ceil(2600 / 500);
var allFiles = [];
var axiosInstance = axios_1.default.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});
try {
    while (page < totalPages) {
        console.log("Seedando página: ", page);
        axiosInstance.get('/documents', {
            params: {
                tokenAPI: process.env.SECRET_KEY,
                cryptKey: process.env.CRYPT_KEY,
                pg: page
            }
        }).then(function (response) {
            var documents = response.data;
            allFiles = allFiles.concat(documents);
        }).catch(function (error) {
            console.error(error);
        });
        page++;
        console.log(allFiles.length);
    }
}
catch (error) {
    throw new Error(String(error));
}
