import { useState } from 'react'
import { getLineupStats } from '../utils/teamStats'

function randomInt(max) {
  return Math.floor(Math.random() * (max + 1))
}

// The higher average rating always wins; a bigger gap means a bigger margin.
function simulateMatch(averageA, averageB) {
  const gap = Math.abs(averageA - averageB)
  const loserGoals = randomInt(2)

  if (gap === 0) return { goalsA: loserGoals, goalsB: loserGoals }

  const winnerGoals = loserGoals + Math.min(1 + Math.floor(gap / 4), 4)
  return averageA > averageB
    ? { goalsA: winnerGoals, goalsB: loserGoals }
    : { goalsA: loserGoals, goalsB: winnerGoals }
}

function MatchSimulator({ teams, squad }) {
  const [result, setResult] = useState(null)

  const team1 = teams.team1
  const team2 = teams.team2
  const stats1 = getLineupStats(squad, team1.formationKey, team1.assignments)
  const stats2 = getLineupStats(squad, team2.formationKey, team2.assignments)
  const canSimulate = stats1.isComplete && stats2.isComplete

  function handleSimulate() {
    setResult(simulateMatch(stats1.averageRating, stats2.averageRating))
  }

  let headline = null
  if (result) {
    if (result.goalsA === result.goalsB) headline = "It's a draw!"
    else headline = `${result.goalsA > result.goalsB ? team1.label : team2.label} wins!`
  }

  return (
    <section className="match-sim" aria-labelledby="match-sim-title">
      <h2 id="match-sim-title" className="panel-title">Simulate Match</h2>

      <div className="match-sim__board">
        <div className="match-sim__team">
          <span className="match-sim__team-name">{team1.label}</span>
          <span className="match-sim__team-avg">
            Avg {stats1.averageRating ? stats1.averageRating.toFixed(1) : '—'}
          </span>
        </div>
        <div className="match-sim__score" aria-live="polite">
          {result ? `${result.goalsA} – ${result.goalsB}` : 'vs'}
        </div>
        <div className="match-sim__team">
          <span className="match-sim__team-name">{team2.label}</span>
          <span className="match-sim__team-avg">
            Avg {stats2.averageRating ? stats2.averageRating.toFixed(1) : '—'}
          </span>
        </div>
      </div>

      {headline && <p className="match-sim__headline">{headline}</p>}

      <button
        type="button"
        className="btn btn--primary match-sim__button"
        disabled={!canSimulate}
        onClick={handleSimulate}
      >
        {result ? 'Play again' : 'Kick off'}
      </button>

      {!canSimulate && (
        <p className="match-sim__hint">Fill every slot in both lineups to play a match.</p>
      )}
    </section>
  )
}

export default MatchSimulator
