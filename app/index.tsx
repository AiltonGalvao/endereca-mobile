import { NativeBaseProvider, StatusBar } from 'native-base';

import { THEMES } from "@/styles/themes";
import Routes from './Routes';

export default function App() {
  return (
    <NativeBaseProvider theme={THEMES}>
      <StatusBar backgroundColor={THEMES.colors.green[800]} />
      <Routes />
    </NativeBaseProvider>
  );
}