import type { ApplicationResponseItem } from "@applications/infrastructure/types/applications.types"
import type { APIPaginatedResponse, PaginatedResponse } from "@/shared/api/types/pagination.types"
import axios from "axios"

import { API_URL } from "@shared/config"
import { Application } from "@applications/domain/entity/application"

interface GetParams {
  zone: number;
  is_awarded: boolean;
  page: number;
  limit: number;
  date: Date

}
export const get = async (params: GetParams): Promise<PaginatedResponse<Application>> => {
  try {
    const response = await axios.get<APIPaginatedResponse<ApplicationResponseItem>>(`${API_URL}/applications`, { params: params })
    const data = Object.values(response.data.data).flatMap(obj => Object.values(obj))
    const applicactions = data.map(obj => {
      return Application.create(
        obj.application_id,
        new Date(obj.date1),
        new Date(obj.date2),
        new Date(obj.date3),
        obj.zone1,
        obj.zone2,
        obj.zone3,
        obj.awarded,
        obj.award_id === -1 ? null : obj.award_id
      )
    })
    return {
      data: applicactions,
      pagination: response.data.pagination
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

