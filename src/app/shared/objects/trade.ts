import { Sneaker } from './sneaker';
import * as firebase from 'firebase';

export class Trade {
  tradeId: string;

  theirOffer?: any;
  yourOffer?: any;
  offer?: any[];

  add?: any; // add and ask are now cash values of their/yourOffer
  ask?: any;

  senderId: string;
  senderMobile: string;
  senderName: string;
  senderEmail: string;
  senderNewMsg: number = 0;
  senderActive?: boolean = true;

  posterId: string;
  posterMobile: string;
  posterName: string;
  posterEmail: string;
  posterNewMsg: number = 0;
  posterActive?: boolean = true;

  sentAt?: firebase.firestore.Timestamp;

  senderRead = true; // notification system
  posterRead = false;

  senderConfirm = false; // confirmation system
  posterConfirm = false;

  senderPaid = false; // payment system
  posterPaid = false;
  senderPaymentId?: string;
  posterPaymentId?: string;

  declined = false;
  reminderSent: boolean = false;

  tradeLikelihood?: any;
}
