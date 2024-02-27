import mongoose from 'mongoose';

// const schema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     age: {
//         type: Number,
//         required: true,
//         min: 12
//     },
// }, { timestamps: true })

// export default mongoose.models.User || mongoose.model("users", schema)

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 12
    },
}, { timestamps: true })


export const userModel = mongoose.model("users", userSchema);