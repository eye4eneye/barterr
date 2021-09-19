/**
 * The Sneaker Database
 * Sneaker Database API
 *
 * OpenAPI spec version: 1.0.0
 * Contact: contact@tg4.solutions
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { Sneaker } from '../model/sneaker';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class SneakersService {
    // USE : https://cors-anywhere.herokuapp.com/ IF THROWING CORS ERROR but takes a long time
    protected basePath = 'https://stockx.com/api/browse';
    // protected basePath = 'https://api.thesneakerdatabase.com/v1/sneakers';

    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            //this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Find sneaker by ID
     * Returns a single sneaker
     * @param sneakerId ID of sneaker to return
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getSneakerById(sneakerId: string, observe?: 'body', reportProgress?: boolean): Observable<Sneaker>;
    public getSneakerById(sneakerId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Sneaker>>;
    public getSneakerById(sneakerId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Sneaker>>;
    public getSneakerById(sneakerId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (sneakerId === null || sneakerId === undefined) {
            throw new Error('Required parameter sneakerId was null or undefined when calling getSneakerById.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected).set("X-Requested-With", "XMLHttpRequest");
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Sneaker>(`${this.basePath}${encodeURIComponent(String(sneakerId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Search for sneakers
     * Returns list of sneakers
     * @param limit Number of sneakers to return (min &#x3D; 10 &amp; max &#x3D; 100)
     * @param page Pagination
     * @param styleId Style ID of sneakers
     * @param name Name of sneakers
     * @param brand Sneaker brand name
     * @param gender Gender of sneakers
     * @param colorway Colorway of sneakers
     * @param releaseDate Release date of sneakers
     * @param releaseYear Release year of sneakers
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */

     //returns 4 different Observable objects
    public getSneakers(limit: string, name: string, brand?: string, gender?: string, colorway?: string, releaseDate?: string, releaseYear?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<Sneaker>>
    //public getSneakers(limit: string, page?: string, styleId?: string, name?: string, brand?: string, gender?: string, colorway?: string, releaseDate?: string, releaseYear?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Sneaker>>>;
    //public getSneakers(limit: string, page?: string, styleId?: string, name?: string, brand?: string, gender?: string, colorway?: string, releaseDate?: string, releaseYear?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Sneaker>>>;
    //public getSneakers(limit: string, page?: string, styleId?: string, name?: string, brand?: string, gender?: string, colorway?: string, releaseDate?: string, releaseYear?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any>
    {

        // if (limit === null || limit === undefined) {
        //     throw new Error('Required parameter limit was null or undefined when calling getSneakers.');
        // }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});

        // if (limit !== undefined && limit !== null) {
        //     queryParameters = queryParameters.set('limit', <any>limit);
        // }

        // STOCKX REPLACEMENT
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('productCategory', 'sneakers');
        }
        // END OF STOCKX REPLACEMENT

        // if (page !== undefined && page !== null) {
        //     queryParameters = queryParameters.set('page', <any>page);
        // }
        // if (styleId !== undefined && styleId !== null) {
        //     queryParameters = queryParameters.set('styleId', <any>styleId);
        // }
        // Incorrect Query Param title.
        // if (name !== undefined && name !== null) {
        //     queryParameters = queryParameters.set('title', <any>name);
        // }

        // if (name !== undefined && name !== null) {
        //     queryParameters = queryParameters.set('name', <any>name);
        // }

        // Added by Terrence Whaley.
        // Send default value on page load.
        // if(name == "") {
        //     queryParameters = queryParameters.set('name', "2021");
        // }

        // STOCKX REPLACEMENT
        if (name !== undefined && name !== null) {
            queryParameters = queryParameters.set('_search', <any>name);
            queryParameters = queryParameters.set('dataType', 'product');
        }
        // END OF STOCKX REPLACEMENT



        if (brand !== undefined && brand !== null) {
            queryParameters = queryParameters.set('brand', <any>brand);
        }
        if (gender !== undefined && gender !== null) {
            queryParameters = queryParameters.set('gender', <any>gender);
        }
          //queryParameters = queryParameters.set('gender', 'men');
        if (colorway !== undefined && colorway !== null) {
            queryParameters = queryParameters.set('colorway', <any>colorway);
        }
        if (releaseDate !== undefined && releaseDate !== null) {
            queryParameters = queryParameters.set('releaseDate', <any>releaseDate);
        }
        if (releaseYear !== undefined && releaseYear !== null) {
            queryParameters = queryParameters.set('releaseYear', <any>releaseYear);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected).set("X-Requested-With", "XMLHttpRequest");
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<Sneaker>>(`${this.basePath}`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    public getSneakersCORS(limit: string, name: string, brand?: string, gender?: string, colorway?: string, releaseDate?: string, releaseYear?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<Sneaker>>
    //public getSneakers(limit: string, page?: string, styleId?: string, name?: string, brand?: string, gender?: string, colorway?: string, releaseDate?: string, releaseYear?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Sneaker>>>;
    //public getSneakers(limit: string, page?: string, styleId?: string, name?: string, brand?: string, gender?: string, colorway?: string, releaseDate?: string, releaseYear?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Sneaker>>>;
    //public getSneakers(limit: string, page?: string, styleId?: string, name?: string, brand?: string, gender?: string, colorway?: string, releaseDate?: string, releaseYear?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any>
    {

        // if (limit === null || limit === undefined) {
        //     throw new Error('Required parameter limit was null or undefined when calling getSneakers.');
        // }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});

        // if (limit !== undefined && limit !== null) {
        //     queryParameters = queryParameters.set('limit', <any>limit);
        // }

        // STOCKX REPLACEMENT
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('productCategory', 'sneakers');
        }
        // if (page !== undefined && page !== null) {
        //     queryParameters = queryParameters.set('page', <any>page);
        // }
        // if (styleId !== undefined && styleId !== null) {
        //     queryParameters = queryParameters.set('styleId', <any>styleId);
        // }
        // if (name !== undefined && name !== null) {
        //     queryParameters = queryParameters.set('title', <any>name);
        // }

        // STOCKX REPLACEMENT
        if (name !== undefined && name !== null) {
            queryParameters = queryParameters.set('_search', <any>name);
            queryParameters = queryParameters.set('dataType', 'product');
        }


        if (brand !== undefined && brand !== null) {
            queryParameters = queryParameters.set('brand', <any>brand);
        }
        if (gender !== undefined && gender !== null) {
            queryParameters = queryParameters.set('gender', <any>gender);
        }
          //queryParameters = queryParameters.set('gender', 'men');
        if (colorway !== undefined && colorway !== null) {
            queryParameters = queryParameters.set('colorway', <any>colorway);
        }
        if (releaseDate !== undefined && releaseDate !== null) {
            queryParameters = queryParameters.set('releaseDate', <any>releaseDate);
        }
        if (releaseYear !== undefined && releaseYear !== null) {
            queryParameters = queryParameters.set('releaseYear', <any>releaseYear);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected).set("X-Requested-With", "XMLHttpRequest");
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<Sneaker>>(`https://cors-anywhere.herokuapp.com/${this.basePath}`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}