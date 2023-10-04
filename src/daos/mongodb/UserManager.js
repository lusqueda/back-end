import mongoose from "mongoose";
import { userModel } from "./models/users.model.js";
import envConfig from "../../config/env.config.js";


export default class UserManager {

    // connection = mongoose.connect(
    //     envConfig.mongoUrl
    // );

    updatePassword = async (email, element) => {
        let result = await userModel.updateOne(
            { email: email },
            { password: element }
        );
        return result 
    }

    getUser = async (email) => {
        let result = await userModel.findOne({email:email});
        return result;
    }

    getUserById = async (id) => {
        let result = await userModel.findOne({_id:id});
        return result;
    }

    changeRole = async (id, role) => {
        let result = await userModel.updateOne(
            { id: id },
            { role: role }
        );
        return result;
    }

    uploadFiles = async (documents) => {
        await documents.save();
        return;
    }

}





