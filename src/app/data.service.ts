
import { HttpClient,HttpHeaders } from '@angular/common/http';
// import { ResponseApi } from '../../models/reponsseapi';
import { UserApi } from './userApi';
import { PokemonsApi } from './pokemonApi';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private comments = new BehaviorSubject<any>(['Pikachu', 'Charmander']);
  comment = this.comments.asObservable();
  
  constructor(private http: HttpClient) { }

  changeComments(comment){
    this.comments.next(comment)
  }
  changePokemon(comment){
    this.comments.next(comment)
  }

  //apiURL = 'http://localhost:8080';
  apiURL_Usuarios = 'http://34.125.177.106:8081/users-api';
  apiURL_Pokemones = 'http://34.125.230.240:4000/api/pokemon';
 

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'GET' 
      })
  };
  httpOptionsPokemon = {
    headers: new HttpHeaders({
      
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'GET' 
      })
  };  

  /**
   * ============================= 
   *    API USUARIOS
   * =============================
   */

  getComments(): Observable<UserApi> {
    return this.http.get<UserApi>(this.apiURL_Usuarios + '/users', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }   

  postComment(payload): Observable<UserApi> {
    return this.http.post<UserApi>(this.apiURL_Usuarios + '/user', JSON.stringify(payload), this.httpOptions)
    
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

   /**
   * ============================= 
   *    API Pokemons
   * =============================
   */

  getAllPokemons(): Observable<PokemonsApi> {
    return this.http.get<PokemonsApi>(this.apiURL_Pokemones , this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  } 
  
  getPokemonByID(id): Observable<PokemonsApi> {
    return this.http.get<PokemonsApi>(this.apiURL_Pokemones +`/${id}`, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  } 

  postPokemon(payload): Observable<PokemonsApi> {
    console.log(payload);
    console.log();
    
     return this.http.post<PokemonsApi>(this.apiURL_Pokemones , payload , this.httpOptionsPokemon)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  

  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}