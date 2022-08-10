import knex from '../lib/knex_db';

const TABLE_COMMENTS : string = process.env.TABLE_COMMENTS as string;
const TABLE_REPLY : string = process.env.TABLE_REPLY as string;

async function writeReplydData(
    _comments_no : number,
    _contents: string,
    _author: string,
): Promise<number> {
    try {

        let commentsData : any[] =
        await knex
        .select('no')
        .from(TABLE_COMMENTS)
        .where('no', _comments_no );


        if(commentsData.length <= 0)
            return -1;


        await knex(TABLE_REPLY)
            .insert({
                comments_no : _comments_no,
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


export{
    writeReplydData
}