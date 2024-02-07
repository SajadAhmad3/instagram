import {View} from '@gluestack-ui/themed';
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
// import Entypo from 'react-native-vector-icons/Entypo';

function Header() {
  return (
    <View>
      <View
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        px={10}
        pt={5}
        pb={5}
       >
        <Image
          style={{height: 28, width: 110}}
          source={require('../../assets/Instagram.png')}
          alt="Logo"
        />
        <View flexDirection="row" gap={10} alignItems='center'>
          <TouchableOpacity>
            <Image
              style={{height: 20, width: 22}}
              source={require('../../assets/Like.png')}
              alt="Logo"
              tintColor={'black'}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={{height: 25, width: 25}}
              source={require('../../assets/Message.png')}
              alt="Logo"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Header;
