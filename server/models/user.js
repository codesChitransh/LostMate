import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@srmist.edu\.in$/.test(v); // Replace "yourdomain.com" with the allowed domain
            },
            message: props => `${props.value} is not a valid email! Email must be from yourdomain.com`
        }
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
