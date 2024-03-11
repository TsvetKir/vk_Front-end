// import { useState, useEffect, ReactNode } from 'react';
// import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { Task2, Task1 } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.TASK1 } = useActiveVkuiLocation();
  // const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  // const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />);

  // useEffect(() => {
  //   async function fetchData() {
  //     const user = await bridge.send('VKWebAppGetUserInfo');
  //     setUser(user);
  //     setPopout(null);
  //   }
  //   fetchData();
  // }, []);

  return (
    <SplitLayout >
      <SplitCol>
        <View activePanel={activePanel}>
          <Task1 id="task1" />
          <Task2 id="task2" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
