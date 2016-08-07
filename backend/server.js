var express = require('express');
var path = require('path');
var app = express();

var port = process.env.PORT || 8080;

var isProduction = process.env.NODE_ENV === 'production';

app.use(express.static(path.join(__dirname, '../dist')));
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use(function(err, req, res, next){
    console.error(err.stack);
    if(isProduction){
        res.status(500).send('<h2>Unexpected Error</h2>');
    }else{
        res.status(500).send('<h2>Unexpected Error</h2><p><b>Trace: </b> '+ err.stack +'</p>');
    }
});

app.listen(port, function(){
    console.log('Server listening on port ' + port);
});