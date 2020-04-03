
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
// Local
import { Common } from '../../common/common';
import { CommunicationService, IUser, IAlbum } from '../../services/communication.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent extends Common implements OnInit {

  selectedUser: IUser | undefined;
  userAlbums: IAlbum[] = [];
  selectedAlbumIds: SelectionModel<number> = new SelectionModel<number>(true);
  private _selectAll: boolean = false;

  constructor(private communicationService: CommunicationService) {
    super();
  }

  set selectAll(value: boolean) {
    const albumids: number[] = this.userAlbums.map((itm) => itm.id);
    if (value) {
      this.selectedAlbumIds.select(...albumids);
    } else {
      this.selectedAlbumIds.deselect(...albumids);
    }
    this._selectAll = value;
  }

  get selectAll() {
    let selectedAll: boolean = true;
    for (const album of this.userAlbums) {
      if (!this.selectedAlbumIds.isSelected(album.id)) {
        selectedAll = false;
      }
    }
    return this.userAlbums.length ? selectedAll : this._selectAll;
  }

  ngOnInit(): void {
    this.communicationService.selectedUser$.subscribe(async (user) => {
      try {
        this.selectedUser = user;
        if (user) {
          this.setIsLoading();
          const response: HttpResponse<IAlbum[]> = await this.communicationService.getUserAlbums(user.id);
          if (response.status <= 300) {
            this.userAlbums = response.body;
            window.clearTimeout(this.loadingTimeout);
            this.isProcessing = false;
          }
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

}
