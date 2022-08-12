import express from 'express';
import {body, param, query, validationResult } from 'express-validator';



const titleBody = [
    body('title' , "title is empty").notEmpty(),
];

const contentsBody = [
    body('contents' , "contents is empty").notEmpty(),
];

const authorBody = [
    body('author' , "author is empty").notEmpty(),
];

const passwordBody = [
    body('password' , "password is empty").notEmpty(),
];

const boardNoBody = [
    body('board_no' , "board_no is empty").notEmpty(),
];

const commentsNoBody = [
    body('comments_no' , "comments_no is empty").notEmpty(),
];

const pageSizeQuery = [
    query('pageSize' , "pageSize is empty").notEmpty(),
    query('pageSize' , "pageSize is not number").isInt(),
];

const boardNoQuery = [
    query('board_no' , "board_no is empty").notEmpty(),
    query('board_no' , "board_no is not number").isInt(),
];


const commentsNoQuery = [
    query('comments_no' , "comments_no is empty").notEmpty(),
];

const boardNoParam = [
    param('board_no' , "board_no is empty").notEmpty(),
    param('board_no' , "board_no is not number").isInt(),
];

const commentsNoParam = [
    param('comments_no' , "board_no is empty").notEmpty(),
    param('comments_no' , "board_no is not number").isInt(),
];

// const writeBoardValidation = [
//     body('title' , "title is empty").notEmpty(),
//     body('contents' , "contents is empty").notEmpty(),
//     body('author' , "author is empty").notEmpty(),
//     body('password' , "password is empty").notEmpty(),
// ];

// const writeContentsValidation = [
//     body('board_no' , "board_no is empty").notEmpty(),
//     body('contents' , "contents is empty").notEmpty(),
//     body('author' , "author is empty").notEmpty(),
// ];

// const writeReplyValidation = [
//     body('comments_no' , "comments_no is empty").notEmpty(),
//     body('contents' , "contents is empty").notEmpty(),
//     body('author' , "author is empty").notEmpty(),
// ];

// const getBoardDataValidation = [
//     query('pageSize' , "pageSize is empty").notEmpty(),
//     query('pageSize' , "pageSize is not number").isInt(),
// ];

// const getCommentsDataValidation = [
//     query('pageSize' , "pageSize is empty").notEmpty(),
//     query('pageSize' , "pageSize is not number").isInt(),
//     query('board_no' , "board_no is empty").notEmpty(),
//     query('board_no' , "board_no is not number").isInt(),
// ];

// const getReplyDataValidation = [
//     query('pageSize' , "pageSize is empty").notEmpty(),
//     query('pageSize' , "pageSize is not number").isInt(),
//     query('comments_no' , "comments_no is empty").notEmpty(),
//     query('comments_no' , "comments_no is not number").isInt(),
// ];

// const boardNoValidation = [
//     param('board_no' , "board_no is empty").notEmpty(),
//     param('board_no' , "board_no is not number").isInt(),
// ];

// const commetsNoValidation = [
//     param('board_no' , "board_no is empty").notEmpty(),
//     param('board_no' , "board_no is not number").isInt(),
// ];



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
    titleBody,
    contentsBody,
    authorBody,
    passwordBody,
    boardNoBody,
    commentsNoBody,
    pageSizeQuery,
    boardNoQuery,
    commentsNoQuery,
    boardNoParam,
    commentsNoParam,
    // writeBoardValidation,
    // writeContentsValidation,
    // boardNoValidation,
    // writeReplyValidation,
    // getBoardDataValidation,
    // getCommentsDataValidation,
    // getReplyDataValidation,
    validatorError
}