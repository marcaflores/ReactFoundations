import { FORMATIONS } from '../data/formations'

function TeamSummary({ squad, formationKey, assignments }) {
  const formation = FORMATIONS[formationKey]
  const totalSlots = formation.slots.length
  const filledIds = Object.values(assignments).filter(Boolean)
  const filledSlots = filledIds.length

  const assignedPlayers = squad.filter((player) => filledIds.includes(player.id))
  const averageRating = assignedPlayers.length
    ? Math.round(
        assignedPlayers.reduce((sum, player) => sum + player.rating, 0) / assignedPlayers.length,
      )
    : 0

  const isComplete = filledSlots === totalSlots

  return (
    <div className="team-summary">
      <div className="team-summary__stat">
        <span className="team-summary__value">{filledSlots}/{totalSlots}</span>
        <span className="team-summary__label">Lineup filled</span>
      </div>
      <div className="team-summary__stat">
        <span className="team-summary__value">{averageRating || '—'}</span>
        <span className="team-summary__label">Avg. rating</span>
      </div>
      <div className="team-summary__stat">
        <span className="team-summary__value">{squad.length}</span>
        <span className="team-summary__label">Squad size</span>
      </div>

      {squad.length === 0 ? (
        <p className="team-summary__badge team-summary__badge--idle">Build your squad to get started</p>
      ) : isComplete ? (
        <p className="team-summary__badge team-summary__badge--ready">Lineup ready for kickoff ✓</p>
      ) : (
        <p className="team-summary__badge team-summary__badge--warning">
          {totalSlots - filledSlots} slot{totalSlots - filledSlots === 1 ? '' : 's'} still need a player
        </p>
      )}
    </div>
  )
}

export default TeamSummary
