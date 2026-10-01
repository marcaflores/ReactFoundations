import { useState } from 'react'
import Header from './components/Header'
import PresetPlayers from './components/PresetPlayers'
import PlayerForm from './components/PlayerForm'
import PlayerList from './components/PlayerList'
import FormationPicker from './components/FormationPicker'
import Pitch from './components/Pitch'
import TeamSummary from './components/TeamSummary'
import './App.css'

function App() {
  const [squad, setSquad] = useState([])
  const [formationKey, setFormationKey] = useState('4-3-3')
  const [assignments, setAssignments] = useState({})

  function handleAddPlayer(player) {
    setSquad((prev) => [...prev, player])
  }

  function handleRemovePlayer(playerId) {
    setSquad((prev) => prev.filter((player) => player.id !== playerId))
    setAssignments((prev) => {
      const next = { ...prev }
      for (const slotId of Object.keys(next)) {
        if (next[slotId] === playerId) delete next[slotId]
      }
      return next
    })
  }

  function handleFormationChange(nextFormationKey) {
    setFormationKey(nextFormationKey)
    setAssignments({})
  }

  function handleAssign(slotId, playerId) {
    setAssignments((prev) => {
      const next = { ...prev }
      if (!playerId) {
        delete next[slotId]
      } else {
        next[slotId] = playerId
      }
      return next
    })
  }

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
          <FormationPicker formationKey={formationKey} onChange={handleFormationChange} />
          <Pitch
            formationKey={formationKey}
            squad={squad}
            assignments={assignments}
            onAssign={handleAssign}
          />
          <TeamSummary squad={squad} formationKey={formationKey} assignments={assignments} />
        </section>
      </main>
    </div>
  )
}

export default App
