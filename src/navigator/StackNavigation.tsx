import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Dashboard from '../screen/Dashboard';
import Login from '../screen/Login';
import StoryView from '../components/StoryView';
import TabNavigation from './BottomNavigation';
import EditProfile from '../components/UserProfile/EditProfile';
import Profile from '../screen/Profile';
import YourStoryView from '../components/Stories/YourStory';
import EditPost from '../screen/EditPost';
import Post from '../components/Post/Post';
import AddPost from '../screen/AddPost';
import UserPost from '../components/Post/UserPost';
import {useState} from 'react';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen
          name="Home"
          component={Dashboard}
        />
        <Stack.Screen
          name="Story"
          component={StoryView}
        />
        <Stack.Screen
          name="Dashboard"
          component={TabNavigation}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
        />
        <Stack.Screen name="YourStory" component={YourStoryView} />
        <Stack.Screen name="AddPost" component={AddPost} />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="EditPost" component={EditPost} />
        <Stack.Screen name="UserPost" component={UserPost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
