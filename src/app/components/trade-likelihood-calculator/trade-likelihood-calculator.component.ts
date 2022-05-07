import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { MatSliderChange, MatCheckboxChange } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Sneaker } from '../../shared/objects/sneaker';
import { SneakersService } from 'sneakerDatabaseAPI/api/sneakers.service';
import { debounceTime, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-trade-calc',
  templateUrl: './trade-likelihood-calculator.component.html',
  styleUrls: ['./trade-likelihood-calculator.component.css']
})
export class TradeLikelihoodCalculatorComponent implements OnInit {

  // sneaker collection
  sneakerCollection: any;

  // sneaker searches
  yourSneakerSearch = new FormControl('');
  theirSneakerSearch = new FormControl('');

  theirDatabaseLoading: boolean = false;
  yourDatabaseLoading: boolean = false;
  yourOfferLoading: boolean = false;
  Yresult$: any;
  Tresult$: any;
  yourResult$: any;
  theirResult$: any;
  closetResult: any;

  // sneaker offers
  theirOffer: Sneaker[] = [];
  yourOffer: Sneaker[] = [];
  askCash = 0;
  addCash = 0;

  // database call for trade likelihood
  databaseCall: any;
  sShoe: any;
  isDoneCalculating = false;

  tradePercentageHeight: number = 50;

  @ViewChild('arrow') arrow$ : ElementRef;
  arrowAngle: number = 0;

  constructor(
                private router: Router,
                private route: ActivatedRoute,
                private sneakersService: SneakersService,
                private http: HttpClient,
                public snack: MatSnackBar,
                private renderer: Renderer2,
              ) { }

  ngOnInit() {
    this.onChanges();
    this.yourSneakersFromDatabase();
    this.theirSneakersFromDatabase();
  }

  // TRADE INTERFACE MECHANISM START
  onCashAdd(event: MatSliderChange) {
    // reset the oppositve value
    this.askCash = 0;
    this.setTradePercentage();
  }

  onCashAsk(event: MatSliderChange) {
    // reset the oppositve value
    this.addCash = 0;
    this.setTradePercentage();
  }

  onYourCheck(event: MatCheckboxChange, sneaker: any) {
    // create an object for the sneaker
    let shoe = {
      name : sneaker.title,
      productImageUrl : sneaker.media.thumbUrl,
      avgDSprice: sneaker.market.averageDeadstockPrice,
      condition: 10,
    }

    // add or remove sneaker based on checkbox event
    if (event.checked) {
      this.yourOffer.push(shoe);
    }
    else {
      this.yourOffer = this.yourOffer.filter(obj => obj.name !== sneaker.title);
    }
    this.setTradePercentage();
  }

  // asynchronous version for an additional database call
  async onYourOwnCheck(event: MatCheckboxChange, sneaker: any) {
    // turn on loading spinner
    this.yourOfferLoading = true;

    if (event.checked) {
      // get the sneaker from the API as a promise
      await this.getSneakerData(sneaker.name).then((p) => {
        this.closetResult = p;
        // create an object for the sneaker
        let shoe = {
          name : sneaker.name,
          productImageUrl : sneaker.productImageUrl,
          condition: sneaker.condition,
          avgDSprice: this.closetResult.Product.market.averageDeadstockPrice,
        }

        // console.log(shoe);

        this.yourOffer.push(shoe);
        // reset loading spinner
        this.yourOfferLoading = false;
      });
    }
    else {
      this.yourOffer = this.yourOffer.filter(obj => obj.name !== sneaker.name);
      // reset loading spinner
      this.yourOfferLoading = false;
    }

    this.setTradePercentage();
  }

  onTheirCheck(event: MatCheckboxChange, sneaker: any) {
    // create an object for the sneaker
    let shoe = {
      name : sneaker.title,
      productImageUrl : sneaker.media.thumbUrl,
      avgDSprice: sneaker.market.averageDeadstockPrice,
      condition: 10,
    }

    // add or remove sneaker based on checkbox event
    if (event.checked) {
      this.theirOffer.push(shoe);
    }
    else {
      this.theirOffer = this.theirOffer.filter(obj => obj.name !== sneaker.title);
    }
    this.setTradePercentage();
  }

  // additional filter function
  removeYourSneaker(sneaker:Sneaker) {
    this.yourOffer = this.yourOffer.filter(obj => obj!== sneaker);
    this.setTradePercentage();
  }

