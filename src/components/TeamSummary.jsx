import { getLineupStats } from '../utils/teamStats'

function TeamSummary({ squad, formationKey, assignments }) {
  const stats = getLineupStats(squad, formationKey, assignments)
  const { filledSlots, totalSlots, isComplete } = stats
  const averageRating = Math.round(stats.averageRating)

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
