import type { PaginatedResponse } from "@/shared/domain/api/types/pagination.types";
import type { Application } from "./entity/application";

export interface GetParams {
  zone: number;
  is_awarded: boolean;
  page: number;
  limit: number;
  date: Date
}

export interface IApplicationRepository {
  get(params: GetParams): Promise<PaginatedResponse<Application> | Application[]>

}
