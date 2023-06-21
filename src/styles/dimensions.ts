import {Dimensions} from 'react-native';

const {width, height, scale} = Dimensions.get('screen');

export const SCREEN_WIDTH: number = width;
export const SCREEN_HEIGHT: number = height;
export const SCREEN_SCALE: number = scale;
