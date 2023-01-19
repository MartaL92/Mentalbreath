import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-detail-professional',
  templateUrl: './detail-professional.component.html',
  styleUrls: ['./detail-professional.component.scss']
})
export class DetailProfessionalComponent implements OnInit {

  id!: number;
  prof!: any;

  constructor(private groupSrv: GroupService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.detail();
  }

  detail() {
    this.groupSrv.getProfessional(this.id).subscribe((ris) => {
      this.prof = ris;
    });
  }
}

