express = require('express');
app = express();
__rootDir = 'rootDirectory';

app.use(express.static(__rootDir));

app.get('/', function (req, res) {
    res.sendFile('ParallelChess.html', {
        root: __rootDir
    });
});

server = app.listen(8080, function () {
    host = server.address().address
    port = server.address().port

    console.log("Checkers listening at port %s", port)
})