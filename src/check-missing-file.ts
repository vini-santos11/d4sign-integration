import { prisma } from "./lib/prisma";
import fs from "fs";

async function checkMissingFile() {
    const dbFiles = await prisma.pDF.findMany();

    const directory = '/Users/vinicius/Documents/d4sign/';
    const folderFiles = fs.readdirSync(directory);
    var withoutExtensions = folderFiles.map(file => {
        return file.replace('.pdf', '');
    });

    const missingFiles = dbFiles.filter(file => !withoutExtensions.includes(file.name));

    missingFiles.forEach(async file => {
        await prisma.pDF.update({
            where: {
                id: file.id
            },
            data: {
                already_downloaded: false
            }
        })
    })
}

checkMissingFile();