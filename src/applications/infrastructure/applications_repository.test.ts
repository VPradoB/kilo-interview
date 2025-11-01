import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import * as ApplicationsRepo from '@applications/infrastructure/applications_repository'
import { Application } from '@applications/domain/entity/application'
import type { APIPaginatedResponse } from '@/shared/api/types/pagination.types'
import type { ApplicationResponseItem } from '@applications/infrastructure/types/applications.types'

vi.mock('axios')
vi.mock('@shared/config', () => ({
  API_URL: 'http://test-api.com'
}))

describe('ApplicationsRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('get', () => {
    it('debería obtener y transformar las aplicaciones correctamente', async () => {
      const mockApiResponse: APIPaginatedResponse<ApplicationResponseItem> = {
        data: [
          {
            application_1: {
              application_id: 1,
              date1: '2024-01-01T00:00:00Z',
              date2: '2024-01-02T00:00:00Z',
              date3: '2024-01-03T00:00:00Z',
              zone1: 1,
              zone2: 2,
              zone3: 3,
              awarded: false,
              award_id: -1
            }
          },
          {
            application_2: {
              application_id: 2,
              date1: '2024-02-01T00:00:00Z',
              date2: '2024-02-02T00:00:00Z',
              date3: '2024-02-03T00:00:00Z',
              zone1: 4,
              zone2: 5,
              zone3: 6,
              awarded: true,
              award_id: 100
            }
          }
        ],
        pagination: {
          page: 1,
          limit: 10,
          offset: 0,
          total_pages: 1,
          total_records: 2,
          has_next: false,
          has_previous: false,
          next_page: '',
          previous_page: false
        }
      }

      vi.mocked(axios.get).mockResolvedValue({ data: mockApiResponse })

      const result = await ApplicationsRepo.get()

      expect(axios.get).toHaveBeenCalledWith('http://test-api.com/applications')
      expect(result.data).toHaveLength(2)
      expect(result.data[0]).toBeInstanceOf(Application)
      expect(result.data[1]).toBeInstanceOf(Application)
      expect(result.pagination).toEqual(mockApiResponse.pagination)
    })

    it('debería transformar award_id -1 a null', async () => {
      const mockApiResponse: APIPaginatedResponse<ApplicationResponseItem> = {
        data: [
          {
            application_1: {
              application_id: 1,
              date1: '2024-01-01T00:00:00Z',
              date2: '2024-01-02T00:00:00Z',
              date3: '2024-01-03T00:00:00Z',
              zone1: 1,
              zone2: 2,
              zone3: 3,
              awarded: false,
              award_id: -1
            }
          }
        ],
        pagination: {
          page: 1,
          limit: 10,
          offset: 0,
          total_pages: 1,
          total_records: 1,
          has_next: false,
          has_previous: false,
          next_page: '',
          previous_page: false
        }
      }

      vi.mocked(axios.get).mockResolvedValue({ data: mockApiResponse })
      const createSpy = vi.spyOn(Application, 'create')

      await ApplicationsRepo.get()

      expect(createSpy).toHaveBeenCalledWith(
        1,
        new Date('2024-01-01T00:00:00Z'),
        new Date('2024-01-02T00:00:00Z'),
        new Date('2024-01-03T00:00:00Z'),
        1,
        2,
        3,
        false,
        null
      )
    })

    it('debería mantener award_id cuando no es -1', async () => {
      const mockApiResponse: APIPaginatedResponse<ApplicationResponseItem> = {
        data: [
          {
            application_1: {
              application_id: 1,
              date1: '2024-01-01T00:00:00Z',
              date2: '2024-01-02T00:00:00Z',
              date3: '2024-01-03T00:00:00Z',
              zone1: 1,
              zone2: 2,
              zone3: 3,
              awarded: true,
              award_id: 100
            }
          }
        ],
        pagination: {
          page: 1,
          limit: 10,
          offset: 0,
          total_pages: 1,
          total_records: 1,
          has_next: false,
          has_previous: false,
          next_page: '',
          previous_page: false
        }
      }

      vi.mocked(axios.get).mockResolvedValue({ data: mockApiResponse })
      const createSpy = vi.spyOn(Application, 'create')

      await ApplicationsRepo.get()

      expect(createSpy).toHaveBeenCalledWith(
        1,
        new Date('2024-01-01T00:00:00Z'),
        new Date('2024-01-02T00:00:00Z'),
        new Date('2024-01-03T00:00:00Z'),
        1,
        2,
        3,
        true,
        100
      )
    })

    it('debería manejar un arreglo vacío de aplicaciones', async () => {
      const mockApiResponse: APIPaginatedResponse<ApplicationResponseItem> = {
        data: [],
        pagination: {
          page: 1,
          limit: 10,
          offset: 0,
          total_pages: 0,
          total_records: 0,
          has_next: false,
          has_previous: false,
          next_page: '',
          previous_page: false
        }
      }

      vi.mocked(axios.get).mockResolvedValue({ data: mockApiResponse })

      const result = await ApplicationsRepo.get()

      expect(result.data).toHaveLength(0)
      expect(result.pagination).toEqual(mockApiResponse.pagination)
    })

    it('debería propagar el error cuando axios falla', async () => {
      const mockError = new Error('Network error')
      vi.mocked(axios.get).mockRejectedValue(mockError)

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      await expect(ApplicationsRepo.get()).rejects.toThrow('Network error')
      expect(consoleLogSpy).toHaveBeenCalledWith(mockError)

      consoleLogSpy.mockRestore()
    })

    it('debería procesar múltiples aplicaciones en objetos anidados', async () => {
      const mockApiResponse: APIPaginatedResponse<ApplicationResponseItem> = {
        data: [
          {
            application_1: {
              application_id: 1,
              date1: '2024-01-01T00:00:00Z',
              date2: '2024-01-02T00:00:00Z',
              date3: '2024-01-03T00:00:00Z',
              zone1: 1,
              zone2: 2,
              zone3: 3,
              awarded: false,
              award_id: -1
            },
            application_2: {
              application_id: 2,
              date1: '2024-02-01T00:00:00Z',
              date2: '2024-02-02T00:00:00Z',
              date3: '2024-02-03T00:00:00Z',
              zone1: 4,
              zone2: 5,
              zone3: 6,
              awarded: true,
              award_id: 200
            }
          }
        ],
        pagination: {
          page: 1,
          limit: 10,
          offset: 0,
          total_pages: 1,
          total_records: 2,
          has_next: false,
          has_previous: false,
          next_page: '',
          previous_page: false
        }
      }

      vi.mocked(axios.get).mockResolvedValue({ data: mockApiResponse })

      const result = await ApplicationsRepo.get()

      expect(result.data).toHaveLength(2)
      expect(result.data[0]).toBeInstanceOf(Application)
      expect(result.data[1]).toBeInstanceOf(Application)
    })
  })
})
