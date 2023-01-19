import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Group } from 'src/app/interfaces/group';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {

  group!: Group;
  userID!: any;

  @ViewChild('form', { static: true }) form!: NgForm;

  constructor(private groupSrv: GroupService, private authSrv: AuthService) {
   }

  ngOnInit(): void {
  }

  onsubmit(){
    if (confirm("Sei sicuro di voler creare il gruppo?")) {
    this.groupSrv.addGroup(this.form.value).subscribe((res) => {
      this.group = res;
    })
    this.form.reset();
  }
  }
}
