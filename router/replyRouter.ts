import express from 'express';
const router = express.Router();

import * as replyControler from '../controller/replyControler';
import * as validation from '../lib/validation';

router.get('/', (req : express.Request, res : express.Response) => res.end());

///대댓글 작성
router.post('/write',
    validation.writeReplyValidation,
    validation.validatorError,
    replyControler.writeReply
);

export default router;