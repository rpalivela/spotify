import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/user-data-service/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserDataService]
})
export class AppComponent implements OnInit {
  title = 'spotify-app';

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.userDataService.getAuth();
  }
}
