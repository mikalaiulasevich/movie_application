import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

const POSTER_IMAGES = [
  require('@organic/assets/images/posters/1.jpg'),
  require('@organic/assets/images/posters/2.jpg'),
  require('@organic/assets/images/posters/3.jpg'),
  require('@organic/assets/images/posters/4.jpg'),
  require('@organic/assets/images/posters/5.jpg'),
  require('@organic/assets/images/posters/6.jpg'),
  require('@organic/assets/images/posters/7.jpg'),
  require('@organic/assets/images/posters/8.jpg'),
  require('@organic/assets/images/posters/9.jpg'),
  require('@organic/assets/images/posters/10.jpg'),
  require('@organic/assets/images/posters/11.jpg'),
  require('@organic/assets/images/posters/12.jpg'),
  require('@organic/assets/images/posters/13.jpg'),
  require('@organic/assets/images/posters/14.jpg'),
  require('@organic/assets/images/posters/15.jpg'),
  require('@organic/assets/images/posters/16.jpg'),
  require('@organic/assets/images/posters/17.jpg'),
  require('@organic/assets/images/posters/18.jpg'),
  require('@organic/assets/images/posters/19.jpg'),
  require('@organic/assets/images/posters/20.jpg'),
  require('@organic/assets/images/posters/21.jpg'),
  require('@organic/assets/images/posters/22.jpg'),
  require('@organic/assets/images/posters/23.jpg'),
  require('@organic/assets/images/posters/24.jpg'),
  require('@organic/assets/images/posters/25.jpg'),
  require('@organic/assets/images/posters/26.jpg'),
  require('@organic/assets/images/posters/27.jpg'),
  require('@organic/assets/images/posters/28.jpg'),
  require('@organic/assets/images/posters/29.jpg'),
  require('@organic/assets/images/posters/30.jpg'),
  require('@organic/assets/images/posters/31.jpg'),
  require('@organic/assets/images/posters/32.jpg'),
];

/*
   Function to get required image by index in Array.
 */

export function getImageByIndex(index: number = 0): ImageSourcePropType {
  return POSTER_IMAGES[index];
}
