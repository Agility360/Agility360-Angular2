/*------------------------------------------------------------------------------
  McDaniel
  Date:   Aug 2017
  Usage:  HTTP Interceptor to implement app-level behavior for
          http errors, waiting prompts, timeout, etc.
  Original code base from https://github.com/appwebhouse/ionic2-interceptors-app
 ------------------------------------------------------------------------------*/

import { Injectable } from '@angular/core';
import { Http, XHRBackend, Request, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { DEBUG_MODE } from '../shared/constants';

export const TIMEOUT = 10000

@Injectable()
export class HttpService extends Http {

  loading: any;

  constructor(
    xhrBackend: XHRBackend,
    requestOptions: RequestOptions) {

    super(xhrBackend, requestOptions);
    if (DEBUG_MODE) console.log('HttpService.constructor()');


  }

  /**
   * Performs any type of http request.
   * @param url
   * @param options
   * @returns {Observable<Response>}
   */
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    if (DEBUG_MODE) console.log('HttpService.request()', url, options);

    if (this.loading == null) {
      if (DEBUG_MODE) console.log('HttpService.request() - loadingCtrl.create()');

      /* hook to add loading controller  */

   } else {
      /* for future: make content dynamic? */
//       this.loading.data.content = 'Loading ...';
   }

   return super.request(url, options)
     .timeout(TIMEOUT);
  }

  /**
   * Performs a request with `get` http method.
   * @param url
   * @param options
   * @returns {Observable<>}
   */
  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    if (DEBUG_MODE) console.log('HttpService.get()', url, options);
    this.requestInterceptor();
    return super.get(this.getFullUrl(url), this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  getLocal(url: string, options?: RequestOptionsArgs): Observable<any> {
    if (DEBUG_MODE) console.log('HttpService.getLocal()', url, options);
    return super.get(url, options);
  }

  /**
   * Performs a request with `post` http method.
   * @param url
   * @param body
   * @param options
   * @returns {Observable<>}
   */
  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    if (DEBUG_MODE) console.log('HttpService.post()', url, options);
    this.requestInterceptor();
    return super.post(this.getFullUrl(url), body, this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  /**
   * Performs a request with `put` http method.
   * @param url
   * @param body
   * @param options
   * @returns {Observable<>}
   */
  put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    if (DEBUG_MODE) console.log('HttpService.put()', url, options);
    this.requestInterceptor();
    return super.put(this.getFullUrl(url), body, this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  /**
   * Performs a request with `put` http method.
   * @param url
   * @param body
   * @param options
   * @returns {Observable<>}
   */
  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    if (DEBUG_MODE) console.log('HttpService.patch()', url, options);
    this.requestInterceptor();
    return super.patch(this.getFullUrl(url), body, this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }


  /**
   * Performs a request with `delete` http method.
   * @param url
   * @param options
   * @returns {Observable<>}
   */
  delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    if (DEBUG_MODE) console.log('HttpService.delete()', url, options);
    this.requestInterceptor();
    return super.delete(this.getFullUrl(url), options)
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }


  /**
   * Request options.
   * @param options
   * @returns {RequestOptionsArgs}
   */
  private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (DEBUG_MODE) console.log('HttpService.requestOptions()', options);
    return options;
  }

  /**
   * Build API url.
   * @param url
   * @returns {string}
   */
  private getFullUrl(url: string): string {
    if (DEBUG_MODE) console.log('HttpService.getFullUrl()');
    return url;
  }

  /**
   * Request interceptor.
   */
  private requestInterceptor(): void {
    if (DEBUG_MODE) console.log('HttpService.requestInterceptor()');
  }

  /**
   * Response interceptor.
   */
  private responseInterceptor(): void {
    if (DEBUG_MODE) console.log('HttpService.responseInterceptor()');
  }

  /**
   * Error handler.
   * @param error
   * @param caught
   * @returns {ErrorObservable}
   */
  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    if (DEBUG_MODE) console.log('HttpService.onCatch()');
    return Observable.throw(error);
  }

  /**
   * onSubscribeSuccess
   * @param res
   */
  private onSubscribeSuccess(res: Response): void {
    if (DEBUG_MODE) console.log('HttpService.onSubscribeSuccess() - res:', res);
  }

  /**
   * onSubscribeError
   * @param error
   */
  private onSubscribeError(error: any): void {
    if (DEBUG_MODE) console.log('HttpService.onSubscribeError() - error:', error);

    this.moveToHttpError();
    return;

    /*
    if (error.name) {
      if (error.name == "TimeoutError") {
        if (DEBUG_MODE) console.log('HttpService.onSubscribeError() - timeout error:', error);
      }
    }
    switch (error.status) {
      case 401:
        if (DEBUG_MODE) console.log('HttpService.onSubscribeError() - error 401:', error);
        this.moveToLogin();
        break;
      case 500:
        if (DEBUG_MODE) console.log('HttpService.onSubscribeError() - error 500:', error);
        let errObj: any;
        let errMsg: any;
        if (error instanceof Response) {
          if (DEBUG_MODE) console.log('onSubscribeError() - 500 Response Object');
          if (DEBUG_MODE) console.log('i am a Response instance', error.text())
          errObj = JSON.parse(error.text());
          errMsg = errObj.errorType + ': ' + errObj.errorMessage;
          if (DEBUG_MODE) console.log('onSubscribeError() - 500 Response Object:', errObj);
        }
        let alert = this.alertCtrl.create({
          title: 'Server Error',
          message: errMsg,
          buttons: [
            {
              text: 'Ok',
              role: 'ok',
              handler: () => {
                if (DEBUG_MODE) console.log('onSubscribeError() - alert - ok clicked.');
              }
            }
          ]
        });
        alert.present();
      default:
        if (DEBUG_MODE) console.log('HttpService.onSubscribeError() - error default:', error);
        this.moveToHttpError();
        break;
    }
    */

  }

  /**
   * onFinally
   */
  private onFinally(): void {
    if (DEBUG_MODE) console.log('HttpService.onFinally()');
    if (this.loading != null) {
      if (DEBUG_MODE) console.log('HttpService.onFinally() - loading.dismiss()');
      this.loading.dismiss();
      this.loading = null;
        }
    this.responseInterceptor();
  }

  /**
   * moveToLogin
   */
   private moveToLogin(): void {
     if (DEBUG_MODE) console.log('HttpService.moveToLogin()');

     /* hook to navigate UI to user login page */

   }

  private moveToHttpError(): void {
    if (DEBUG_MODE) console.log('HttpService.moveToHttpError()');

    /* hook to add http error page */

  }

}
