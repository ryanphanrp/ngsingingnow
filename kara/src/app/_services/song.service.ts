import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {delay} from 'rxjs/operators';
import {ISong} from '../_shared/interface/song';

const API = 'http://localhost:5000/api/songs';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) {
  }

  getSongs(): Observable<any> {
    return this.http.get<any>(API, httpOptions).pipe(delay(50));
  }

  getSingleSong(id: string): Observable<ISong> {
    return this.http.get<ISong>(API + '/' + id, httpOptions).pipe(delay(50));
  }

  getRandomSong(): Observable<ISong> {
    return this.http.get<ISong>(API + '/random', httpOptions).pipe(delay(50));
  }

  createSong(payload): Observable<any> {
    return this.http.post(API, {
      title: payload.title,
      artist: payload.artist,
      emotion: payload.emotion,
      lyric: payload.lyric
    }, httpOptions).pipe(delay(50));
  }

  updateSong(id: string, payload): Observable<any> {
    return this.http.put(API + '/' + id, {
      title: payload.title,
      artist: payload.artist,
      emotion: payload.emotion,
      lyric: payload.lyric
    }, httpOptions).pipe(delay(50));
  }

  deleteSong(id: string): Observable<any> {
    return this.http.delete(API + '/' + id, httpOptions).pipe(delay(50));
  }

}
