import React, {FC, useState} from 'react';

import * as Styled from './styles';
import {Text} from 'react-native';

type TTabProps = {
  value: string;
  label: string;
};

type TabsProps = {
  tabs: TTabProps[];
  selectTab: (item: string) => void;
};

const Tabs: FC<TabsProps> = ({tabs, selectTab}) => {
  const [tab, setTab] = useState(tabs[0].value);

  const handleTab = (selectedTab: string) => {
    setTab(selectedTab);
    selectTab(selectedTab);
  };

  return (
    <Styled.TabSelectorContainer>
      {tabs.map(innerTab => {
        return (
          <Styled.TabSelector
            onPress={() => handleTab(innerTab.value)}
            active={tab === innerTab.value}
            tabsSize={tabs.length}>
            <Text>{innerTab.label}</Text>
          </Styled.TabSelector>
        );
      })}
    </Styled.TabSelectorContainer>
  );
};

export default Tabs;
