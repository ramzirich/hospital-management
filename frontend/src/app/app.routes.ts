import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './identity/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './identity/register/register.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'identity', loadChildren: ()=>import('./identity/identity.module').then(m => m.IdentityModule)},
];
