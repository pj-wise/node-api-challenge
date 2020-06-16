const express = require('express');

const Data = require('../data/helpers/projectModel.js');

const router = express.Router();

//middleware
const validateId = (req, res, next) => {
    Data.get(req.params.id)
        .then(project => {
            if (!project) {
                res.status(404).json({ err: "ID not found" });
            } else {
                req.project = project;
                next()
            }
        }).catch(() => {
            res.status(400).json({ err: "Invalid ID" })
        })
}

const validateProject = (req, res, next) => {
    if (!req.body) {
        res.status(400).json("Missing body")
    }

    if (!req.body.description) {
        res.status(400).json("Missing description")
    }

    if (!req.body.name) {
        res.status(400).json("Missing name")
    }

    next()
}


router.get('/', (req, res) => {
    Data.get()
        .then(project => { res.status(200).json(project) })
        .catch(() => { res.status(500).json({ err: "projects could not be retrieved" }) })
})

router.get('/:id', validateId, (req, res) => {
    res.status(200).json(req.project);
})

router.get('/:id/actions', validateId, (req, res) => {
    Data.getProjectActions(req.params.id)
        .then(actions => { res.status(200).json(actions) })
        .catch(() => { res.status(500).json({ err: "project actions could not be retrieved" }) })
})

router.post('/', validateProject, (req, res) => {
    Data.insert(req.body)
        .then(project => { res.status(201).json(project) })
        .catch(() => { res.status(500).json({ err: "Error adding project" }) })
})

router.put('/:id', validateId, validateProject, (req, res) => {
    Data.update(req.params.id, req.body)
        .then(project => { res.status(200).json(project) })
        .catch(() => { res.status(500).json({ err: "Error updating project" }) })
})

router.delete('/:id', validateId, (req, res) => {
    Data.remove(req.params.id)
        .then(project => { res.status(200).json(req.project) })
        .catch(() => { res.status(500).json({ err: "Error removing project" }) })
})

module.exports = router;