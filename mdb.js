const readline = require('readline');
const { ChatMy } = require('./comjs/I_Mongo');
const chat_db = new ChatMy('newArtDB');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'MYTEST> '
});

rl.prompt();

rl.on('line', (line) => {
    switch (line.trim()) {
        case 'hello':
            console.log('world!');
            break;
        default:
            chat_db.create('movies', { user: line.trim() }).then(res => { console.log(res) });
            break;
    }
    rl.prompt();
}).on('close', () => {
    chat_db.close();
    console.log('Have a great day!');
    process.exit(0);
});
