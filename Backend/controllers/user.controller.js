import User from '../../DB_Models/user-model.js';
import asyncHandler from "../middleWares/asyncHandler.js";
import bcrypt from "bcryptjs"
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || !password.length) {
        throw new Error("Username or email or password are required");
    }

    const userExists = await User.findOne({ email: email });
    if (userExists) res.status(400).send("User already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({username,email, password:hashedPassword});

    try{
        await newUser.save();
        createToken(res,newUser._id);
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        });
    }catch(error){
        res.status(400);
        throw new Error("Invalid username or password");
    }
} );

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (isPasswordValid) {
            createToken(res, existingUser._id);
            res.status(201).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin
            });

        }
    }
});

const logoutUser = asyncHandler(async (req, res) => {

    res.cookie("jwt","",{
        httpOnly:true,
        expires: new Date(0),
    });

    res.status(200).json({message: "User logged out"});

});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
})

const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user){
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        });
    }else{
        res.status(404)
        throw new Error("User not found");
    }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user){
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        if (req.body.password){
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        const updateUser = await user.save()

        res.json({
            _id: updateUser._id,
            username: updateUser.username,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin
        });
    }
});

const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if(user){
        if(user.isAdmin){
            res.status(400)
            throw new Error("Cannot delete Admin user");
        }

        await User.deleteOne({_id: user._id})
        res.json({
            message: `User deleted`,
            id: user._id,
            username: user.username,
            email: user.email
        })

    }else{
        res.status(404);
        throw new Error("User not found");
    }
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if(user) {
        res.status(200).json({user})
    }else{
        res.status(404).json({
            message: `User not found`,
        })
    }
});

const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if(user){
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updateUser = await user.save()

        res.json({
            _id: updateUser._id,
            username: updateUser.username,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin
        });
    }else{
        res.status(404).json({
            message: `User not found`,
        })
    }
});

const createNewNotification = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if(user){

        try{
            const newNotification = {
                AttractionName: req.body.AttractionName,
                Rule: req.body.Rule,
                ExpirationData: req.body.ExpirationData,
            }
            await User.findOneAndUpdate(
                {_id: req.params.id},
                {
                    $addToSet:{
                        NotificationRules: newNotification
                    },
                },{
                    upsert: true,
                    new: true,
                    runValidators: true
                }
            )

            res.status(201).json({
                message: "New Notification created",
            })
        }catch(error){
            res.status(500);
            // throw new Error("Server Error, did not add notification");
            throw new Error(error);
        }

    }else{
        res.status(404).json({
            message: `User not found`,
        })
    }
})

const updateNotificationById = asyncHandler(async (req, res) => {
    try{
        const user = await User.findById(req.user._id);

        const findNotification = await user.NotificationRules.id(req.body.id);

        if (user){
            if(findNotification){
                findNotification.AttractionName = req.body.AttractionName || findNotification.AttractionName;
                findNotification.Rule = req.body.Rule|| findNotification.Rule;
                findNotification.ExpirationData = req.body.ExpirationData || findNotification.ExpirationData;

                const updateNotification = await user.save()

                res.json({
                    AttractionName: findNotification.AttractionName,
                    Rule: findNotification.Rule,
                    ExpirationData: findNotification.ExpirationData,
                    _id: findNotification._id
                });
                console.log(`New Notification: ${updateNotification}`);
            }else{
                res.status(404).json({
                    message: `Notification not found`,
                })
            }

        }else{
            res.status(404).json({
                message: `User not found`,
            })
        }
    }catch(error){
        res.status(500);
        throw new Error(error);
    }

})

const deleteNotification = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const notificationId = req.body.id;

try{
    const user = await User.findByIdAndUpdate(
        userId,
        {
            $pull: {NotificationRules: {_id: notificationId}},
        },
        {new: true}
    );
    if(!user){
        return res.status(404).json({message: `User not found`});
    }

    res.status(200).json({
        message: "Notification deleted",
        userId: userId._id,
        Username: userId.username,
    })
}catch(error){
    res.status(500);
    throw new Error(error);
}

})

export {
    createUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById,
    createNewNotification,
    updateNotificationById,
    deleteNotification
};

