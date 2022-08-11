import knex from '../lib/knex_db';

const TABLE_BOARD: string = process.env.TABLE_BOARD as string;
const ENCRYPT_KEY: string = process.env.ENCRYPT_KEY as string;

/// 게시물 작성
/// _title : 제목
/// _contents : 내용
/// _author : 작성자
/// _password : 비밀번호
async function writeBoardData(
    _title: string,
    _contents: string,
    _author: string,
    _password: string,
): Promise<boolean> {
    try {
        await knex(TABLE_BOARD)
            .insert({
                title: _title,
                contents: _contents,
                author: _author,
                password: knex.raw(`HEX(AES_ENCRYPT('${_password}' , '${ENCRYPT_KEY}' , RANDOM_BYTES(16)))`),
                createdAt: knex.fn.now()
            });

        return true;

    } catch (err) {
        console.log(err);
        return false;
    }

}

async function updateBoardData(
    _no: number,
    _title: string,
    _contents: string,
    _author: string,
    _password: string,
): Promise<number> {
    try {
        let isModify: boolean = false;

        let exist: any[] =
            await knex
                .select(knex.raw(`cast(AES_DECRYPT(UNHEX(password), '${ENCRYPT_KEY}') as char(100)) as password`))
                .from(TABLE_BOARD)
                .where({ 'no': _no })
                .limit(1);


        if (exist.length < 1)
            return -1;

        let boardPassword: string = exist[0].password;

        if (boardPassword !== _password)
            return -2;


        let updateEntity: any = new Object();

        if (_title) {
            updateEntity.title = _title;
            isModify = true;
        }

        if (_contents) {
            updateEntity.contents = _contents;
            isModify = true;
        }

        if (_author) {
            updateEntity.author = _author;
            isModify = true;
        }

        if (!isModify)
            return -3;

        updateEntity.modifiedAt = knex.fn.now();

        await knex(TABLE_BOARD)
            .update(updateEntity)
            .where('no', _no);

        return 0;

    } catch (err) {
        console.log(err);
        return -100;
    }

}

async function deleteBoardData(
    _no: number,
    _password: string,
): Promise<number> {
    try {
        let exist: any[] =
            await knex
                .select( knex.raw(`cast(AES_DECRYPT(UNHEX(password), '${ENCRYPT_KEY}') as char(100)) as password`))
                .from(TABLE_BOARD)
                .where({ 'no': _no })
                .limit(1);


        if (exist.length < 1)
            return -1;

        let boardPassword: string = exist[0].password;

        if (boardPassword !== _password)
            return -2;

        await knex(TABLE_BOARD)
            .del()
            .where('no', _no);

        return 0;

    } catch (err) {
        return -100;
    }
}

async function searchBoardData(
    _cursor: any,
    _pageSize: number
): Promise<string> {

    try {
        let data: any = new Object();

        //첫 페이지
        if (isNaN(_cursor)) {
            data = await knex
                .select('no', 'title', 'contents', 'author', 'createdAt', 'modifiedAt')
                .from(TABLE_BOARD)
                .orderBy('no', 'desc')
                .limit(_pageSize)

            return data;
        }

        data = await knex
            .select('no', 'title', 'contents', 'author', 'createdAt', 'modifiedAt')
            .from(TABLE_BOARD)
            .where('no', '<', _cursor)
            .orderBy('no', 'desc')
            .limit(_pageSize)

        return data;

    } catch (err) {
        console.log(err);
        return 'error';
    }
}

async function searchBoardToalCount(): Promise<number> {
    try {
        let data : any =
        await knex
            .count('no as count')
            .from(TABLE_BOARD)

        return data[0].count;

    } catch (err) {
        console.log(err);
        return -100;
    }
}


export {
    writeBoardData,
    updateBoardData,
    deleteBoardData,
    searchBoardData,
    searchBoardToalCount
}