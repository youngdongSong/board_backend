import express from 'express';
const router = express.Router();

import * as boardControler from '../controller/boardController';
import * as validation from '../lib/validation';
import commentsRouter from '../router/commentsRouter';
import replyRouter from '../router/replyRouter';

router.use('/comments' , commentsRouter);
router.use('/reply' , replyRouter);

///게시글 작성
router.post('/write',
    validation.writeBoardValidation,
    validation.validatorError,
    boardControler.writeBoard,
);

///게시글 수정
router.put('/:board_no',
    validation.boardNoValidation,
    validation.validatorError,
    boardControler.updateBoard
);

///게시글 삭제
router.delete('/:board_no/:password',
    validation.boardNoValidation,
    validation.validatorError,
    boardControler.deleteBoard
);

///전체 게시글 수 조회
router.get('/totalCount' ,
    boardControler.searchTotalCountBoard
);


///게시판 조회 (페이징)
router.get('/' ,
    validation.getBoardDataValidation,
    validation.validatorError,
    boardControler.searchBoard
);




export default router;