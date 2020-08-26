import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../user-data-service/user-data.service';
import { Playlist } from '../user-data-service/playlist.model';
import { Observable } from 'rxjs';
import { Track } from '../user-data-service/track.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.css']
})
export class PlaylistDetailsComponent implements OnInit {
  userId: string;
  playlistId: string;
  userPlaylist$: Observable<Playlist>;
  playlistTracks$: Observable<Track[]>;

  constructor(public activatedRoute: ActivatedRoute, 
              private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['name'];
        this.playlistId = params['playlistId'];
      }
    );
    this.userPlaylist$ = this.userDataService.getUserPlaylistsById(this.userId).pipe(
      map(playlists => {
        for (let playlist of playlists) {
          if (playlist.id === this.playlistId) {
            return playlist;
          }
        }
      })
    );
    this.playlistTracks$ = this.userDataService.getPlaylistTracksById(this.playlistId);
  }

}
