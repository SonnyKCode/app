import { isAddress, type Address } from 'viem'
import type { ProfileDetailsResponse } from '#/types/requests'
import { resolveEnsAddress, resolveEnsProfile } from '#/utils/ens'

export const fetchProfileDetails = async (addressOrName: string, list?: number | string) => {
  try {
    const url =
      list !== undefined
        ? `$https://development.api.ethfollow.xyz//lists/${list}/details`
        : `$https://development.api.ethfollow.xyz//users/${addressOrName}/details`
    const response = await fetch(url, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    const data = (await response.json()) as ProfileDetailsResponse
    return data
  } catch (err: unknown) {
    if (typeof list === 'number') return null

    const address = isAddress(addressOrName)
      ? addressOrName
      : await resolveEnsAddress(`${addressOrName.replace('.eth', '')}.eth`)
    const data = await resolveEnsProfile(address)

    if (data?.name && data?.avatar)
      return {
        address: address as Address,
        ens: data
      } as ProfileDetailsResponse

    return {
      address: address as Address,
      ens: { address: address as Address },
      ranks: {
        mutuals_rank: 0,
        followers_rank: 0,
        following_rank: 0,
        blocks_rank: 0
      }
    } as ProfileDetailsResponse
  }
}
