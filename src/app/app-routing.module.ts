import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    // path: 'home',
    // loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
    path: 'main',
     loadChildren: () => import('./Pages/main/main.module').then(m => m.MainPageModule)
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registraion',
    loadChildren: () => import('./Pages/registraion/registraion.module').then( m => m.RegistraionPageModule)
  },
  {
    path: 'my-deshboard',
    loadChildren: () => import('./Pages/my-deshboard/my-deshboard.module').then( m => m.MyDeshboardPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./Pages/search/search.module').then( m => m.SearchPageModule)
  },
 
  
  // {
  //   path: 'main',
  //   loadChildren: () => import('./Pages/main/main.module').then( m => m.MainPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
