import React, {useEffect, useState, memo} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

interface OwnProps {
  currency?: string;
  setCurrency?: any;
  currencyListData: any[];
}

const DropDown = ({currency, setCurrency, currencyListData}: OwnProps) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(currencyListData);

  useEffect(() => {
    setItems(currencyListData);
  }, [currencyListData]);

  return (
    <DropDownPicker
      open={open}
      value={currency}
      items={items}
      setOpen={setOpen}
      setValue={setCurrency}
      setItems={setItems}
    />
  );
};

export default memo(DropDown);
