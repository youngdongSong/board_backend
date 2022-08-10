import knex from '../lib/knex_db';

const TABLE_COMMENTS: string = process.env.TABLE_COMMENTS as string;
async function writeCommentsdData(
    _board_no : number,
    _contents: string,
    _author: string,
): Promise<boolean> {
    try {
        await knex(TABLE_COMMENTS)
            .insert({
                board_no : _board_no,
                contents: _contents,
                author: _author,
                createdAt: knex.fn.now()
            });

        return true;

    } catch (err) {
        console.log(err);
        return false;
    }

}
export {
    writeCommentsdData
}