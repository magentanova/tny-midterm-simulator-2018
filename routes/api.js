const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const Simulator = require('../simulator')

const racesPath = path.resolve(__dirname, '../files/api/races/base_races.json');
const resultsPath = path.resolve(__dirname, '../files/api/results/base_results.json')

const simulator = new Simulator();

router.get('/races', async function(req, res, next) {
    const page = req.query.page 
    const path = [racesPath.split('.')[0], 'page' + page, 'json'].join('.')
    try {
        const blob = fs.readFileSync(path, 'utf-8')
        return res.json(JSON.parse(blob))
    }
    catch (e) {
        next(e)
    }
});

router.get('/races/results', async function(req, res, next) {
    const page = req.query.page 
    const path = [resultsPath.split('.')[0], 'page' + page, 'json'].join('.')
    try {
        const blob = fs.readFileSync(path, 'utf-8')
        return res.json(JSON.parse(blob))
    }
    catch (e) {
        next(e)
    }
});

router.get('/simulator/pause', (req, res, next) => {
    simulator.pause()
    res.json({
        message: 'simulation pause'
    })
})

router.get('/simulator/reset', (req, res, next) => {
    simulator.reset()
    res.json({
        message: 'simulation reset'
    })
})

router.get('/simulator/start', (req, res, next) => {

    console.log('query ', req.query)
    simulator.start(req.query)
    res.json({
        message: 'simulation started',
        your_query: req.query
    })
})

router.get('/simulator/stop', (req, res, next) => {
    simulator.stop()
    res.json({
        message: 'simulation stopped'
    })
})

module.exports = router;
