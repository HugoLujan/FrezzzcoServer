import mongoose from "mongoose";
import * as Config from "../config.js";


const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: false,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        required: true,
        trim: true
    },
});

// Método para configurar la URL de la imagen
productsSchema.methods.setImage = function SetImage(filename) {
    const { host, port } = Config;
    this.image = `${host}:${port}/uploads/${filename}`;
}

export default mongoose.model('Products', productsSchema);
