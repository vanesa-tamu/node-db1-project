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
module.exports = router;