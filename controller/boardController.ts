import express, { NextFunction } from 'express';
import * as repository from '../repository/boardRepository'
import * as kewordController from './keword.Controller'


async function writeBoard(req : express.Request, res : express.Response , next : NextFunction ) {
    const title : string = req.body['title'];
    const contents : string = req.body['contents'];
    const author : string = req.body['author'];
    const password : string = req.body['password'];

    const result : boolean = await repository.writeBoardData(title, contents, author, password);

    res.status(result ? 200 : 500).json({
        'code' : Number(result ? process.env.SUCCESS_INPUT  : process.env.ERR_SERVER),
        'msg' : result ? 'success' : 'server error'
    });

    if(result)
        kewordController.checkKeword([title, contents]);
}

async function updateBoard(req : express.Request, res : express.Response ) {
    const no : number =  Number(req.params.board_no);
    const title : string = req.body['title'];
    const contents : string = req.body['contents'];
    const author : string = req.body['author'];
    const password : string = req.body['password'];

    const result : number = await repository.updateBoardData(no, title, contents, author, password);

    switch(result) {
        //게시물이 존재하지 않은 경우
        case -1 :
            res.status(404).json({
                'code' : Number(process.env.ERR_NOT_EXIST),
                'msg' : 'This board does not exist'
            });
            break;

        //패스워드가 다를 경우
        case -2:
            res.status(404).json({
                'code' : Number(process.env.ERR_NOT_MATCH_PASSWORD),
                'msg' : 'Password does not match'
            });
            break;

        //수정 사항이 없는 경우
        case -3:
            res.status(400).json({
                'code' : Number(process.env.ERR_NO_DATA),
                'msg' : 'No data to change'
            });
            break;

        //서버 오류
        case -100:
            res.status(500).json({
                'code' : Number(process.env.ERR_SERVER),
                'msg' : 'Server error'
            });
            break;


        //업데이트 성공
        default :
            res.status(200).json({
                'code' : Number(process.env.SUCCESS_UPDATE),
                'msg' : 'success'
            })
            break;

    }
}
async function deleteBoard(req : express.Request, res : express.Response ) {
    const no : number =  Number(req.params.board_no);
    const password : string =  req.params.password;


    const result : number = await repository.deleteBoardData(no, password);

    switch(result) {
        //게시물이 존재하지 않은 경우
        case -1 :
            res.status(404).json({
                'code' : Number(process.env.ERR_NOT_EXIST),
                'msg' : 'This board does not exist'
            });
            break;

        //패스워드가 다를 경우
        case -2:
            res.status(404).json({
                'code' : Number(process.env.ERR_NOT_MATCH_PASSWORD),
                'msg' : 'Password does not match'
            });
            break;

        //서버 오류
        case -100:
            res.status(500).json({
                'code' : Number(process.env.ERR_SERVER),
                'msg' : 'Server error'
            });
            break;


        //업데이트 성공
        default :
            res.status(200).json({
                'code' : Number(process.env.SUCCESS_UPDATE),
                'msg' : 'success'
            })
            break;

    }
}

async function searchBoard(req : express.Request, res : express.Response ) {
    const pageSize : number = Number(req.query.pageSize);
    const cursor : number = Number(req.query.cursor);

    const result : string = await repository.searchBoardData(cursor, pageSize);

    switch(result) {
        case 'error' :
            res.status(500).json({
                "code" : Number(process.env.ERR_SERVER),
                "msg" : "server error"
            });
        break;

        default :
            res.status(200).json({
                "code" : Number(process.env.SUCCESS_GET_DATA),
                "msg" : result
            });
        break;

    }
}

async function searchTotalCountBoard(req : express.Request, res : express.Response ) {

    const result : number = await repository.searchBoardToalCount();

    switch(result) {
        case -1 :
            res.status(500).json({
                "code" : Number(process.env.ERR_SERVER),
                "msg" : "server error"
            });
        break;

        default :
            res.status(200).json({
                "code" : Number(process.env.SUCCESS_GET_DATA),
                "msg" : result
            });
        break;

    }
}



export {
    writeBoard,
    updateBoard,
    deleteBoard,
    searchBoard,
    searchTotalCountBoard
}