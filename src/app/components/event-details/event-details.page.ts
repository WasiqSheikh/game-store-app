import { Component, input, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FootballService } from 'src/app/services/football.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  id = input.required<string>();
  constructor(private footballService: FootballService) { }

  ngOnInit() {
    console.log('this.id = ', this.id());
    this.getEventDetails(this.id()).then(data => {
      console.log('Event data = ', data);
    });
  }

  async getEventDetails(id: string) {
    let data$ = await this.footballService.getEventDetails(id);
    return (await lastValueFrom(data$));
  }
}
