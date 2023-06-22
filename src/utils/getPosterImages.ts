import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

const POSTER_IMAGES = [
  require('@organic/assets/images/posters/1.webp'),
  require('@organic/assets/images/posters/2.webp'),
  require('@organic/assets/images/posters/3.webp'),
  require('@organic/assets/images/posters/4.webp'),
  require('@organic/assets/images/posters/5.webp'),
  require('@organic/assets/images/posters/6.webp'),
  require('@organic/assets/images/posters/7.webp'),
  require('@organic/assets/images/posters/8.webp'),
  require('@organic/assets/images/posters/9.webp'),
  require('@organic/assets/images/posters/10.webp'),
  require('@organic/assets/images/posters/11.webp'),
  require('@organic/assets/images/posters/12.webp'),
  require('@organic/assets/images/posters/13.webp'),
  require('@organic/assets/images/posters/14.webp'),
  require('@organic/assets/images/posters/15.webp'),
  require('@organic/assets/images/posters/16.webp'),
  require('@organic/assets/images/posters/17.webp'),
  require('@organic/assets/images/posters/18.webp'),
  require('@organic/assets/images/posters/19.webp'),
  require('@organic/assets/images/posters/20.webp'),
  require('@organic/assets/images/posters/21.webp'),
  require('@organic/assets/images/posters/22.webp'),
  require('@organic/assets/images/posters/23.webp'),
  require('@organic/assets/images/posters/24.webp'),
  require('@organic/assets/images/posters/25.webp'),
  require('@organic/assets/images/posters/26.webp'),
  require('@organic/assets/images/posters/27.webp'),
  require('@organic/assets/images/posters/28.webp'),
  require('@organic/assets/images/posters/29.webp'),
  require('@organic/assets/images/posters/30.webp'),
  require('@organic/assets/images/posters/31.webp'),
  require('@organic/assets/images/posters/32.webp'),
];

/*
   Function to get required image by index in Array.
 */

export function getImageByIndex(index: number = 0): ImageSourcePropType {
  return POSTER_IMAGES[index];
}
