import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Datum, GiphyResponse, Images } from '../models/giphy-response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageSearchService {
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

    return this.http
      .get(url, { params })
      .pipe(map((response: GiphyResponse) => this.mapData(response)))
      .toPromise();
  }

  private mapData(response: GiphyResponse): Images[] {
    return response.data.map((data: Datum) => this.mapImages(data));
  }

  private mapImages(data: Datum): Images {
    return data.images;
  }
}
