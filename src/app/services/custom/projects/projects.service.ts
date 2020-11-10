import { Injectable } from '@angular/core';
import { ProjectsService } from '../../swagger-api/api';
import { HttpResponse, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Body10 } from '../../../models/swagger-model/body10';
import { InlineResponse20010 } from '../../../models/swagger-model/inlineResponse20010';
import { HttpHeaders} from '@angular/common/http';
import { Configuration } from '../../../swagger-configs/configuration';


@Injectable({
    providedIn: 'root',
  })
  export class CustomProjectsService extends ProjectsService {

    protected basePath = 'https://api-globy.herokuapp.com/v1';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    /**
     * Create a new project
     * Create a new project using an array of two classes and sends an invitation to the other classes teacher
     * @param body 
     * @param classId The id of the current class
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public classesClassIdProjectsPostCustom(body: Body10, classId: string, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse20010>;
    public classesClassIdProjectsPostCustom(body: Body10, classId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse20010>>;
    public classesClassIdProjectsPostCustom(body: Body10, classId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse20010>>;
    public classesClassIdProjectsPostCustom(body: Body10, classId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling classesClassIdProjectsPost.');
        }

        if (classId === null || classId === undefined) {
            throw new Error('Required parameter classId was null or undefined when calling classesClassIdProjectsPost.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
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
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }


        let myBody = {
            "class": body._class,
            "initialMessage": body.initialMessage
        };        

        return this.httpClient.request<InlineResponse20010>('post',`${this.basePath}/classes/${encodeURIComponent(String(classId))}/projects`,
            {
                body: myBody,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

  }