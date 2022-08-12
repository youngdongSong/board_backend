import express from 'express';
const router = express.Router();

import * as commentsControler from '../controller/commentsControler';
import * as validation from '../lib/validation';

///댓글 작성
router.post('/write',
    //validation.writeContentsValidation,
    validation.boardNoBody.concat(
        validation.contentsBody,
        validation.authorBody
    ),
    validation.validatorError,
    commentsControler.writeComments
);

///게시물 전체 댓글 수 조회
router.get('/totalCount/:board_no' ,
    //validation.boardNoValidation,
    validation.boardNoParam,
    validation.validatorError,
    commentsControler.searchTotalCommentsCount
);


///댓글 조회 (페이징)
router.get('/' ,
    //validation.getCommentsDataValidation,
    validation.pageSizeQuery.concat(
        validation.boardNoQuery
    ),
    validation.validatorError,
    commentsControler.searchComments
);


export default router;