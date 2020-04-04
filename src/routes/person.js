let express = require('express');

let router = express.Router();

// router.get('/person', (req, res) => {
//     res.send('Hi, Thank You')
// });

//queryString
router.get('/person', (req, res) => {
    if(req.query.name) {
    res.send(`Hi, Thank You, ${req.query.name}`);
    }else {
    res.send('Hi, Thank You');
    }
});

//params
router.get('/person/:name', (req, res) => {
    res.send(`Hi, Thank You, ${req.params.name}`)
});

router.get('/error', (req,res) => {
    throw new Error('this is a forced error');
})

module.exports = router;