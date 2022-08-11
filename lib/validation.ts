import express from 'express';
import {body, param, query, validationResult } from 'express-validator';

const writeBoardValidation = [
    body('title' , "title is empty").notEmpty(),
    body('contents' , "contents is empty").notEmpty(),
    body('author' , "author is empty").notEmpty(),
    body('password' , "password is empty").notEmpty(),
];

const writeContentsValidation = [
    body('board_no' , "board_no is empty").notEmpty(),
    body('contents' , "contents is empty").notEmpty(),
    body('author' , "author is empty").notEmpty(),
];

const writeReplyValidation = [
    body('comments_no' , "comments_no is empty").notEmpty(),
    body('contents' , "contents is empty").notEmpty(),
    body('author' , "author is empty").notEmpty(),
];

const getBoardDataValidation = [
    query('pageSize' , "pageSize is empty").notEmpty(),
    query('pageSize' , "pageSize is not number").isInt(),
];

const boardNoValidation = [
    param('board_no' , "board_no is not number").isInt(),

];

const validatorError = (req : express.Request, res : express.Response, next : express.NextFunction) =>{
	const errors = validationResult(req)['errors'];
    Object.keys(errors).length !== 0 ? res.status(400).json(
        {
            "code" : Number(process.env.ERR_VALIDATION),
            "msg" : errors
        }
        ) : next();
}


export {
    writeBoardValidation,
    writeContentsValidation,
    boardNoValidation,
    writeReplyValidation,
    getBoardDataValidation,
    validatorError
}