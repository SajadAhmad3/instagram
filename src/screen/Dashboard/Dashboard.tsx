import {StyleSheet, Text} from 'react-native';
import { View} from '@gluestack-ui/themed';
import Post from '../../components/Post/Post';

const Dashboard = () => {

  return (
    <View flex={1}>
      <Post />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
