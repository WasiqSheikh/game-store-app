import { lastValueFrom } from 'rxjs';
import { Component, inject } from '@angular/core';
import { FootballService } from '../services/football.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  getAllLeagues: any;
  leagueDetails: any = {};
  selectedLeague: any = {};
  isLeagueData: boolean = false;
  upcomingMatches: any;
  private footballService = inject(FootballService);
  constructor(private route: Router, private activatedRoute: ActivatedRoute, private navController: NavController) { }

  ngOnInit(): void {
    this.getFootballLeaguesNames().then(data => {
      let allData: any;
      allData = data;
      this.getAllLeagues = allData.leagues.filter((league: any) => {
        return league.strSport === 'Soccer';
      });

      this.selectedLeague = this.getAllLeagues[0];
      this.getLogoForLeague(this.selectedLeague.idLeague).then(data => {
        this.leagueDetails = data

      })

      this.getUpcomingMatchesSchedule(this.selectedLeague.idLeague).then(data => {
        this.upcomingMatches = Object.values(data);
        console.log('this.upcomingMatches = ', this.upcomingMatches);
        this.isLeagueData = true;
      })
    });

  }

  async getFootballLeaguesNames() {
    let data$ = await this.footballService.GetFootballLeaguesNames();
    return (await lastValueFrom(data$));
    // console.log('data = ', await lastValueFrom(data$));
  }

  async getLogoForLeague(id: string) {
    let data$ = await this.footballService.getLogoForLeague(id);
    return (await lastValueFrom(data$));
  }

  async getUpcomingMatchesSchedule(id: string) {
    let data$ = await this.footballService.getUpcomingMatchesSchedule(id);
    return (await lastValueFrom(data$));
  }

  compareWith(o1: any, o2: any) {
    return o1 && o2 ? o1.idLeague === o2.idLeague : o1 === o2;
  }

  handleChange(ev: any) {
    this.getLogoForLeague(this.selectedLeague.idLeague).then(data => {
      this.leagueDetails = data
    })

    this.getUpcomingMatchesSchedule(this.selectedLeague.idLeague).then(data => {
      console.log('data = ', data);
      this.upcomingMatches = Object.values(data);
      console.log('this.upcomingMatches = ', this.upcomingMatches);
    });
  }

  getLocalTime(time: string) {
    return new Date(time).toLocaleTimeString(undefined, {hour: 'numeric', minute: 'numeric'});
  }

  NavigateToDetails(id: string) {
    console.log('id = ', id);
    //this.route.navigate(['details', id], {relativeTo: this.activatedRoute});
    this.navController.navigateForward(['/tabs/tab1/details', id]);
  }

}
