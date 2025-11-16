import { Zone } from "../domain/entity/zone"
import { API_URL } from "@/shared/config"
import axios from "axios"
import type { ApiZonesResponseItem } from "@zones/infrastructure/types/zones.types"
import type { APIResponse } from "@/shared/domain/api/types/response.types"
import type { IRepository } from "@/shared/domain/repository"

export class ZoneRepository implements IRepository<Zone> {
  public constructor() { };

  public async get(): Promise<Zone[] | []> {
    try {
      const response = await axios.get<APIResponse<ApiZonesResponseItem>>(`${API_URL}/zones`)
      const data = Object.values(response.data.data).flatMap(obj => Object.values(obj))
      return data.map((obj => {
        return Zone.create(
          obj.zone_id,
          obj.name
        )
      }))
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

