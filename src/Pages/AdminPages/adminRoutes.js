import NewspaperIcon from '@mui/icons-material/Newspaper';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Dashboard from './Dashboard';
import Magazines from './Magazines';
import EditMagazine from './EditMagazine';

const routes = [
  {
    name: 'Dashbaord',
    path: '/dashboard',
    icon: DashboardIcon,
    component: Dashboard,
    hidden: false,
  },
  {
    name: 'Magazines',
    path: '/adminMagazines',
    icon: NewspaperIcon,
    component: Magazines,
    hidden: false,
  },
  {
    name: 'Magazines',
    path: '/adminMagazines/:id',
    icon: NewspaperIcon,
    component: EditMagazine,
    hidden: true,
  },
];

export default routes;
