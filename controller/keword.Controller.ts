import * as repository from '../repository/keywordRepository'

async function checkKeword(_data : string[]) {

    const result : boolean = await repository.checkKewordData(_data);


}

export{
    checkKeword
}