import image1 from './1.jpeg';
import image2 from './2.jpeg';
import image3 from './3.jpeg';
import image4 from './4.jpeg';
import image5 from './5.jpeg';

const images = [
  {
    id: 'image1',
    src: image1,
    alt: 'image_1',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    id: 'image2',
    src: image2,
    alt: 'image_2',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    id: 'image3',
    src: image3,
    alt: 'image_3',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    id: 'image4',
    src: image4,
    alt: 'image_4',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    id: 'image5',
    src: image5,
    alt: 'image_5',
    title: 'Camera',
    author: '@helloimnik',
  },
];

const magazines = [
  {
    id: 1,
    mainImage: images[0],
    images,
    editor_note: `Sometimes Words hold meaning deeper than the listener or reader can comprehend. To make people understand your meaning, you have to emphasize some words or make them outstanding. Typography has some magic that can make things easier for readers. So this month we have selected typography as the theme of the magazine. Beautiful words with some amazing artwork. Hope you all enjoy going through this journey.
    `,
  },
  {
    id: 2,
    mainImage: images[1],
    images,
    editor_note: 'Sometimes Words hold meaning deeper than the listener or reader can comprehend. To make people understand your meaning, you have to emphasize some words or make them outstanding. Typography has some magic that can make things easier for readers. So this month we have selected typography as the theme of the magazine. Beautiful words with some amazing artwork. Hope you all enjoy going through this journey.',
  },
];
export default {
  images,
  magazines,
};
