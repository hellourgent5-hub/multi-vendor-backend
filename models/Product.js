import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    images: [String],
    category: String,
    reviews: [{ user: {type: mongoose.Schema.Types.ObjectId, ref:'User'}, rating: Number, comment: String }]
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
