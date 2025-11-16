import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import * as ZonesRepo from '@zones/infrastructure/zones_repository'
import { Zone } from '@zones/domain/entity/zone'
import type { APIResponse } from '@/shared/domain/api/types/response.types'
import type { ApiZonesResponseItem } from '@zones/infrastructure/types/zones.types'

vi.mock('axios')
vi.mock('@shared/config', () => ({
  API_URL: 'http://test-api.com'
}))

describe('ZonesRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('get', () => {
    it('should fetch and transform zones correctly', async () => {
      const mockApiResponse: APIResponse<ApiZonesResponseItem> = {
        data: [
          {
            zone_1: {
              zone_id: 1,
              name: 'Zone 1'
            }
          },
          {
            zone_2: {
              zone_id: 2,
              name: 'Zone 2'
            }
          }
        ]
      }

      vi.mocked(axios.get).mockResolvedValue({ data: mockApiResponse })

      const result = await ZonesRepo.get()

      expect(axios.get).toHaveBeenCalledWith('http://test-api.com/zones')
      expect(result).toHaveLength(2)
      expect(result[0]).toBeInstanceOf(Zone)
      expect(result[1]).toBeInstanceOf(Zone)
    })

    it('should handle an empty array of zones', async () => {
      const mockApiResponse: APIResponse<ApiZonesResponseItem> = {
        data: []
      }

      vi.mocked(axios.get).mockResolvedValue({ data: mockApiResponse })

      const result = await ZonesRepo.get()

      expect(result).toHaveLength(0)
    })

    it('should propagate the error when axios fails', async () => {
      const mockError = new Error('Network error')
      vi.mocked(axios.get).mockRejectedValue(mockError)

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => { })

      await expect(ZonesRepo.get()).rejects.toThrow('Network error')
      expect(consoleLogSpy).toHaveBeenCalledWith(mockError)

      consoleLogSpy.mockRestore()
    })

    it('should process multiple zones in nested objects', async () => {
      const mockApiResponse: APIResponse<ApiZonesResponseItem> = {
        data: [
          {
            zone_1: {
              zone_id: 1,
              name: 'Zone 1'
            },
            zone_2: {
              zone_id: 2,
              name: 'Zone 2'
            }
          }
        ]
      }

      vi.mocked(axios.get).mockResolvedValue({ data: mockApiResponse })

      const result = await ZonesRepo.get()

      expect(result).toHaveLength(2)
      expect(result[0]).toBeInstanceOf(Zone)
      expect(result[1]).toBeInstanceOf(Zone)
    })
  })
})
