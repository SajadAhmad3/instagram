import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddPost from '../screen/Dashboard/AddPost';
import Profile from '../screen/Dashboard/Profile';
import Dashboard from '../screen/Dashboard/Dashboard';
import {Image} from '@gluestack-ui/themed';

const Tab = createBottomTabNavigator();
const TabNavigation = () => {

  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              h={24}
              w={24}
              source={
                focused
                  ? require('../assets/footer/sHomeButton.png')
                  : require('../assets/footer/homeButton.png')
              }
              alt="homeIcon"
            />
          ),
        }}
      />

      <Tab.Screen
        name="AddPost"
        component={AddPost}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              h={24}
              w={24}
              source={
                focused
                  ? require('../assets/footer/addPost.png')
                  : require('../assets/footer/addPost.png')
              }
              alt="addIcon"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              h={24}
              w={24}
              source={
                focused
                  ? require('../assets/footer/user.png')
                  : require('../assets/footer/user.png')
              }
              alt="profileIcon"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
