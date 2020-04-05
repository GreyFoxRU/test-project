import { CommunicationService, IUser, IAlbum } from './communication.service';
import { of } from 'rxjs/internal/observable/of';
import { flush, fakeAsync } from '@angular/core/testing';

describe('CommunicationService', () => {

  let communicationService: CommunicationService;
  let mockHttp;

  const mockUsers: IUser[] = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496'
        }
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets'
      }
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
      address: {
        street: 'Victor Plains',
        suite: 'Suite 879',
        city: 'Wisokyburgh',
        zipcode: '90566-7771',
        geo: {
          lat: '-43.9509',
          lng: '-34.4618'
        }
      },
      phone: '010-692-6593 x09125',
      website: 'anastasia.net',
      company: {
        name: 'Deckow-Crist',
        catchPhrase: 'Proactive didactic contingency',
        bs: 'synergize scalable supply-chains'
      }
    }
  ];

  const mockFirstUserAlbums: IAlbum[] = [
    {
      id: 1,
      title: 'test-1',
      userId: 1
    },
    {
      id: 2,
      title: 'test-2',
      userId: 1
    },
    {
      id: 3,
      title: 'test-3',
      userId: 1
    }
  ];

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['get']);
    communicationService = new CommunicationService(mockHttp);
  });

  describe('getUsers', () => {
    it('should get users', fakeAsync(() => {
      mockHttp.get.and.returnValue(of({ status: 200, body: mockUsers }));
      communicationService.getUsers().subscribe((response) => {
        expect(response.body.length).toEqual(2);
      });
      flush();
    }));
  });

  describe('getUserAlbums', () => {
    it('should get user albums', fakeAsync(() => {
      mockHttp.get.and.returnValue(of({ status: 200, body: mockFirstUserAlbums }));
      communicationService.getUserAlbums(1).subscribe((response) => {
        expect(response.body.length).toEqual(3);
      });
      flush();
    }));
  });

});
