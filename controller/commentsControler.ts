import express from 'express';
import * as repository from '../repository/commentsRepository'
import * as kewordController from './keword.Controller'

async function writeComments(req : express.Request, res : express.Response ) {
    const board_no : number = req.body['board_no'];
    const contents : string = req.body['contents'];
    const author : string = req.body['author'];

    const result : number = await repository.writeCommentsdData(board_no, contents, author);

    switch(result) {
        //게시물이 존재하지 않은 경우
        case -1 :
            res.status(404).json({
                'code' : Number(process.env.ERR_NOT_EXIST),
                'msg' : 'board does not exist'
            });
            break;


        //서버 오류
        case -100:
            res.status(500).json({
                'code' : Number(process.env.ERR_SERVER),
                'msg' : 'Server error'
            });
            break;


        //작성 성공
        default :
            res.status(200).json({
                'code' : Number(process.env.SUCCESS_UPDATE),
                'msg' : 'success'
            });

            kewordController.checkKeword([contents]);
            break;

    }




}

export{
    writeComments
}