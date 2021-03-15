import React, { createContext, useState, useContext } from 'react';

export const PhoneNumberLen = 10;
export type PhoneNumber = string;

interface IPhoneNumbersContext {
  numbers: PhoneNumber[];
  addNumber: (_: PhoneNumber) => number;
  removeNumber: (_: PhoneNumber) => void;
  reOrder: (src: number, dst: number) => void;
  duplicatedIdx: number;
  setDuplicatedIdx: (_: number) => void;
}

const initialParams = {
  numbers: [],
  addNumber: (_: PhoneNumber) => -1,
  removeNumber: (_: PhoneNumber) => {},
  reOrder: (src: number, dst: number) => {},
  duplicatedIdx: -1,
  setDuplicatedIdx: (_: number) => {},
};

const PhoneNumbersContext = createContext<IPhoneNumbersContext>(initialParams);

const PhoneNumbersProvider: React.FC = props => {
  const [numbers, setNumbers] = useState<PhoneNumber[]>([]);
  const [duplicatedIdx, setDuplicatedIdx] = useState<number>(-1);

  const addNumber: (_: PhoneNumber) => number = phoneNumber => {
    const idx = numbers.findIndex(value => value === phoneNumber);
    if (idx < 0) {
      setNumbers([phoneNumber, ...numbers]);
    }
    setDuplicatedIdx(idx);
    return idx;
  };

  const removeNumber: (_: PhoneNumber) => void = phoneNumber => {
    setNumbers(numbers.filter(item => item !== phoneNumber));
    setDuplicatedIdx(-2);
  };

  const reOrder: (src: number, dst: number) => void = (src, dst) => {
    if (src === duplicatedIdx || dst === duplicatedIdx) {
      setDuplicatedIdx(src + dst - duplicatedIdx);
    }
    if (src < dst) {
      setNumbers([
        ...numbers.slice(0, src),
        ...numbers.slice(src + 1, dst + 1),
        numbers[src],
        ...numbers.slice(dst + 1, numbers.length),
      ]);
    } else if (src > dst) {
      setNumbers([
        ...numbers.slice(0, dst),
        numbers[src],
        ...numbers.slice(dst, src),
        ...numbers.slice(src + 1, numbers.length),
      ]);
    }
  };

  return (
    <PhoneNumbersContext.Provider
      value={{
        numbers,
        addNumber,
        reOrder,
        removeNumber,
        duplicatedIdx,
        setDuplicatedIdx,
      }}
      {...props}
    />
  );
};

const usePhoneNumbers: () => IPhoneNumbersContext = () => {
  if (PhoneNumbersContext !== undefined) {
    return useContext<IPhoneNumbersContext>(PhoneNumbersContext);
  }

  throw new Error('usePhoneNumbers must be used within a PhoneNumbersProvider');
};

export { PhoneNumbersProvider, usePhoneNumbers };
