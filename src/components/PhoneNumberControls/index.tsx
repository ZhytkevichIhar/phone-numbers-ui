import React, { useEffect, useState } from 'react';
import {
  usePhoneNumbers,
  PhoneNumberLen,
} from '../../contexts/PhoneNumbersProvider';

import './style.scss';

const PhoneNumberControl: React.FC = () => {
  const [newNumber, setNewNumber] = useState<string>('');

  const { addNumber, setDuplicatedIdx } = usePhoneNumbers();

  let numberInput: HTMLInputElement | null = null;
  useEffect(() => {
    numberInput && numberInput.focus();
  }, [numberInput]);

  const validate: (_: string) => string = s => {
    if (s.length === 0) {
      return '';
    }
    let result = `(${s.substr(0, 3)}`;
    if (s.length > 3) {
      result += `) ${s.substr(3, 3)}`;
    }
    if (s.length > 6) {
      result += `-${s.substr(6, 4)}`;
    }
    return result;
  };

  useEffect(() => {
    setDuplicatedIdx(-2);
    setNewNumber(validate(newNumber.replaceAll(/\D/g, '')));
  }, [newNumber, setNewNumber, setDuplicatedIdx]);

  const listenToKeyPress: (_: string) => void = key => {
    if (key === 'Enter' && newNumber.length === PhoneNumberLen + 4) {
      addToList();
    }
  };

  const addToList: () => void = () => {
    const ret = addNumber(newNumber);
    if (ret < 0) {
      setNewNumber('');
      numberInput && numberInput.focus();
    }
  };

  return (
    <>
      <input
        className="number-text-input form-control mt-4"
        type="text"
        placeholder="(123) 456-7890"
        maxLength={PhoneNumberLen + 4}
        value={newNumber}
        ref={input => (numberInput = input)}
        onChange={e => setNewNumber(e.target.value)}
        onKeyPress={e => listenToKeyPress(e.key)}
      />
      <button
        className="btn-add btn btn-primary mt-2"
        disabled={newNumber.length < PhoneNumberLen + 4 ? true : false}
        onClick={addToList}
      >
        <span className="fa fa-plus"></span>
      </button>
    </>
  );
};

export default PhoneNumberControl;
