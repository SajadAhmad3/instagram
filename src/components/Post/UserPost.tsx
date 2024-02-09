import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Modal,
  Platform,
  TextInput,
} from 'react-native';
import {Image, Text, View} from '@gluestack-ui/themed';
import {PostData} from './PostData';
import {useUsername} from '../../Context/ContextAPI';
import {useNavigation} from '@react-navigation/native';

const UserPost = () => {
  const [isLiked, setIsLiked] = useState<{[key: string]: boolean}>({});
  const [posts, setPosts] = useState(PostData);
  const [loading, setLoading] = useState(false);
  const [postIdToDelete, setpostIdToDelete] = useState<any>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const screenWidth = Dimensions.get('window').width;

  const {username, newPost, setNewPost, newPosts, setNewPosts} = useUsername();
  const navigation: any = useNavigation();
  const [activeUser, setActiveUser] = useState('');

  const activeUserPosts = posts.filter(post => post.username === username);

  const openModalAndSetPostId = (postId: number, activeUser: any) => {
    setIsModalVisible(true);
    setActiveUser(activeUser);
    setpostIdToDelete(postId);
  };

  useEffect(() => {
    if (newPost) {
      setPosts([newPost, ...posts]);
    }
  }, [newPost]);

  const handleIsLiked = (postId: any) => {
    setIsLiked(prevLikes => {
      const newLikes: any = {...prevLikes};
      if (newLikes[postId]) {
        newLikes[postId] = false;
        const updatedPosts = posts.map(post =>
          post.id === postId ? {...post, like: post.like - 1} : post,
        );
        setPosts(updatedPosts);
      } else {
        newLikes[postId] = true;
        const updatedPosts = posts.map(post =>
          post.id === postId ? {...post, like: post.like + 1} : post,
        );
        setPosts(updatedPosts);
      }
      return newLikes;
    });
  };

  const deletePost = (postId: number) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    const updatedNewPosts = newPosts.filter(post => post.id !== postId);
    setNewPosts(updatedNewPosts);
    setNewPost('');
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (newPost) {
      setIsLiked(prevLikes => ({
        ...prevLikes,
        [newPost.id]: false,
      }));
      setPosts([newPost, ...posts]);
    }
  }, [newPost]);

  function handleEditCaption(updatedCaption: string) {
    const updatedPosts = [...posts];
    const index = updatedPosts.findIndex(post => post.id === postIdToDelete);
    if (index !== -1) {
      updatedPosts[index].caption = updatedCaption;
      setPosts(updatedPosts);
    }
  }

  const renderItem = ({item, index}: any) => {
    return (
      <>
        <View mt={10} key={item.id}>
          <View
            flexDirection="row"
            alignItems="center"
            px={10}
            mb={8}
            justifyContent="space-between">
            <View flexDirection="row">
              <Image
                source={item.profile}
                alt={'image'}
                height={30}
                width={30}
                borderRadius={15}
              />
              <Text fontSize={14} pl={10} fontWeight="600" color="black">
                {item.username}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(true);
                openModalAndSetPostId(item.id, item.username);
              }}>
              <Image
                h={20}
                w={20}
                source={require('../../assets/dots.png')}
                alt="dots"
              />
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              data={item.postImages}
              keyExtractor={(image, index) => index.toString()}
              onScroll={e => {
                const x = e.nativeEvent.contentOffset.x;
                setCurrentIndex(Math.round(x / screenWidth));
              }}
              renderItem={({item: image, index}) => {
                return (
                  <Image
                    key={index}
                    source={image}
                    alt={item.name}
                    w={screenWidth}
                    height={400}
                  />
                );
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
            />
          </View>

          <View
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt={10}
            px={13}>
            <View flexDirection="row" alignItems="center" flex={1}>
              <TouchableOpacity
                onPress={() => {
                  handleIsLiked(item.id);
                }}>
                {isLiked[item.id] ? (
                  <Image
                    source={require('../../assets/fillLike.png')}
                    alt={'image'}
                    height={24}
                    width={26}
                  />
                ) : (
                  <Image
                    source={require('../../assets/Like.png')}
                    alt={'image'}
                    height={24}
                    width={26}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity>
                <Image
                  source={require('../../assets/Comment.png')}
                  alt={'image'}
                  height={24}
                  width={22}
                  ml={15}
                  tintColor={'black'}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image
                  source={require('../../assets/Messanger.png')}
                  alt={'image'}
                  height={20}
                  width={24}
                  ml={15}
                  tintColor={'black'}
                />
              </TouchableOpacity>
            </View>

            {item.postImages.length > 1 && (
              <View
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                flex={1}>
                {item.postImages.map((data: any, index: number) => (
                  <View
                    width={currentIndex === index ? 6 : 4}
                    height={currentIndex === index ? 6 : 4}
                    backgroundColor={
                      currentIndex === index ? '$blue500' : 'grey'
                    }
                    borderRadius={currentIndex === index ? 3 : 2}
                    marginLeft={2}></View>
                ))}
              </View>
            )}

            <View flex={1} alignItems="flex-end">
              <TouchableOpacity>
                <Image
                  source={require('../../assets/Save.png')}
                  alt={'image'}
                  height={24}
                  width={20}
                  tintColor={'black'}
                />
              </TouchableOpacity>
            </View>
          </View>
          {item.like > 0 && (
            <Text fontSize={12} fontWeight={'600'} ml={13} mt={5} color="black">
              {isLiked[item.id] ? item.like : item.like}{' '}
              {item.like === 1 ? 'like' : 'likes'}
            </Text>
          )}

          <View flexDirection="row" px={13} alignItems="center">
            <Text fontSize={12} color="black" fontWeight="600" mr={4}>
              {item.name}
            </Text>
            <Text fontSize={12} color="black">
              {item.caption}
            </Text>
          </View>
          <Text fontSize={11} color="black" px={13}>
            {item.date}
          </Text>
        </View>
      </>
    );
  };

  return (
    <>
      <FlatList
        data={activeUserPosts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <View flexDirection="row" alignItems="center" px={15} my={10}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                w={16}
                h={12}
                source={require('../../assets/Back.png')}
                alt="back"
                mr={20}
              />
            </TouchableOpacity>
            <Text color="black" fontSize={16} fontWeight="600">
              Posts
            </Text>
          </View>
        }
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.option}>Archive</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditPost', {
                  postIdToDelete: postIdToDelete,
                  editPostCap: posts.find(post => post.id === postIdToDelete)
                    ?.caption,
                  handleEditCaption,
                });
                setIsModalVisible(false);
              }}>
              {activeUser === username && (
                <Text style={styles.option}>Edit</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.option}>Share to Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false);
                deletePost(postIdToDelete);
              }}>
              {activeUser === username && (
                <Text style={styles.delete}>Delete</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default UserPost;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  option: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
  },
  delete: {
    fontSize: 16,
    color: 'red',
    fontWeight: '600',
    marginBottom: 20,
  },
  cancel: {
    fontSize: 16,
    color: 'red',
    fontWeight: '600',
  },
  postImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  captionInput: {},
});
