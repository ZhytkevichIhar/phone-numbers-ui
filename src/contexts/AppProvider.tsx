import React from 'react';
import { PhoneNumbersProvider } from './PhoneNumbersProvider';

const AppProvider = ({ children }: { children: JSX.Element }) => {
  return <PhoneNumbersProvider>{children}</PhoneNumbersProvider>;
};

export default AppProvider;
