import * as repository from '../repository/keywordRepository'

async function checkKeword(_data : string[]) {

    const result : boolean = await repository.checkKewordData(_data);

    console.log(`checkKeword : ${result}`);

    if(result)
        sendPushMessage();
}

function sendPushMessage (){
    console.log(`Send notifications to users`);
}


export{
    checkKeword
}