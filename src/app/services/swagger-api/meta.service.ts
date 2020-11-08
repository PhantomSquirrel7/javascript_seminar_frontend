/**
 * globy-backend
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 0.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../../swagger-configs/encoder';

import { Observable }                                        from 'rxjs';

import { InlineResponse2006 } from '../../models/swagger-model/inlineResponse2006';
import { InlineResponse2007 } from '../../models/swagger-model/inlineResponse2007';
import { InlineResponse2008 } from '../../models/swagger-model/inlineResponse2008';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../../swagger-configs/variables';
import { Configuration }                                     from '../../swagger-configs/configuration';


@Injectable()
export class MetaService {

    protected basePath = 'http://localhost:36640/v1';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
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
     * Get list of valid countries
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public countriesGet(observe?: 'body', reportProgress?: boolean): Observable<Array<InlineResponse2008>>;
    public countriesGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<InlineResponse2008>>>;
    public countriesGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<InlineResponse2008>>>;
    public countriesGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<InlineResponse2008>>('get',`${this.basePath}/countries`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get list of valid languages
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public languagesGet(observe?: 'body', reportProgress?: boolean): Observable<Array<InlineResponse2006>>;
    public languagesGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<InlineResponse2006>>>;
    public languagesGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<InlineResponse2006>>>;
    public languagesGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<InlineResponse2006>>('get',`${this.basePath}/languages`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get list of valid subjects
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public subjectsGet(observe?: 'body', reportProgress?: boolean): Observable<Array<InlineResponse2007>>;
    public subjectsGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<InlineResponse2007>>>;
    public subjectsGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<InlineResponse2007>>>;
    public subjectsGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<InlineResponse2007>>('get',`${this.basePath}/subjects`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
