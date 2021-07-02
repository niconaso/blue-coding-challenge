import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then((m) => m.HomePageModule),
          },
        ],
      },
      {
        path: 'history',
        children: [
          {
            path: '',
            loadChildren: () => import('../history/history.module').then((m) => m.HistoryPageModule),
          },
        ],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/tabs/home',
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/tabs/home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
