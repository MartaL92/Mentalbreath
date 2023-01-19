import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formL!: FormGroup;
  user!: any;

  constructor(private authSrv: AuthService, private router:Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formL = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
    });
  }

  getError(name: string, error: string){
    return this.formL.get(name)?.errors![error];
  }

  getControl(name: string) {
    return this.formL.get(name);
  }

  submit() {
    this.authSrv.login(this.formL.value).subscribe((res) => {
      this.user = res
      this.router.navigate(['/home'])
    });
  }

}
