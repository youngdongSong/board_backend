import knex from '../lib/knex_db';

const TABLE_BOARD: string = process.env.TABLE_BOARD as string;
const TABLE_COMMENTS: string = process.env.TABLE_COMMENTS as string;


async function writeCommentsdData(
    _board_no: number,
    _contents: string,
    _author: string,
): Promise<number> {
    try {
        let boardData: any[] =
            await knex
                .select('no')
                .from(TABLE_BOARD)
                .where('no', _board_no);


        if (boardData.length <= 0)
            return -1;

        await knex(TABLE_COMMENTS)
            .insert({
                board_no: _board_no,
                contents: _contents,
                author: _author,
                createdAt: knex.fn.now()
            });

        return 0;

    } catch (err) {
        console.log(err);
        return -100;
    }

}

async function searchCommentsData(
    _board_no: number,
    _cursor: any,
    _pageSize: number
): Promise<string> {

    try {
        if (!await isExistBoard(_board_no))
            return 'board_nothing';

        let data: any = new Object();

        //첫 페이지
        if (isNaN(_cursor)) {
            data = await knex
                .select('no', 'contents', 'author', 'createdAt')
                .from(TABLE_COMMENTS)
                .where('board_no', _board_no)
                .orderBy('no', 'desc')
                .limit(_pageSize)

            return data;
        }

        data = await knex
            .select('no', 'contents', 'author', 'createdAt')
            .from(TABLE_COMMENTS)
            .where('no', '<', _cursor)
            .andWhere('board_no', _board_no)
            .orderBy('no', 'desc')
            .limit(_pageSize)

        return data;

    } catch (err) {
        console.log(err);
        return 'error';
    }
}

async function searchCommentsToalCount(
    _board_no: number,
): Promise<number> {
    try {
        if (!await isExistBoard(_board_no))
            return -1;

        let data: any =
            await knex
                .count('no as count')
                .from(TABLE_COMMENTS)
                .where('board_no', _board_no);

        return data[0].count;

    } catch (err) {
        console.log(err);
        return -100;
    }
}

async function isExistBoard(_board_no: number): Promise<boolean> {
    let boardData = await knex
        .count('no as count')
        .from(TABLE_BOARD)
        .where('no', _board_no);

    if (boardData[0].count <= 0)
        return false;

    return true;

}

export {
    writeCommentsdData,
    searchCommentsData,
    searchCommentsToalCount
}