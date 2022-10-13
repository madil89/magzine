import { useState } from 'react';
import assetManager from './assets/assetManager';
import './App.css';

function App() {
  const [currentImage, setCurrentImage] = useState(0);
  return (
    <div className="App">
      <button
        type="button"
        disabled={currentImage === 0}
        onClick={() => setCurrentImage(currentImage - 1)}
      >
        Previous Image

      </button>
      <img
        src={assetManager.images[currentImage].src}
        key={assetManager.images[currentImage].alt}
        alt={assetManager.images[currentImage].alt}
        style={{ height: '90vh', marginTop: '10px' }}
      />
      <button
        type="button"
        disabled={currentImage === assetManager.images.length - 1}
        onClick={() => setCurrentImage(currentImage + 1)}
      >
        Next Image

      </button>
    </div>
  );
}

export default App;
