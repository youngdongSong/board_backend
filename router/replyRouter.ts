import express from 'express';
const router = express.Router();

import * as replyControler from '../controller/replyControler';
import * as validation from '../lib/validation';

router.get('/', (req : express.Request, res : express.Response) => res.end());

///대댓글 작성
router.post('/write',
    //validation.writeReplyValidation,
    validation.commentsNoBody.concat(
        validation.contentsBody,
        validation.authorBody
    ),
    validation.validatorError,
    replyControler.writeReply
);

///전체 대댓글 수 조회
router.get('/totalCount' ,
    //validation.boardNoValidation,
    validation.boardNoParam,
    validation.validatorError,
    replyControler.searchTotalReplyCount
);


///대댓글 조회 (페이징)
router.get('/' ,
    //validation.getReplyDataValidation,
    validation.pageSizeQuery.concat(validation.commentsNoQuery),
    validation.validatorError,
    replyControler.searchReply
);

export default router;