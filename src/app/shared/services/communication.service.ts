
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

interface IAdress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  }
}

interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAdress,
  phone: string;
  website: string;
  company: ICompany;
}

export interface IAlbum {
  id: number;
  userId: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  apiURL: string = 'http://jsonplaceholder.typicode.com/';
  selectedUser$: BehaviorSubject<IUser | undefined> = new BehaviorSubject<IUser>(undefined); 

  constructor(private http: HttpClient) { }

  private get<T>(urlPart?: string): Observable<HttpResponse<T>> {
    let url: string = this.apiURL;
    if (urlPart) {
      url += urlPart;
    }
    return this.http.get<T>(url, { observe: 'response' });
  }

  async getUsers(): Promise<HttpResponse<IUser[]>> {
    return this.get<IUser[]>('users')
      .toPromise();
  }

  async getUserAlbums(userId: number): Promise<HttpResponse<IAlbum[]>> {
    return this.get<IAlbum[]>(`albums?userId=${userId}`)
      .toPromise();
  }
}
