import express from 'express';
const router = express.Router();

import * as commentsControler from '../controller/commentsControler';
import * as validation from '../lib/validation';

///댓글 작성
router.post('/write',
    validation.writeContentsValidation,
    validation.validatorError,
    commentsControler.writeComments
);


export default router;