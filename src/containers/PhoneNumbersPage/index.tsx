import React from 'react';
import PhoneNumberControl from '../../components/PhoneNumberControls';
import PhoneNumbersList from '../../components/PhoneNumbersList';
import { usePhoneNumbers } from '../../contexts/PhoneNumbersProvider';

import './style.scss';

const PhoneNumbersPage: React.FC = () => {
  const { numbers } = usePhoneNumbers();
  return (
    <div className="main-box card mx-auto mt-1">
      <PhoneNumberControl />
      {numbers.length > 0 && <PhoneNumbersList />}
    </div>
  );
};

export default PhoneNumbersPage;
