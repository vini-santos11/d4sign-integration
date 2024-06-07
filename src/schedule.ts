import { downloadFile } from "./download-document";
import { prisma } from "./lib/prisma";
import cron from "node-cron";

async function main() {
    try {
        //cron schedule 2 hours
        cron.schedule('0 */2 * * *', async () => {
            console.log(new Date() + 'downloading document...')

            //get top 100 documents
            const documents = await prisma.pDF.findMany({
                take: 100,
                where: {
                    already_downloaded: false
                }
            });

            documents.forEach(async document => {
                let i = 0;
                await downloadFile(document?.id_d4sign, i++)
            
                if(document != null)
                    document.already_downloaded = true
        
                await prisma.pDF.update({
                    where: {
                        id: document?.id
                    },
                    data: {
                        already_downloaded: true
                    }
                })
            })
        })
    } catch (error) {
        console.error(error)
    }
}

main();