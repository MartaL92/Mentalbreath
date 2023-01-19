import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formS!: FormGroup;

  datas!: any;

  constructor(private authSrv: AuthService, private router: Router, private fb: FormBuilder, private groupSrv: GroupService) { }

  ngOnInit(): void {
    this.formS = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      surname: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      role: this.fb.control('', [Validators.required]),
    });

  }

  getError(name: string, error: string) {
    return this.formS.get(name)?.errors![error];
  }

  getControl(name: string) {
    return this.formS.get(name);
  }

  submit() {
    if (confirm("Sei sicuro di voler creare il profilo?")) {
      this.authSrv.signup(this.formS.value).subscribe((res)=>{
        this.datas = res;
        if (this.datas.user.role == 'Utente') {
          this.groupSrv.addJoin(this.datas.user.id).subscribe()
        }
      })
      this.formS.reset();
      this.router.navigate(['/login'])
    }
  }
}
