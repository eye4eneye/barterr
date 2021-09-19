import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  errorMessage: string;

  showError: boolean;

  referral: string;

  firstNameText;
  lastNameText
  emailText;
  phoneNumberText;
  passwordText;
  confirmPasswordText;

  mobileNumberPattern: string = "((\\+91-?)|0)?[0-9]{10}$";

  constructor(
  ) {}

  ngOnInit() {

  }
}
