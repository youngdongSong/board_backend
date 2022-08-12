import knex from '../lib/knex_db';

const TABLE_COMMENTS : string = process.env.TABLE_COMMENTS as string;
const TABLE_REPLY : string = process.env.TABLE_REPLY as string;


/// 대댓글 작성
/// _comments_no : 댓글 번호
/// _contents : 내용
/// _author : 작성자
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


/// 댓글에 대한 대댓글 조회
/// _comments_no : 댓글 번호
/// _cursor : 대댓글 번호 기준(no) 조회 시작 점
/// _pageSize : 대댓글 보여줄 크기
async function searchReplyData(
    _comments_no: number,
    _cursor: any,
    _pageSize: number
): Promise<string> {

    try {
        if (!await isExistComments(_comments_no))
            return 'comments_nothing';

        let data: any = new Object();

        //첫 페이지
        if (isNaN(_cursor)) {
            data = await knex
                .select('no', 'contents', 'author', 'createdAt')
                .from(TABLE_REPLY)
                .where('comments_no', _comments_no)
                .orderBy('no', 'desc')
                .limit(_pageSize)

            return data;
        }

        data = await knex
            .select('no', 'contents', 'author', 'createdAt')
            .from(TABLE_REPLY)
            .where('no', '<', _cursor)
            .andWhere('comments_no', _comments_no)
            .orderBy('no', 'desc')
            .limit(_pageSize)

        return data;

    } catch (err) {
        console.log(err);
        return 'error';
    }
}


/// 댓글에 대한 대댓글 전체 수 조회
/// _comments_no : 댓글 번호
async function searchReplyToalCount(
    _comments_no: number,
): Promise<number> {
    try {
        if (!await isExistComments(_comments_no))
            return -1;

        let data: any =
            await knex
                .count('no as count')
                .from(TABLE_REPLY)
                .where('comments_no', _comments_no);

        return data[0].count;

    } catch (err) {
        console.log(err);
        return -100;
    }
}


/// 댓글 존재 유무 확인
async function isExistComments(_comments_no: number): Promise<boolean> {
    let commentsData = await knex
        .count('no as count')
        .from(TABLE_COMMENTS)
        .where('no', _comments_no);

    if (commentsData[0].count <= 0)
        return false;

    return true;

}


export{
    writeReplydData,
    searchReplyData,
    searchReplyToalCount
}