export interface RouteData{
  status: string
  path: Array<[string, string]>
  total_distance: number
  total_time: number
  error: string
}
export interface Token { token: string }