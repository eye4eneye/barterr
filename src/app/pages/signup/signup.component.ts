import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";


interface MailChimpResponse {
  result: string;
  msg: string;
}


@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  submitted: boolean = false;
  mailChimpEndpoint: string = "https://sole360.us7.list-manage.com/subscribe/post-json?u=28af0953c68a3e3e2791716ca&amp;id=d90330e0a6&subscribe=Subscribe&"
  errorMessage: string = "";  

  email = new FormControl("", [Validators.required, Validators.email]);



  constructor(private http: HttpClient, public snackBar: MatSnackBar
  ) { }

  newSubscriber() {
    this.errorMessage = "";

    if (this.email.status === "VALID") {
      const params = new HttpParams()
        .set("EMAIL", this.email.value)
        .set("b_28af0953c68a3e3e2791716ca_d90330e0a6", "");

      const mailChimpUrl = this.mailChimpEndpoint + params.toString();

      this.http.jsonp<MailChimpResponse>(mailChimpUrl, "c").subscribe(
        (response) => {
          if (response.result && response.result !== "error") {
            this.submitted = true;
            this.email.setValue("");
            this.snackBar.open("Thank you for your subscription!", "Dismiss");
          } else {
            this.errorMessage = response.msg;
            this.snackBar.open(
              "An error occured. Please try again.",
              "Dismiss"
            );
          }
        },
        (error) => {
          console.error(error);
          this.errorMessage = "Sorry, an error occured. Please try again.";
        }
      );
    }
  }

  ngOnInit() {

  }
}
