import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CoursMarcheComponent } from './cours-marche/cours-marche.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
     path: "home", component: CoursMarcheComponent , // Default route

  }, {
    path: "admin", component: AdminComponent , // Default route

 }, {
    path: "", component: UserComponent , // Default route

 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{ preloadingStrategy: PreloadAllModules, useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
