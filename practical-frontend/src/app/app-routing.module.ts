import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'post'
  },
  {
    path: 'auth',
    loadChildren: () => import('../app/auth/auth.module').then((m) => m.AuthModule),
    // canActivate:[AuthGuard]
  },
  {
    path: 'post',
    loadChildren: () => import('../app/posts/posts.module').then((m) => m.PostsModule),
    canActivate:[AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
