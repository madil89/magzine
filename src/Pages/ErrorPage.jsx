import {
  redirect,
} from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div>
      {redirect('/')}
    </div>
  );
}
