import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Group } from 'src/app/interfaces/group';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-detail-group',
  templateUrl: './detail-group.component.html',
  styleUrls: ['./detail-group.component.scss']
})
export class DetailGroupComponent implements OnInit {

  group!: Group;
  id!: number;
  prof!: any;
  profID!: number;
  userRole!: string;
  consID!: number;
  groupEntry!: any[]
  joinTo!: any;
  groupTo!: any[];
  exist!: boolean;

  counter!: number


  constructor(private groupSrv: GroupService, private route: ActivatedRoute, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.authSrv.user$.subscribe(
      (data) => {
        this.userRole = data?.user.role!
        this.consID = data?.user.id!
      });
    this.detail();
    this.getJoin();
  }

  detail() {
    this.groupSrv.getGroup(this.id).subscribe((res) => {
      this.group = res;
      this.groupEntry = this.group.entry
      this.counter = this.groupEntry.length
      this.profID = Number(this.group.professional);
      this.groupSrv.getProfessional(this.profID).subscribe((ris) => {
        this.prof = ris;
      });
    });
  }

  getJoin() {
    this.groupSrv.getToJoin(this.consID).subscribe((res) => {
      this.joinTo = res;
      this.groupTo = this.joinTo.groupsID
      this.exist = this.groupTo.includes(this.id)
    })
  }

  join() {
    if (confirm("Sei sicuro?")) {
      if (this.exist === false) {
        this.groupTo.push(this.id)
        this.groupSrv.joinGroup(this.consID, this.groupTo).subscribe((res) => {
          this.joinTo = res
        })
        this.groupEntry.push(this.consID)
        this.groupSrv.updateEntry(this.id, this.groupEntry).subscribe()
        this.counter = this.groupEntry.length
      }

      else {
        let index: number = this.groupTo.indexOf(this.id)
        this.groupTo.splice(index, 1)
        this.groupSrv.joinGroup(this.consID, this.groupTo).subscribe((res) => {
          this.joinTo = res
        })
        let i: number = this.groupEntry.indexOf(this.consID)
        this.groupEntry.splice(i, 1)
        this.groupSrv.updateEntry(this.id, this.groupEntry).subscribe()
        this.counter = this.groupEntry.length
      }


      this.exist = this.groupTo.includes(this.id)
    }
  }
}
