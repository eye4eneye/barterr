// import { AuthCredential } from '@firebase/auth-types';

import { last, first } from 'rxjs/operators';

export class User {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  photoURL?: string;
  termsOfAgreement: boolean = true;
  mobile: string;
  biography: string;
  location: string;
  notification = false;
  numNotification : number = 0;

  referredBy?: string;
  shoeSize?: number;
  numReferral : number = 0;

  sneakerCount?: number;
  wishlistCount?: number;

  address?: any; // street, city, state, zip
  onboardingFinished: boolean = false;

  constructor(
    uid: string,
    email: string,
    firstName: string,
    lastName: string,
    displayName: string,
    photoUrl: string,
    termsOfAgreement: boolean,
    mobile: string,
    biography: string,
    location: string,
    onboardingFinished: boolean
  ) {
    this.uid = uid;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.displayName = firstName + ' ' + lastName;
    this.photoURL = photoUrl;
    this.termsOfAgreement = termsOfAgreement;
    this.mobile = mobile;
    this.biography = biography;
    this.location = location;
    this.onboardingFinished = onboardingFinished;
  }
}
