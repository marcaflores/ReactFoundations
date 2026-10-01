import PitchSlot from './PitchSlot'
import { FORMATIONS } from '../data/formations'

function Pitch({ formationKey, squad, assignments, otherTeamAssignments, onAssign }) {
  const formation = FORMATIONS[formationKey]
  const assignedIds = new Set(Object.values(assignments))
  const otherTeamIds = new Set(Object.values(otherTeamAssignments ?? {}))
  const playersById = new Map(squad.map((player) => [player.id, player]))

  return (
    <div className="pitch">
      <div className="pitch__stripes" aria-hidden="true" />
      {formation.slots.map((slot) => {
        const assignedPlayerId = assignments[slot.id]
        const assignedPlayer = assignedPlayerId ? playersById.get(assignedPlayerId) : null
        const availablePlayers = squad.filter(
          (player) => !assignedIds.has(player.id) && !otherTeamIds.has(player.id),
        )

        return (
          <PitchSlot
            key={slot.id}
            slot={slot}
            assignedPlayer={assignedPlayer}
            availablePlayers={availablePlayers}
            onAssign={onAssign}
          />
        )
      })}
    </div>
  )
}

export default Pitch
