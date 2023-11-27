import mongoose from "mongoose";
import * as Config from "../config.js";

const carruselSchema = new mongoose.Schema({
    image1: {
        type: String,
        required: false,
        trim: true
    },
    image2: {
        type: String,
        required: false,
        trim: true
    },
    image3: {
        type: String,
        required: false,
        trim: true
    },
});

// Método para configurar la URL de la imagen
carruselSchema.methods.setImage = function SetImage(image1Filename, image2Filename, image3Filename) {
    const { host, port } = Config;
    this.image1 = `${host}:${port}/uploads/${image1Filename}`;
    this.image2 = `${host}:${port}/uploads/${image2Filename}`;
    this.image3 = `${host}:${port}/uploads/${image3Filename}`;
}  

export default mongoose.model('Carrusel', carruselSchema);
