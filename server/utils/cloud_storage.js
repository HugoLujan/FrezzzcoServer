import { Storage } from '@google-cloud/storage';
import { format } from 'util';
import { parse as urlParse } from 'url';
import { v4 as uuidv4 } from 'uuid';
const uuid = uuidv4();


const storage = new Storage({
    projectId: "delivery-mysql-5e23d",
    keyFilename: '/serviceAccountKey.json'
});

const bucket = storage.bucket("delivery-mysql-5e23d.appspot.com");

/**
 * Subir el archivo a Firebase Storage
 * @param {File} file objeto que sera almacenado en Firebase Storage
 */
export async function uploadImageToFirebase (file, pathImage, deletePathImage) {
    return new Promise(async (resolve, reject) => {
        if (deletePathImage) {
            // Eliminar la imagen anterior si se proporciona una URL
            if (deletePathImage != null || deletePathImage != undefined) {
                const parseDeletePathImage = url.parse(deletePathImage);
                var ulrDelete = parseDeletePathImage.pathname.slice(23);
                const fileDelete = bucket.file(`${ulrDelete}`);

                fileDelete.delete().then((imageDelete) => {
                    console.log('Se borró la imagen con éxito');
                }).catch(err => {
                    console.log('Failed to remove photo, error:', err);
                });
            }
        }

        if (pathImage) {
            if (pathImage != null || pathImage != undefined) {
                let fileUpload = bucket.file(`${pathImage}`);
                let stream = fileUpload.createWriteStream();
                const blobStream = stream.pipe(fileUpload.createWriteStream({
                    metadata: {
                        contentType: 'image/png',
                        metadata: {
                            firebaseStorageDownloadTokens: uuid,
                        }
                    },
                    resumable: false
                }));

                blobStream.on('error', (error) => {
                    console.log('Error al subir archivo a Firebase', error);
                    reject('Something is wrong! Unable to upload at the moment.');
                });

                blobStream.on('finish', () => {
                    const url = format(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media&token=${uuid}`);
                    console.log('URL DE CLOUD STORAGE ', url);
                    resolve(url);
                });

                blobStream.end(file.buffer);
            }
        }
    });
};