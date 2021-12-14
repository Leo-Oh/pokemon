import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { FormBuilder, FormGroup } from '@angular/forms';

import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-new-pokemon',
  templateUrl: './new-pokemon.component.html',
  styleUrls: ['./new-pokemon.component.scss']
})
export class NewPokemonComponent implements OnInit {

   
    btnText: string = `REGISTER POKEMON`;

    name_Pokemon: string = ``;
    pokedexNumber_Pokemon: string = ``;
    image_Pokemon= null;
    weight_Pokemon: string = ``;
    height_Pokemon: string = ``;
    category_Pokemon: string = ``;
    ability_Pokemon: string = ``;
    type_Pokemon: string = ``;
    debility_Pokemon: string = ``;
    gender_Pokemon: string = ``;
    description_Pokemon: string = ``;

    pokemons = [];
    
    constructor(private _data: DataService,private _http: HttpClient) { 
    }
  
  
    ngOnInit(){
    }


    new_pokemon(){

      let form = new FormData();
      form.append('namepokemon','test');
      form.append('numberpokemon','test');
      form.append('descriptionpokemon','test');
      form.append('weightpokemon','test');
      form.append('heightpokemon','test');
      form.append('genderpokemon','test');
      form.append('categorypokemon','test');
      form.append('abilitypokemon','test');
      form.append('typepokemon','test');
      form.append('debilitypokemon','test');
      form.append('image','./src/assets/images/nofound.png');

      console.log(form.getAll);
   


      let payload = new FormData();
      payload.append('namepokemon',this.name_Pokemon);
      payload.append('numberpokemon',this.pokedexNumber_Pokemon);
      payload.append('descriptionpokemon',this.description_Pokemon);
      payload.append('weightpokemon',this.weight_Pokemon);
      payload.append('heightpokemon', this.height_Pokemon);
      payload.append('genderpokemon',this.gender_Pokemon);
      payload.append('categorypokemon', this.category_Pokemon);
      payload.append('abilitypokemon', this.ability_Pokemon);
      payload.append('typepokemon', this.type_Pokemon);
      payload.append('debilitypokemon', this.debility_Pokemon);
      payload.append('image', this.image_Pokemon);

      console.log(`Payload:  ${JSON.stringify(payload.getAll)}`);
 
  
  
      this._data.postComment(form)
      .subscribe((data: any) => {
     
        this.pokemons.push(payload);
        this.name_Pokemon='';
        this.pokedexNumber_Pokemon = '';
        this.description_Pokemon='';
        this.weight_Pokemon = '';
        this.height_Pokemon = '';
        this.gender_Pokemon = '';
        this.category_Pokemon = '';
        this.ability_Pokemon='';
        this.type_Pokemon='';
        this.debility_Pokemon = '';
        this.image_Pokemon='';


        this._data.changeComments(this.pokemons);
  
     });
  }
      
}