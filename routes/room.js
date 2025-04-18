import roomValidation from '../utils/Validations/models/room/roomValidation.js';
import validationSchema from '../middlewares/validationSchema.js';
import validateObjectID from '../middlewares/validateObjectID.js';
import isAdminOrIsOwner from '../middlewares/isAdminOrIsOwner.js';
import isOwner from '../middlewares/isOwner.js';
import isAuth from '../middlewares/isAuth.js';
import express from 'express';

import {
    deleteRoom,
    createRoom,
    viewAllRooms,
    updateRoomDetails,
    checkAvailability,
    viewAvailableRooms,
    viewUnavailableRooms
} from '../controllers/room.js';

const router = express.Router();

router.get(
    '/:workspaceId/all',
    [isAuth , validateObjectID('workspaceId')],
    viewAllRooms
)

router.get(
    '/:workspaceId/available',
    [isAuth , validateObjectID('workspaceId')],
    viewAvailableRooms
)

router.get(
    '/:workspaceId/unavailable',
    [isAuth , validateObjectID('workspaceId')],
    viewUnavailableRooms
)

router.get(
    '/:workspaceId/:roomId/availability',
    [isAuth , validateObjectID('workspaceId', 'roomId')],
    checkAvailability
)

router.post(
    '/:workspaceId/create',
    [isAuth, isOwner, validateObjectID('workspaceId'),validationSchema(roomValidation),],
    createRoom
)

router.put(
    '/:workspaceId/:roomId',
    [isAuth, isAdminOrIsOwner , validateObjectID('workspaceId', 'roomId'),validationSchema(roomValidation),],
    updateRoomDetails
)

router.delete(
    '/:workspaceId/:roomId',
    [isAuth, isOwner,validateObjectID('workspaceId','roomId'),],
    deleteRoom
)

export default router;