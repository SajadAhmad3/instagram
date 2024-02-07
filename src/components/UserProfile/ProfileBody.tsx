import {Button, ButtonText, Image, Text, View} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {UserData} from './UserData';
import {PostData} from '../Post/PostData';
import {useNavigation} from '@react-navigation/native';
import {useUsername} from '../ContextAPI/ContextAPI';

function ProfileBody({username}: any) {
  const navigation: any = useNavigation();
  const {newPosts, setNewPosts} = useUsername();
  const user = UserData.find(user => user.username === username);
  const userPostdata = PostData.find(user => user.username === username);

  const numberOfPosts = userPostdata ? 1 + newPosts.length : 0;
  const followers = user ? user.followers : 0;
  const following = user ? user.following : 0;
  const name = user ? user.name : 0;
  const profilePic = user ? user.profile : 0;
  const bio = user ? user.bio : 0;
  const address = user ? user.address : 0;

  const [Uname, setName] = useState(name);
  const [Uaddress, setAddress] = useState(address);
  const [Ubio, setBio] = useState(bio);
  const [Upic, setPic] = useState(profilePic);

  function editName(newName: any) {
    setName(newName);
  }
  function editAddress(newAddress: any) {
    setAddress(newAddress);
  }
  function editBio(newBio: any) {
    setBio(newBio);
  }
  function editPic(newPic: any) {
    setPic(newPic);
  }

  function handleLogout() {
    setNewPosts([]);
    navigation.navigate('Login');
  }

  return (
    <View px={15}>
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Image h={80} w={80} borderRadius={50} source={Upic} alt={'user-pic'} />
        <View w={75} alignItems="center">
          <Text fontSize={16} fontWeight="700" color="black">
            {numberOfPosts}
          </Text>
          {numberOfPosts === 1 ? (
            <Text fontSize={14} fontWeight="500" color="black">
              post
            </Text>
          ) : (
            <Text fontSize={14} fontWeight="500" color="black">
              posts
            </Text>
          )}
        </View>
        <View w={75} alignItems="center">
          <Text fontSize={16} fontWeight="700" color="black">
            {followers}
          </Text>
          <Text fontSize={14} fontWeight="500" color="black">
            followers
          </Text>
        </View>
        <View w={75} alignItems="center">
          <Text fontSize={16} fontWeight="700" color="black">
            {following}
          </Text>
          <Text fontSize={14} fontWeight="500" color="black">
            following
          </Text>
        </View>
      </View>
      <Text fontSize={14} fontWeight="700" color="black" mt={5}>
        {Uname}
      </Text>
      <View maxWidth={200}>
        <Text fontSize={12} fontWeight="500" color="black">
          {Ubio}
        </Text>
        <Text fontSize={12} fontWeight="500" color="black">
          {Uaddress}
        </Text>
        <Text fontSize={14} fontWeight="600" color="black">
          See Translation
        </Text>
      </View>

      <View
        mt={5}
        gap={5}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <TouchableOpacity
          style={{
            flex: 1,
            marginRight: 5,
            borderRadius: 8,
            backgroundColor: '#E1E1E1',
            alignItems: 'center',
            justifyContent: 'center',
            height: 30,
          }}
          onPress={() =>
            navigation.push('EditProfile', {
              user,
              editName,
              editAddress,
              editBio,
              editPic,
            })
          }>
          <Text color="black" fontSize={12} fontWeight="500">
            Edit profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            borderRadius: 8,
            backgroundColor: '#E1E1E1',
            alignItems: 'center',
            justifyContent: 'center',
            height: 30,
          }}
          onPress={() => handleLogout()}>
          <Text color="black" fontSize={12} fontWeight="500">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ProfileBody;
