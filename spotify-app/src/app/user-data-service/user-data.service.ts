import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Playlist } from './playlist.model';
import { Track } from './track.model';
import { environment } from 'src/environments/environment';
import { filter, take, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private clientId: string = environment.clientId;
  private clientSecret: string = environment.clientSecret;
  private $accessToken = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) { }

  getAuth = () => {
    let headers = new HttpHeaders()
    .append('Authorization', 'Basic ' + btoa(this.clientId + ":" + this.clientSecret))
    .append('Content-Type', 'application/x-www-form-urlencoded');
    let params: URLSearchParams = new URLSearchParams();
    params.set('grant_type', 'client_credentials');
    let body = params.toString();
    return this.http.post('https://accounts.spotify.com/api/token', body, { headers }).subscribe(
      response => this.$accessToken.next(response['access_token']));
  }
  
  getUserDataById(id: string): Observable<User> {
    return this.$accessToken.asObservable().pipe(
      filter(a => !!a),
      take(1),
      switchMap(accTok => {
          const headers = new HttpHeaders()
          .append('Authorization', 'Bearer ' + accTok);
          return this.http.get<User>(`${environment.apiBaseUrl}/users/${id}`, { headers });
        }
      )
    )
  }

  getUserPlaylistsById(id: string): Observable<Playlist[]> {
    return this.$accessToken.asObservable().pipe(
      filter(a => !!a),
      switchMap(accTok => {
        const headers = new HttpHeaders().append('Authorization', 'Bearer ' + accTok);
        return this.http.get<any>(`${environment.apiBaseUrl}/users/${id}/playlists`,
          { headers }).pipe(map(playlists => playlists.items));
      }
      )
    );
  }

  getUserPlaylistByIndex(id: string, index: number): Observable<Playlist> {
    return this.getUserPlaylistsById(id).pipe(map(playlists => playlists[index]));
  }

  getPlaylistTracksByIndex(userId: string, index: number): Observable<Track[]> {
    let playlistId: string;
    this.getUserPlaylistByIndex(userId, index).subscribe(playlist => playlistId = playlist.id);    
    return this.$accessToken.asObservable().pipe(
      filter(a => !!a),
      switchMap(accTok => {
        const headers = new HttpHeaders().append('Authorization', 'Bearer ' + accTok);
        return this.http.get<any>(`${environment.apiBaseUrl}/playlists/${playlistId}/tracks`,
          { headers }).pipe(map(tracks => tracks.items));
      }
      )
    );
  }

  getPlaylistTracksById(id: string): Observable<Track[]> {
    return this.$accessToken.asObservable().pipe(
      filter(a => !!a),
      switchMap(accTok => {
        const headers = new HttpHeaders().append('Authorization', 'Bearer ' + accTok);
        return this.http.get<any>(`${environment.apiBaseUrl}/playlists/${id}/tracks`,
          { headers }).pipe(map(tracks => tracks.items));
      }
      )
    );
  }
}
