import React from 'react';
import {ScrollView, Text, View} from '@gluestack-ui/themed';
import ProfileHeader from '../../components/UserProfile/ProfileHeader';
import ProfilePost from '../../components/UserProfile/ProfilePost';
import ProfileBody from '../../components/UserProfile/ProfileBody';
import {useUsername} from '../../Context/ContextAPI';

function Profile() {
  const {username, newPost} = useUsername();

  return (
    <View flex={1}>
      <ScrollView>
        <ProfileHeader username={username} />
        <ProfileBody username={username} />
        <ProfilePost />
      </ScrollView>
    </View>
  );
}

export default Profile;
