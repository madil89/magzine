import UserMagazine from '../../UserMagazine';
import Gallery from './Gallery';

const routes = [
  {
    name: 'Magazines',
    path: '/magazines',
    component: UserMagazine,
    show: true,
  },
  {
    name: 'Magazines',
    path: '/magazines/:id',
    component: UserMagazine,
    show: false,
  },
  {
    name: 'Gallery',
    path: '/gallery',
    component: Gallery,
    show: true,
  },
  {
    name: 'Gallery',
    path: '/gallery/:id',
    component: Gallery,
    show: false,
  },
];
export default routes;
