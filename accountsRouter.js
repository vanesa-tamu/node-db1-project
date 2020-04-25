const router = require('express').Router();
const db = require('./data/dbConfig.js')

router.get('/', (req,res) => {
    db('accounts')
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(error => res.status(500).json({message: `error in retrieveing accounts`}))
})

router.get('/:id', (req,res) => {
    const { id } = req.params
    db('accounts').where({ id })
        .then(account => {
            res.status(200).json(account[0])
        })
        .catch(error => res.status(500).json({message: `error in retrieveing specific account`}))
})

router.post('/', validatePost, (req, res) => {
    // console.log('REQ BODY', req.body)
    const newAccount = req.body
    db('accounts').insert(newAccount, 'id')
        .then(user => {
            res.status(201).json(user);
        })
        .catch(error => {
            console.log('POST', error);
            res.status(500).json({error: `error adding this new user!`})
        })
})

function validatePost(req, res, next) {
    const { name } = req.body;
    const { budget } = req.body;

    if (Object.keys(req.body).length === 0) {
        res.status(400).json({ message: "Missing user data." });
    } 
    else if(!name) {
        res.status(400).json({ message: "Missing name." });
    }
    else if(budget <= 0) {
        console.log("NO BUD", budget)
        res.status(400).json({ message: "Missing budget." });
    }
    else if(typeof name !== "string"){
        return res.status(400).json({error: `must provide string for the user's name`});
    }
    else if(typeof budget !== "number"){
        return res.status(400).json({error: `must provide a number for user's budget`});
    }
    req.body = { name, budget }
    next();
}


module.exports = router;