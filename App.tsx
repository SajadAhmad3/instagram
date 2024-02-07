import 'react-native-gesture-handler';
import {GluestackUIProvider, Text} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {SafeAreaView, View} from 'react-native';
import StackNavigation from './src/navigator/StackNavigation';
import {UsernameProvider} from './src/Context/ContextAPI';

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView style={{flex: 1}}>
        <UsernameProvider>
          <StackNavigation />
        </UsernameProvider>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}
