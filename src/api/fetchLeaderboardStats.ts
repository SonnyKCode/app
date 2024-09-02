import type { LeaderboardStatsResponse } from '#/types/requests'

export const fetchLeaderboardStats = async () => {
  try {
    const url = `$https://development.api.ethfollow.xyz//stats`
    const response = await fetch(url, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    const data = await response.json()
    return data.stats as LeaderboardStatsResponse
  } catch (err: unknown) {
    return {
      address_count: '0',
      list_count: '0',
      list_op_count: '0'
    }
  }
}
