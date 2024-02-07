import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {storiesData} from '../StoryView/stories';
import {Image, View, Text} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import {useUsername} from '../../Context/ContextAPI';
import Header from '../Header';

const Stories = () => {
  const navigation: any = useNavigation();
  const {username} = useUsername();

  const activeUser = storiesData.find(user => user.username === username);
  const profilePic = activeUser ? activeUser.profile : 0;

  return (
    <>
      <Header />

      <ScrollView
        horizontal
        style={{marginTop: 8}}
        showsHorizontalScrollIndicator={false}>
        <View mx={5}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('YourStory', activeUser);
            }}>
            <View borderWidth={3} borderRadius={40} p={2} borderColor="#c057ff">
              <View>
                <Image
                  position="relative"
                  source={profilePic}
                  height={55}
                  width={55}
                  borderRadius={35}
                  alt={'profile-pic'}
                />
                <Image
                  source={require('../../assets/bplus.png')}
                  height={16}
                  width={16}
                  borderRadius={100}
                  alt={'plus-pic'}
                  position="absolute"
                  bottom={0}
                  right={0}
                />
              </View>
            </View>
          </TouchableOpacity>
          <Text textAlign="center" fontSize={12}>
            Your story
          </Text>
        </View>
        {storiesData.map((item: any) => {
          return (
            <View mx={5} key={item.id}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Story', {
                    item,
                    index: storiesData.indexOf(item),
                  });
                }}>
                <View
                  borderWidth={3}
                  borderRadius={40}
                  p={2}
                  borderColor="#c057ff">
                  <Image
                    source={item.image}
                    height={55}
                    width={55}
                    borderRadius={35}
                    alt={'profile-pic'}
                  />
                </View>
              </TouchableOpacity>
              <Text textAlign="center" fontSize={12}>
                {item.username.length > 9
                  ? item.username.slice(0, 6).toLowerCase() + '...'
                  : item.username.toLowerCase()}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});

export default Stories;
