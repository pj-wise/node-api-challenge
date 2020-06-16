const express = require('express');

const Data = require('../data/helpers/actionModel.js');

const router = express.Router();

//middleware
const validateId = (req, res, next) => {
    Data.get(req.params.id)
        .then(action => {
            if (!action) {
                res.status(404).json({ err: "ID not found" });
            } else {
                req.action = action;
                next()
            }
        }).catch(() => {
            res.status(400).json({ err: "Invalid ID" })
        })
}

const validateAction = (req, res, next) => {
    if (!req.body) {
        res.status(400).json("Missing body")
    }

    if (!req.body.project_id) {
        res.status(400).json("Missing project id")
    }

    if (!req.body.description) {
        res.status(400).json("Missing description")
    }

    if (!req.body.notes) {
        res.status(400).json("Missing notes")
    }

    next()
}

//test
router.get('/count', (req, res) => {
    Data.get().then(action => {
        res.status(200).json(action.length);
    })
})

router.get('/', (req, res) => {
    Data.get()
        .then(action => { res.status(200).json(action) })
        .catch(() => { res.status(500).json({ err: "Actions could not be retrieved" }) })
})

router.get('/:id', validateId, (req, res) => {
    res.status(200).json(req.action);
})

router.post('/', validateAction, (req, res) => {
    Data.insert(req.body)
        .then(action => { res.status(201).json(action) })
        .catch(() => { res.status(500).json({ err: "Error adding action" }) })
})

router.put('/:id', validateId, validateAction, (req, res) => {
    Data.update(req.params.id, req.body)
        .then(action => { res.status(200).json(action) })
        .catch(() => { res.status(500).json({ err: "Error updating action" }) })
})

router.delete('/:id', validateId, (req, res) => {
    Data.remove(req.params.id)
        .then(action => { res.status(200).json(req.action) })
        .catch(() => { res.status(500).json({ err: "Error removing action" }) })
})

module.exports = router;