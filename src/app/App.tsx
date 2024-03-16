// import { useState, useEffect, ReactNode } from 'react';
// import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol} from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { GetFact, GetAge} from '../pages';
import { DEFAULT_VIEW_PANELS } from './routes';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.GET_FACT } = useActiveVkuiLocation();

  return (
    <SplitLayout >
      <SplitCol>
        <View activePanel={activePanel}>
          <GetFact id="getFact" />
          <GetAge id="getAge" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
