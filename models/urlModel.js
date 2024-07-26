import mongoose from "mongoose";

const urlSchema = mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
    },
    visitHistory: [{
        timestamp: {type: Number}
    }],
}, {
    timestamps: true
});

const URL = mongoose.model("Url", urlSchema);
export default URL;
