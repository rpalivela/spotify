import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { UserDataService } from 'src/app/user-data-service/user-data.service';
import { User } from '../user-data-service/user.model';
import { Playlist } from '../user-data-service/playlist.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId: string;
  userData$: Observable<User>;
  userPlaylists$: Observable<Playlist[]>;  

  constructor(public activatedRoute: ActivatedRoute,
    private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['name'];
      }
    );
    this.userData$ = this.userDataService.getUserDataById(this.userId);
    this.userPlaylists$ = this.userDataService.getUserPlaylistsById(this.userId);    
  }

}
