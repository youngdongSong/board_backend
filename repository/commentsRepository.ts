import knex from '../lib/knex_db';

const TABLE_BOARD: string = process.env.TABLE_BOARD as string;
const TABLE_COMMENTS: string = process.env.TABLE_COMMENTS as string;


async function writeCommentsdData(
    _board_no : number,
    _contents: string,
    _author: string,
): Promise<number> {
    try {
        let boardData : any[] =
        await knex
        .select('no')
        .from(TABLE_BOARD)
        .where('no', _board_no );


        if(boardData.length <= 0)
            return -1;

        await knex(TABLE_COMMENTS)
            .insert({
                board_no : _board_no,
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
export {
    writeCommentsdData
}