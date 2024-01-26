import React, {FC, useState} from 'react';

import * as Styled from './styles';
import {Text} from 'react-native';

type TabsProps = {
  tabs: string[];
  selectTab: (item: string) => void;
};

const Tabs: FC<TabsProps> = ({tabs, selectTab}) => {
  const [tab, setTab] = useState(tabs[0]);

  const handleTab = (selectedTab: string) => {
    setTab(selectedTab);
    selectTab(selectedTab);
  };

  return (
    <Styled.TabSelectorContainer>
      {tabs.map(innerTab => {
        return (
          <Styled.TabSelector
            onPress={() => handleTab(innerTab)}
            active={tab === innerTab}
            tabsSize={tabs.length}>
            <Text>{innerTab}</Text>
          </Styled.TabSelector>
        );
      })}
    </Styled.TabSelectorContainer>
  );
};

export default Tabs;
