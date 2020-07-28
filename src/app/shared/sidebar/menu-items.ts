import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

  {
    path: '',
    title: 'Inicio',
    icon: 'mdi mdi-home-outline',
    class: 'has-arrow',
    
    extralink: false,
    submenu: [
        
      {
        path: '/home/reportes',
        title: 'Reportes',
        icon: 'mdi mdi-gauge',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/home/colaboradores',
        title: 'Colaboradores',
        icon: 'mdi mdi-gauge',
        class: '',
        extralink: false,
        submenu: []
      },
    ]},
  
];
