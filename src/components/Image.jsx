import { Button } from '@mui/material';
import propTypes from 'prop-types';

function Image({ src, alt }) {
  return (
    <div className="App">
      <img
        src={src}
        alt={alt}
        style={{ height: '90vh', marginTop: '10px' }}
      />
      <Button variant="contained" color="primary">Hello World</Button>
    </div>
  );
}

Image.propTypes = {
  src: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
};
export default Image;
