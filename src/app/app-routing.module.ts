import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PokedexComponent } from './pokedex/pokedex.component';

import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { NewPokemonComponent } from './new-pokemon/new-pokemon.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'pokedex',
    component: PokedexComponent
  },
  {
    path: 'new-pokemon',
    component: NewPokemonComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
