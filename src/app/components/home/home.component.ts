import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/interfaces/group';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  groups: Group[] = [];
  searchText: any;


  constructor(private http: HttpClient, private groupSrv: GroupService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.groupSrv.getGroups().subscribe((res) => {
      this.groups = res;
    })
  }

}
