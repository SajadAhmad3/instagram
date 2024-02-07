import {Image, Text, View} from '@gluestack-ui/themed';
import React from 'react';
import {TouchableOpacity} from 'react-native';

function ProfileHeader({username}:any) {
  return (
    <View px={15} pt={5} h={45}>
      <View
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <View flexDirection='row' alignItems='center' >
          <Text fontSize={16} fontWeight="700" color="black" pr={6}>
            {username}
          </Text>
          <TouchableOpacity>
          <Image
            h={12}
            w={12}
            source={require('../../assets/DownArrow.png')}
            alt="DownIcon"
          />
          </TouchableOpacity>
        </View>
        <View flexDirection="row" alignItems="center">
          <TouchableOpacity>
            <Image
              h={24}
              w={24}
              mr={15}
              source={require('../../assets/footer/addPost.png')}
              alt="addicon"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              h={20}
              w={20}
              source={require('../../assets/Menu.png')}
              alt="menu"
              tintColor={'black'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default ProfileHeader;
