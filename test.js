const fs = require('fs');


fs.appendFile('log.txt', 'test\n', function(err) {
    if (err) throw err;
    console.log('Saved');
});

fs.appendFile('log.txt', 'test2\n', function(err) {
    if (err) throw err;
    console.log('Saved');
});