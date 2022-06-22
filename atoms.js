import { atom } from 'recoil';
  
export const textState = atom({
    key: 'userSession',
    default: '',
});