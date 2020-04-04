
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
    this.setIsLoading();
    this.communicationService.getUsers().subscribe((response: HttpResponse<IUser[]>) => {
      if (response.status <= 300) {
        this.users = response.body.map((user) => {
          return {
            ...user,
            selected: false
          };
        });
        this.applyFilter();
        // очистка таймаута
        window.clearTimeout(this.loadingTimeout);
        this.isProcessing = false;
      }
    });
  }

  /**
   * Отправляет данные по выбранному пользователю в компонент Albums
   * @param selectedUser - выбранный пользователь
   */
  selectUser(selectedUser: IUserExtension): void {
    for (const user of this.users) {
      user.selected = false;
    }
    selectedUser.selected = true;
    this.communicationService.selectedUser$.next(selectedUser);
  }

  /**
   * Применяет поисковый фильтр на массив пользователей
   */
  applyFilter() {
    this.filtredUsers = this.users.filter((user) => user.name.toLocaleLowerCase().includes(this.filterStr.toLocaleLowerCase()));
  }

  /**
   * Сброс поискового фильтра
   */
  clearFilter() {
    this.filterStr = '';
    this.applyFilter();
  }

}