  removeTheirSneaker(sneaker:Sneaker) {
    this.theirOffer = this.theirOffer.filter(obj => obj!== sneaker);
    this.setTradePercentage();
  }

  // TRADE INTERFACE MECHANISM END

  // formula to calculate trade likelihood
  async setTradePercentage() {

    let theirTotal = 0;
    let yourTotal = 0;

    // css animation
    this.renderer.setStyle(this.arrow$.nativeElement, 'transform', 'rotate(180deg)');

    //console.log(theirPromises);

    for (var i in this.theirOffer) {
      let shoe = this.theirOffer[i];

      theirTotal += shoe.avgDSprice*(shoe.condition/10);
    }

    theirTotal += this.askCash;

    for (var i in this.yourOffer) {
      let shoe = this.yourOffer[i];

      yourTotal += shoe.avgDSprice*(shoe.condition/10);
    }

    yourTotal += this.addCash;

    if (theirTotal == 0 && yourTotal == 0){
      this.tradePercentageHeight = 50;
    }
    else {
      const shoeFactor = (yourTotal-theirTotal)/(yourTotal+theirTotal)*120;
      // this.tradePercentageHeight = 68; <- equilibrium factor
      this.tradePercentageHeight = shoeFactor + 68;

      this.tradePercentageHeight = Math.round(this.tradePercentageHeight);

      // set max and min values
      if (this.tradePercentageHeight < 0)
        this.tradePercentageHeight = 0;
      if (this.tradePercentageHeight > 100)
        this.tradePercentageHeight = 100;
    }

    console.log(this.tradePercentageHeight);
    this.isDoneCalculating = true;
  }

  // API call to get data
  async getSneakerData(name: string) {

    var id;

    return this.sneakersService.getSneakers('10',name)
    .pipe(
      catchError(err => {
        //console.log('error in http call 1');
        return this.sneakersService.getSneakersCORS('10',name);
      })
    )
      .toPromise().then(sneaker => {
        this.databaseCall = sneaker;
        //console.log(sneaker);
        id = this.databaseCall.Products[0].id;

        const url = 'https://stockx.com/api/products/' + id + '?includes=market,360&currency=USD&country=US';
        const urlCORS = 'https://cors-anywhere.herokuapp.com/stockx.com/api/products/' + id + '?includes=market,360&currency=USD&country=US';

        return this.http.get(url).pipe(
          catchError(err => {
            //console.log('error in http call 2');
            return this.http.get(urlCORS);
          })
        ).toPromise();

    });
  }

  // form handler
  onChanges() : void {
    this.yourSneakerSearch.valueChanges
    .pipe(debounceTime(500))
    .subscribe(val => {
      this.yourSneakersFromDatabase();
    });

    this.theirSneakerSearch.valueChanges
    .pipe(debounceTime(500))
    .subscribe(val => {
      this.theirSneakersFromDatabase();
    });
  }

  // call API for sneaker search
  theirSneakersFromDatabase() {
    //call sneakerService with parameters
    this.theirDatabaseLoading = true;

    this.sneakersService.getSneakers('36',this.theirSneakerSearch.value)
    .pipe(
      catchError(err => {
        //console.log('error in http call 1');
        return this.sneakersService.getSneakersCORS('36',this.theirSneakerSearch.value);
      })
    )
    .subscribe((sneaker) => { this.Tresult$ = sneaker
      // console.log(this.result$);
      this.theirResult$ = this.Tresult$.Products;

      this.theirDatabaseLoading = false;
    });
  }

  yourSneakersFromDatabase() {
    //call sneakerService with parameters
    this.yourDatabaseLoading = true;

    this.sneakersService.getSneakers('36',this.yourSneakerSearch.value)
    .pipe(
      catchError(err => {
        //console.log('error in http call 1');
        return this.sneakersService.getSneakersCORS('36',this.yourSneakerSearch.value);
      })
    )
    .subscribe((sneaker) => { this.Yresult$ = sneaker
      // console.log(this.Yresult$);
      this.yourResult$ = this.Yresult$.Products;

      this.yourDatabaseLoading = false;
    });
  }

  toSignUp() {
    this.router.navigate(['/signup']);
  }

  toTrade() {
    this.router.navigate(['/sneaker-catalog']);
  }

  joinDiscord() {
    window.open('https://discord.gg/cx4BBxda7y', '_blank');
  }

}
