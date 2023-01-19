import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Group } from 'src/app/interfaces/group';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.scss']
})
export class ConsumerComponent implements OnInit {

  @ViewChild('fEdit', { static: true }) form!: NgForm;

  constructor(private groupSrv: GroupService, private authSrv: AuthService, private router: Router) { }

  groups: Group[] = [];
  group!: Group
  cons!: any;
  groupsIDJoin!: any;
  logForm: any;

  ngOnInit(): void {
    this.readCons();
    this.getMyJoin();
  }

  readCons(){
    this.groupSrv.getMyData().subscribe((res) => {
      this.cons = res;
      this.logForm = {
        name: this.cons.name,
        surname: this.cons.surname,
        email: this.cons.email,
      }
      this.groupsIDJoin = this.cons.groupsID.forEach((groupID: any) => {
        this.groupSrv.getGroup(groupID).subscribe((res) => {
          this.group = res
          this.groups.push(this.group)
        })
      })
    }
    );
  }

  getMyJoin() {
    this.groupSrv.getMyGroup().subscribe((res) => {
      this.groups = res;
    })
  }

  change() {
    if (confirm("Sei sicuro di voler modificare i dati?")) {
      this.groupSrv.editUser(this.cons.id, this.form.value).subscribe((ris) => {
        this.cons = ris;
        alert('Modifica effettuata')
      })
    }
  }

  deleteUser(id: number){
    if (confirm("Sei sicuro di voler eliminare in modo permanente il tuo profilo?")) {
    this.groupSrv.deleteUser(this.cons.id).subscribe(
    )
    localStorage.removeItem('user')
    localStorage.removeItem('userID')
    this.router.navigate(["/"])
  }}
}

