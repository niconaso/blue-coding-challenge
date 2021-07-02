import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Datum, GiphyResponse, Images } from '../models/giphy-response.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageSearchService {
  private history$: BehaviorSubject<string[]> = new BehaviorSubject([]);

  /**
   * Creates an instance of ImageSearchService.
   * @param {HttpClient} http
   * @memberof ImageSearchService
   */
  constructor(private readonly http: HttpClient) {}

  /**
   *
   *
   * @param {string} term
   * @return {*}
   * @memberof ImageSearchService
   */
  getAll(term: string): Promise<Images[]> {
    const url = `${environment.giphy.endpoint}`;

    let params: HttpParams = new HttpParams();
    params = params.set('api_key', environment.giphy.apiKey);
    params = params.set('q', term);

    this.addNewTerm(term);

    return this.http
      .get(url, { params })
      .pipe(map((response: GiphyResponse) => this.mapData(response)))
      .toPromise();
  }

  getHistory(): Observable<string[]> {
    return this.history$.asObservable();
  }

  private addNewTerm(term: string) {
    let terms: string[] = this.history$.value;
    terms = [...terms, term];
    this.history$.next(terms);
  }

  private getHistoryValues() {
    return this.history$.value;
  }

  private mapData(response: GiphyResponse): Images[] {
    return response.data.map((data: Datum) => this.mapImages(data));
  }

  private mapImages(data: Datum): Images {
    return data.images;
  }
}
