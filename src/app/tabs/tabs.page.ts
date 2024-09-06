import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    //this.getAllGamesData();
  }

  // async getAllGamesData() {
  //   const data$ = await this.http.get('https://www.thesportsdb.com/api/v2/json/3/livescore/Soccer');
  //   console.log('data = ', await lastValueFrom(data$));
  // }

}
