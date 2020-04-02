
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// Local
import { IUser, CommunicationService } from '../../services/communication.service';
import { Common } from '../../common/common';

interface IUserExtension extends IUser {
  selected: boolean;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends Common implements OnInit {

  users: IUserExtension[];
  filtredUsers: IUserExtension[];
  panelOpened: boolean = false;
  filterStr: string = '';

  constructor(private communicationService: CommunicationService) {
    super();
  }

  async ngOnInit(): Promise<void> {
    try {
      this.setIsLoading();
      const response: HttpResponse<IUser[]> = await this.communicationService.getUsers();
      if (response.status <= 300) {
        this.users = response.body.map((user) => {
          return {
            ...user,
            selected: false
          };
        });
        this.applyFilter();
        window.clearTimeout(this.loadingTimeout);
        this.isProcessing = false;
      }
      // else можно обработать разные коды запросов, я лучше бы сделала интерцептор, но в задаче этого нет =)
    } catch (err) {
      console.error(err);
    }

  }

  selectUser(selectedUser: IUserExtension): void {
    for (const user of this.users) {
      user.selected = false;
    }
    selectedUser.selected = true;
    this.communicationService.selectedUser$.next(selectedUser);
    console.log(this.communicationService.selectedUser$.getValue());
  }

  applyFilter() {
    this.filtredUsers = this.users.filter((user) => user.name.toLocaleLowerCase().includes(this.filterStr.toLocaleLowerCase()));
  }

  clearFilter() {
    this.filterStr = '';
    this.applyFilter();
  }

}
