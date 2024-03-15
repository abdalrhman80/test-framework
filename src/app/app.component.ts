import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Personal-Dashboard';
  dateNow: number = Date.now();

  ngOnInit(): void {
    setInterval(() => this.dateNow = Date.now())
  }
}
