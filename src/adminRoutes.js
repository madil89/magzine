import Dashboard from './Pages/Dashboard';
import Magazines from './Pages/Magazines';

const routes = [
  {
    name: 'Dashbaord',
    path: '/dashboard',
    component: Dashboard,
  },
  {
    name: 'Magazines',
    path: '/adminMagazines',
    component: Magazines,
  },
];

export default routes;
