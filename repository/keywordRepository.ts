import knex from '../lib/knex_db';

const TABLE_KEYWORD : string = process.env.TABLE_KEYWORD as string


/// 키워드 존재 여부 확인
async function checkKewordData(
   _data : string[]
): Promise<boolean> {
    try {
        let data : string = '';

        _data.map(contents =>{
            data += contents;
        });

        let dbResult = await knex
            .count('no as count')
            .from(TABLE_KEYWORD)
            .where(knex.raw(`INSTR('${data}', keyword)`));

        if(dbResult[0].count > 0)
            return true;

        return false;

    } catch (err) {
        console.log(err);
        return false;
    }

}

export {
    checkKewordData
}