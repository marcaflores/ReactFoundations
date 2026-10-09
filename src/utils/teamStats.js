import { FORMATIONS } from '../data/formations'

// Lineup stats for one team: how many slots are filled and the exact average rating.
export function getLineupStats(squad, formationKey, assignments) {
  const totalSlots = FORMATIONS[formationKey].slots.length
  const filledIds = Object.values(assignments).filter(Boolean)
  const players = squad.filter((player) => filledIds.includes(player.id))
  const averageRating = players.length
    ? players.reduce((sum, player) => sum + player.rating, 0) / players.length
    : 0

  return {
    filledSlots: filledIds.length,
    totalSlots,
    averageRating,
    isComplete: filledIds.length === totalSlots,
  }
}
