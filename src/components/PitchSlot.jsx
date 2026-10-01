function PitchSlot({ slot, assignedPlayer, availablePlayers, onAssign }) {
  const options = assignedPlayer ? [assignedPlayer, ...availablePlayers] : availablePlayers

  return (
    <div className="pitch-slot" style={{ left: `${slot.x}%`, top: `${slot.y}%` }}>
      {assignedPlayer ? (
        <div className={`pitch-slot__chip position-badge--${assignedPlayer.position}`}>
          <span className="pitch-slot__name">{assignedPlayer.name}</span>
          <span className="pitch-slot__rating">{assignedPlayer.rating}</span>
        </div>
      ) : (
        <div className="pitch-slot__chip pitch-slot__chip--empty">
          <span className="pitch-slot__role">{slot.title}</span>
        </div>
      )}
      <select
        className="pitch-slot__select"
        aria-label={`Assign player to ${slot.title}`}
        value={assignedPlayer ? assignedPlayer.id : ''}
        onChange={(event) => onAssign(slot.id, event.target.value)}
      >
        <option value="">{slot.title} — empty</option>
        {options.map((player) => (
          <option key={player.id} value={player.id}>
            {player.name} ({player.position})
          </option>
        ))}
      </select>
    </div>
  )
}

export default PitchSlot
