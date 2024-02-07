import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import {storiesData} from './stories';

import {
  Image,
  View,
  Text,
  Input,
  InputField,
  Pressable,
} from '@gluestack-ui/themed';

const storyDuration = 5 * 1000;

const StoryView = ({route}: any) => {
  const navigation = useNavigation();
  const {item, index} = route.params;
  const currentTime = new Date().getHours();
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  const [userIndex, setUserIndex] = useState(index);
  const [storyIndex, setStoryIndex] = useState(0);

  const user = storiesData[userIndex];
  const story = user.story[storyIndex];

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: storyDuration,
      easing: Easing.linear,
    });
  }, [userIndex, storyIndex]);

  useEffect(() => {
    const timeout = setTimeout(() => {}, 10000);

    return () => clearTimeout(timeout);
  }, [navigation, storyIndex]);

  const goToPrevUser = () => {
    if (userIndex > 0) {
      setUserIndex((userIndex: number) => userIndex - 1);
    } else {
      navigation.goBack();
    }
  };

  const goToNextUser = () => {
    if (userIndex < storiesData.length - 1) {
      setUserIndex((userIndex: number) => userIndex + 1);
    } else {
      navigation.goBack();
    }
  };

  const goToPrevStory = () => {
    if (storyIndex > 0) {
      setStoryIndex((storyIndex: number) => storyIndex - 1);
      return storyIndex - 1;
    } else {
      setStoryIndex(0);
      goToPrevUser();
    }
  };

  const goToNextStory = () => {
    if (storyIndex < user.story.length - 1) {
      setStoryIndex((storyIndex: number) => storyIndex + 1);
      return storyIndex + 1;
    } else {
      setStoryIndex(0);
      goToNextUser();
    }
  };

  useAnimatedReaction(
    () => {
      return progress.value;
    },
    (currentValue, previousValue) => {
      if (currentValue !== previousValue && currentValue >= 1) {
        runOnJS(goToNextStory)();
      }
    },
  );

  const indicatorAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <>
      <View flex={1} bgColor="black" position="relative">
        {/* progress bar ................................ */}

        <View zIndex={3} pt={5} px={10} position="relative">
          <View flexDirection="row" gap={5} w={'100%'}>
            {user.story.map((storyImage, idx) => (
              <View
                key={idx}
                flex={1}
                h={2}
                borderRadius={10}
                bgColor={idx < storyIndex ? 'white' : 'gray'}
                overflow="hidden">
                <Animated.View
                  style={[
                    styles.indicatorStyle,
                    idx === storyIndex
                      ? indicatorAnimatedStyle
                      : idx > storyIndex
                      ? {width: 0, backgroundColor: 'gray'}
                      : idx < storyIndex
                      ? {width: '100%', backgroundColor: 'white'}
                      : null,
                  ]}></Animated.View>
              </View>
            ))}
          </View>
        </View>

        {/* User Story Avtar ........................ */}

        <View
          flexDirection="row"
          alignItems="center"
          pt={12}
          pl={12}
          position="relative"
          zIndex={2}>
          <Image
            width={30}
            height={30}
            borderRadius={20}
            source={storiesData[userIndex].profile}
            alt={storiesData[userIndex].alt}
          />
          <Text fontSize={12} pl={10} fontWeight="600" color="white">
            {storiesData[userIndex].name}
          </Text>
          <Text fontSize={12} pl={5} fontWeight="600" color="white">
            {currentTime - storiesData[userIndex].time}h
          </Text>
        </View>

        {/* User story .................................... */}

        <View position="absolute">
          <Image
            source={story.image}
            alt={storiesData[userIndex].alt}
            height={screenHeight - 125}
            $android-h={screenHeight - 135}
            width={screenWidth}
            borderRadius={10}
            zIndex={1}
          />

          <Pressable
            zIndex={9}
            height="100%"
            width={'50%'}
            position="absolute"
            onPress={goToPrevStory}
          />
          <Pressable
            zIndex={9}
            height="100%"
            width={'50%'}
            position="absolute"
            alignSelf="flex-end"
            onPress={goToNextStory}
          />

          <View
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mt={10}>
            <Input
              alignItems="center"
              width={280}
              borderColor="white"
              borderRadius={30}
              ml={10}>
              <InputField
                color="white"
                placeholder="Send message"
                placeholderTextColor={'white'}
                fontSize={14}
                lineHeight={15}
              />
            </Input>
            <View flexDirection="row" gap={10} alignItems="center" mr={10}>
              <TouchableOpacity>
                <Image
                  height={24}
                  width={26}
                  source={require('../../assets/Like.png')}
                  alt="Logo"
                  tintColor={'white'}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image
                  style={{height: 20, width: 20}}
                  source={require('../../assets/Messanger.png')}
                  alt="Logo"
                  tintColor={'white'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default StoryView;

const styles = StyleSheet.create({
  indicatorStyle: {
    height: '100%',
    backgroundColor: 'white',
  },
});
