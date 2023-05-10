import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.css']
})
export class HomeLoginComponent {
  loginForm: FormGroup;
  private token: string | undefined;
  username: any;
  password: any;
  // baseUrl: any; //?????????? aqui falta la parte del routing


constructor(private service: AuthService,
            private formBuilder: FormBuilder, 
            private http: HttpClient) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmitLogin() {
    //return this.service.login(this.loginForm.value).subscribe();
  }
}
