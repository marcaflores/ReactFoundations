import { useState } from 'react'
import Header from './components/Header'
import PresetPlayers from './components/PresetPlayers'
import PlayerForm from './components/PlayerForm'
import PlayerList from './components/PlayerList'
import TeamSelector from './components/TeamSelector'
import TeamPanel from './components/TeamPanel'
import './App.css'

const INITIAL_TEAMS = {
  team1: { label: 'Team 1', formationKey: '4-3-3', assignments: {} },
  team2: { label: 'Team 2', formationKey: '4-4-2', assignments: {} },
}

function App() {
  const [squad, setSquad] = useState([])
  const [teams, setTeams] = useState(INITIAL_TEAMS)
  const [viewMode, setViewMode] = useState('team1')

  function handleAddPlayer(player) {
    setSquad((prev) => [...prev, player])
  }

  function handleRemovePlayer(playerId) {
    setSquad((prev) => prev.filter((player) => player.id !== playerId))
    setTeams((prev) => {
      const next = {}
      for (const [teamId, team] of Object.entries(prev)) {
        const assignments = { ...team.assignments }
        for (const slotId of Object.keys(assignments)) {
          if (assignments[slotId] === playerId) delete assignments[slotId]
        }
        next[teamId] = { ...team, assignments }
      }
      return next
    })
  }

  function handleFormationChange(teamId, nextFormationKey) {
    setTeams((prev) => ({
      ...prev,
      [teamId]: { ...prev[teamId], formationKey: nextFormationKey, assignments: {} },
    }))
  }

  function handleAssign(teamId, slotId, playerId) {
    setTeams((prev) => {
      const assignments = { ...prev[teamId].assignments }
      if (!playerId) {
        delete assignments[slotId]
      } else {
        assignments[slotId] = playerId
      }
      return { ...prev, [teamId]: { ...prev[teamId], assignments } }
    })
  }

  const otherTeamId = { team1: 'team2', team2: 'team1' }

  return (
    <div className="app">
      <Header squadSize={squad.length} />

      <main className="app-layout">
        <section className="app-layout__sidebar">
          <PresetPlayers squad={squad} onAddPlayer={handleAddPlayer} />
          <PlayerForm onAddPlayer={handleAddPlayer} />
          <PlayerList players={squad} onRemovePlayer={handleRemovePlayer} />
        </section>

        <section className="app-layout__main">
          <TeamSelector viewMode={viewMode} onChange={setViewMode} />

          {viewMode === 'both' ? (
            <div className="teams-grid">
              {['team1', 'team2'].map((teamId) => (
                <TeamPanel
                  key={teamId}
                  teamId={teamId}
                  team={teams[teamId]}
                  squad={squad}
                  otherTeamAssignments={teams[otherTeamId[teamId]].assignments}
                  onFormationChange={handleFormationChange}
                  onAssign={handleAssign}
                />
              ))}
            </div>
          ) : (
            <TeamPanel
              teamId={viewMode}
              team={teams[viewMode]}
              squad={squad}
              otherTeamAssignments={teams[otherTeamId[viewMode]].assignments}
              onFormationChange={handleFormationChange}
              onAssign={handleAssign}
            />
          )}
        </section>
      </main>
    </div>
  )
}

export default App
