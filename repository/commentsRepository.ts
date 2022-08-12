import knex from '../lib/knex_db';

const TABLE_BOARD: string = process.env.TABLE_BOARD as string;
const TABLE_COMMENTS: string = process.env.TABLE_COMMENTS as string;


/// 댓글 작성
/// _board_no : 게시물 번호
/// _contents : 내용
/// _author : 작성자
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

/// 게시물에 대한 댓글 조회
/// _board_no : 게시물 번호
/// _cursor : 댓글 번호 기준(no) 조회 시작 점
/// _pageSize : 댓글 보여줄 크기
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


/// 게시물에 대한 댓글 전체 수
/// _board_no : 게시물 번호
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

/// 게시물 존재 여부 확인
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