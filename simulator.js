const exec = require('child_process').exec
const fs = require('fs');
const path = require('path');

const resultsDir = path.resolve(__dirname, './files/api/results');

const choice = array => {
    return array[Math.round(Math.random() * (array.length - 1))]
}

class Simulator {
    editOnePrecinct(settings){
        console.log(fs.readdirSync(resultsDir))
        console.log(resultsDir, choice(fs.readdirSync(resultsDir)))
        const targetFile = path.join(resultsDir, choice(fs.readdirSync(resultsDir)))
        const contents = JSON.parse(fs.readFileSync(targetFile, 'utf-8'))
        const targetRace = choice(contents.data)
        const toplineResults = targetRace.toplineResults
        const precinctsReporting = toplineResults.precincts.reporting
        const precinctsTotal = toplineResults.precincts.total 
        console.log(toplineResults)
        // randomly increase the precincts reporting by 0 - 13%
        const precinctsDelta = 
            Math.max(Math.round(Math.random() * .13 * settings.vote_rate * precinctsReporting), 24)
        toplineResults.precincts.reporting = 
            Math.min(precinctsReporting + precinctsDelta, precinctsTotal)
    
        // randomly increase the votes for each candidate by 0 - 13%    
            // could be smarter later and do a distribution 
        Object.keys(toplineResults.votes).forEach( candidateId => {
            let delta = Math.max(
                Math.round(
                    Math.random() * .13 * settings.vote_rate * toplineResults.votes[candidateId]
                ),
                24
            )
            toplineResults.votes[candidateId] += delta
        })
        console.log(toplineResults)
        // if more than 85% of precincts are reporting, call it for the     
            // candidate with the highest # of votes
        if (toplineResults.precincts.reporting / toplineResults.precincts.total > .85) {
            
            // find candidate with max votes
            let maxVotes = 0
            let winningCandidate = null 
            Object.keys(toplineResults.votes).forEach( candId => {
                if (toplineResults.votes[candId] > maxVotes) {
                    winningCandidate = candId
                    maxVotes = toplineResults.votes[candId]
                }
            })
            toplineResults.called = winningCandidate
            toplineResults.called_time = new Date().toString()
        }
        fs.writeFileSync(targetFile,JSON.stringify(contents))
    }

    pause() {
        clearTimeout(this.timeout)
    }

    reset() {
        this.stop()
        this.start()
    }
    
    start(settings) {
        settings.vote_rate = settings.vote_rate || 1
        settings.speed = settings.speed || 1
        console.log('settings in start ', settings)
        const tick = () => {
            this.editOnePrecinct(settings)
            this.timeout = setTimeout(tick, Math.random() * 30 * 1000 / settings.speed)
        }
        tick()
    }

    stop() {
        clearTimeout(this.timeout)
        exec('cp -r ./files/base ./files/api')
    }
}

module.exports = Simulator