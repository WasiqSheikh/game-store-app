import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FootballService {

  constructor(private http: HttpClient) { }

  async GetFootballLeaguesNames() {
    return this.http.get(environment.sportsApi.baseUrl + '/api/v2/json/3/all/leagues')
  }

  async getLogoForLeague(id: string) {
    return this.http.get(environment.sportsApi.baseUrl + `/api/v1/json/3/lookupleague.php?id=4346`)
  }

  async getUpcomingMatchesSchedule(id: string) {
    return this.http.get(environment.sportsApi.baseUrl + `/api/v2/json/3/schedual/league/${id}/2024-2025`)
  }

  async getEventDetails(id: string) {
    return this.http.get(environment.sportsApi.baseUrl + `/api/v1/json/3/lookupevent.php?id=${id}`)
  }
}
