import express from 'express';
import * as repository from '../repository/replyRepository'
import * as kewordController from './keword.Controller'

async function writeReply(req : express.Request, res : express.Response ) {
    const comments_no : number = req.body['comments_no'];
    const contents : string = req.body['contents'];
    const author : string = req.body['author'];

    const result : number = await repository.writeReplydData(comments_no, contents, author);

    switch(result) {
        //댓글이 존재하지 않은 경우
        case -1 :
            res.status(404).json({
                'code' : Number(process.env.ERR_NOT_EXIST),
                'msg' : 'Comments does not exist'
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
    writeReply
}