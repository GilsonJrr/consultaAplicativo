import React, {FC, useState} from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import * as Styled from './styles';

type TOptions = {
  label: string;
  value: string;
};

type DropDownProps = {
  options: TOptions[];
  icon?: string;
  initialValue?: string;
};

const DropDown: FC<DropDownProps> = ({options, icon, initialValue = ''}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [items, setItems] = useState(options);

  return (
    <Styled.InputWarper>
      {icon && (
        <Styled.IconWarper>
          <Icon name={icon} size={20} color="#566246" />
        </Styled.IconWarper>
      )}
      <Styled.DropDown
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        // eslint-disable-next-line react-native/no-inline-styles
        textStyle={{
          color: '#566246',
          fontSize: 20,
          marginHorizontal: icon ? 40 : 10,
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        labelStyle={{
          color: '#566246',
          fontSize: 20,
          marginLeft: icon ? 40 : 10,
        }}
      />
    </Styled.InputWarper>
  );
};

export default DropDown;
