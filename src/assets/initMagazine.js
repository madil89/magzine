import image1 from './1.jpeg';
import image2 from './2.jpeg';
import image3 from './3.jpeg';
import image4 from './4.jpeg';
import image5 from './5.jpeg';

import issue18Image1 from './issue_18/1.jpeg';
import issue18Image3 from './issue_18/2.jpeg';
import issue18Image2 from './issue_18/3.jpeg';
import issue18Image4 from './issue_18/4.jpeg';
import issue18Image5 from './issue_18/5.jpeg';
import issue18Image6 from './issue_18/6.jpeg';

const images = [
  {
    id: 'image1',
    url: image1,
    alt: 'image_1',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    id: 'image2',
    url: image2,
    alt: 'image_2',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    id: 'image3',
    url: image3,
    alt: 'image_3',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    id: 'image4',
    url: image4,
    alt: 'image_4',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    id: 'image5',
    url: image5,
    alt: 'image_5',
    title: 'Camera',
    author: '@helloimnik',
  },
];

const issue18Images = [
  {
    id: 'image1',
    url: issue18Image1,
    alt: 'image_1',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    id: 'image2',
    url: issue18Image2,
    alt: 'image_2',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    id: 'image3',
    url: issue18Image3,
    alt: 'image_3',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    id: 'image4',
    url: issue18Image4,
    alt: 'image_4',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    id: 'image5',
    url: issue18Image5,
    alt: 'image_5',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    id: 'image6',
    url: issue18Image6,
    alt: 'image_6',
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
    mainImage: issue18Images[0],
    images: issue18Images,
    editor_note: 'Sometimes Words hold meaning deeper than the listener or reader can comprehend. To make people understand your meaning, you have to emphasize some words or make them outstanding. Typography has some magic that can make things easier for readers. So this month we have selected typography as the theme of the magazine. Beautiful words with some amazing artwork. Hope you all enjoy going through this journey.',
  },
];
export default {
  images,
  issue18Images,
  magazines,
};
