const express = require("express");
const fs = require("fs");
const log4js = require('log4js');

log4js.configure('log4js.json');
const logger = log4js.getLogger('app');

const app = express();
const port = 3880;

app.use(express.static("public"));

app.get('/:id', function(req, res){
    const pdf = fs.readFileSync(__dirname + '/public/PDF/'+req.params.id+'.pdf');
    if(pdf === null || pdf === undefined) {
        logger.info("There exists no PDF with ID: " + req.params.id);
    } else {
        logger.info("successfully fetched PDF with ID: " + req.params.id)
        res.contentType("application/pdf");
        res.send(pdf);
    }
});

app.listen(port, () => console.log(`app listening on port ${port}`));