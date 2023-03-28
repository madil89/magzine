import UserMagazine from '../../UserMagazine';
import Gallery from './Gallery';

const routes = [
  {
    id: '1',
    name: 'Magazines',
    path: '/magazines',
    component: UserMagazine,
    show: true,
  },
  {
    id: '2',
    name: 'Magazines',
    path: '/magazines/:id',
    component: UserMagazine,
    show: false,
  },
  {
    id: '3',
    name: 'Gallery',
    path: '/gallery',
    component: Gallery,
    show: true,
  },
  {
    id: '4',
    name: 'Gallery',
    path: '/gallery/:id',
    component: Gallery,
    show: false,
  },
];
export default routes;
