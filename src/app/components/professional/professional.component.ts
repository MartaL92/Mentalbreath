import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Signup } from 'src/app/auth/auth';
import { AuthService } from 'src/app/auth/auth.service';
import { Group } from 'src/app/interfaces/group';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class ProfessionalComponent implements OnInit {

  @ViewChild('fEdit', { static: true }) form!: NgForm;

  constructor(private groupSrv: GroupService, private authSrv: AuthService, private router: Router) { }

  groups: Group[] = [];
  prof!: any;
  logForm: any;

  ngOnInit(): void {
    this.leggiProf();
    this.getMyGroups();
  }

  leggiProf(){
    this.groupSrv.getMyData().subscribe((res) => {
      this.prof = res;
      this.logForm = {
        name: this.prof.name,
        surname: this.prof.surname,
        email: this.prof.email,
        description: this.prof.description
      }
    }
    );
  }

  getMyGroups() {
    this.groupSrv.getMyGroup().subscribe((res) => {
      this.groups = res;
    })
  }

  delete(id:number, index:number){
    if(confirm("Sei sicuro di voler cancellare il gruppo?")) {
      this.groupSrv.deleteGroup(id).subscribe((ris)=>{
        console.log(ris)
        this.groups?.splice(index, 1)
      });
    }
  }

  change() {
    if (confirm("Sei sicuro di voler modificare i dati?")) {
      this.groupSrv.editUser(this.prof.id, this.form.value).subscribe((ris) => {
        this.prof = ris;
        alert('Modifica effettuata')
      })
    }
  }

  deleteUser(id: number){
    if (confirm("Sei sicuro di voler eliminare in modo permanente il tuo profilo?")) {
    this.groupSrv.deleteUser(this.prof.id).subscribe(
    )
    localStorage.removeItem('user')
    localStorage.removeItem('userID')
    this.router.navigate([""])
  }}
}
