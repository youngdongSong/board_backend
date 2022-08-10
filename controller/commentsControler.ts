import express from 'express';
import * as repository from '../repository/commentsRepository'

async function writeComments(req : express.Request, res : express.Response ) {
    const board_no : number = req.body['board_no'];
    const contents : string = req.body['contents'];
    const author : string = req.body['author'];

    const result : boolean = await repository.writeCommentsdData(board_no, contents, author);

    res.status(result ? 200 : 500).json({
        'code' : Number(result ? process.env.SUCCESS_INPUT  : process.env.ERR_SERVER),
        'msg' : result ? 'success' : 'server error'
    });
}

export{
    writeComments
}