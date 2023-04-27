import NewspaperIcon from '@mui/icons-material/Newspaper';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Dashboard from './AdminDashboard';
import Magazines from './Magazines';
import EditMagazine from './EditMagazine';
import AdminGallery from './AdminGallery';
import EditGallery from './EditGallery';
import MyImages from './MyImages';
import AdminPhotoGraphy from './AdminPhotoGraphy';

const routes = [
  {
    name: 'Users',
    path: '/users',
    icon: DashboardIcon,
    component: Dashboard,
    hidden: false,
  },
  {
    name: 'My Images',
    path: '/myimages',
    icon: DashboardIcon,
    component: MyImages,
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
  {
    name: 'Gallery',
    path: '/gallery',
    icon: DashboardIcon,
    component: AdminGallery,
    hidden: false,
  },
  {
    name: 'PhotoGraphy',
    path: '/photo_graphy',
    icon: DashboardIcon,
    component: AdminPhotoGraphy,
    hidden: false,
  },
  {
    name: 'Gallery',
    path: '/gallery/:id',
    icon: DashboardIcon,
    component: EditGallery,
    hidden: true,
  },
];

export default routes;
