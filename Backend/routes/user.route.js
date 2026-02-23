import express from 'express';
import {
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
    deleteNotification,
    getAllUserNotifications
} from "../controllers/user.controller.js";
import { authenticate, authorizeAdmin } from "../middleWares/authMiddleware.js"


const router = express.Router();

router.route('/')
    .post(createUser)
    .get(authenticate, authorizeAdmin, getAllUsers);

router.post('/auth',loginUser);
router.post('/logout', logoutUser)

router.route('/profile')
    .get(authenticate, getCurrentUserProfile)
    .put(authenticate, updateCurrentUserProfile);

router.route('/:id')
    .delete(authenticate, authorizeAdmin, deleteUserById)
    .get(authenticate, authorizeAdmin, getUserById)
    .put(authenticate, authorizeAdmin, updateUserById);

router.route('/notification/:id')
    .post(authenticate, createNewNotification)
    .put(authenticate, updateNotificationById)
    .delete(authenticate, deleteNotification)
    .get(authenticate, getAllUserNotifications);

export default router;