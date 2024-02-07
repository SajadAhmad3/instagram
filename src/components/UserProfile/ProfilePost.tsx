import {Image, ScrollView, Text, View} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import {
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {UserData} from './UserData';
import {PostData} from '../Post/PostData';
import {useUsername} from '../ContextAPI/ContextAPI';
import {useNavigation} from '@react-navigation/native';

const icons = [
  {id: 1, source: require('../../assets/icon/GridIcon.png')},
  {id: 2, source: require('../../assets/icon/TagsIcon.png')},
];
function ProfilePost() {
  const screenWidth = Dimensions.get('window').width;
  const [selected, setSelected] = useState(0);
  const navigation: any = useNavigation();

  const {username, newPost, setNewPost, newPosts, setNewPosts} = useUsername();
  const user: any = PostData.find(user => user.username === username);

  const handlePostPress = (postId: any) => {
    navigation.navigate('UserPost', {postId});
  };

  return (
    <View mt={10}>
      <View flexDirection="row">
        {icons.map((icon, index) => {
          return (
            <View
              flexDirection="row"
              alignItems="center"
              key={index}
              pb={5}
              borderBottomWidth={selected === index ? 1 : 0}>
              <TouchableOpacity
                style={{width: screenWidth / 2, alignItems: 'center'}}
                onPress={() => {
                  setSelected(index);
                }}>
                <Image
                  h={24}
                  w={24}
                  source={icon.source}
                  alt="grid"
                  tintColor={'black'}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      {selected === 0 && (
        <View>
          <View flexDirection="row" flexWrap="wrap">
            {newPosts.map((newPost: any, index: number) => (
              <View key={index} width={screenWidth / 3}>
                <TouchableWithoutFeedback
                  onPress={() => handlePostPress(user.id)}>
                  <Image
                    style={{width: '100%', height: 124}}
                    source={newPost.image}
                    alt={`new_post_${index}`}
                  />
                </TouchableWithoutFeedback>
              </View>
            ))}
            {user && (
              <View width={screenWidth / 3}>
                <TouchableWithoutFeedback
                  onPress={() => handlePostPress(user.id)}>
                  <Image
                    style={{width: '100%', height: 124}}
                    source={user.postImages[0]} // Render only the first image
                    alt={`post_${0}`}
                  />
                </TouchableWithoutFeedback>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

export default ProfilePost;
