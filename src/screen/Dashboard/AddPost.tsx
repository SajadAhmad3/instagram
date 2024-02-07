import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  Platform,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import {useUsername} from '../../components/ContextAPI/ContextAPI';
import {PostData} from '../../components/Post/PostData';
import {useIsFocused, useNavigation} from '@react-navigation/native';
const {v4: uuidv4} = require('uuid');

const AddPost = () => {
  const {username, setNewPost, newPosts, setNewPosts} = useUsername();
  const [caption, setCaption] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation: any = useNavigation();
  const isFocused = useIsFocused();
  const [isPostButtonPressed, setIsPostButtonPressed] = useState(false);

  useEffect(() => {
    return () => {
      if (!isPostButtonPressed) {
        setCaption('');
        setImageUri(null);
      }
    };
  }, [isFocused]);

  const generateUniqueId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  };

  const user = PostData.find(user => user.username === username);
  const name = user?.name;
  const profilePic = user?.profile;

  const handlePost = () => {
    if (imageUri) {
      const currentTime = new Date().toLocaleTimeString('en-US', {
        hour12: false,
      });
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.toLocaleString('en-US', {month: 'long'});
      const year = currentDate.getFullYear();
      const formattedDate = `${day} ${month} ${year}`;

      const postImageUri = imageUri ? {uri: imageUri} : null;

      const newPost = {
        id: generateUniqueId(),
        name: name,
        username: username,
        profile: profilePic,
        profileAlt: 'Profile-pic',
        time: currentTime,
        date: formattedDate,
        image: postImageUri,
        postImages: postImageUri ? [imageUri] : [],
        caption: caption,
        like: 0,
      };

      setNewPost(newPost);
      setNewPosts((prevPosts: any[])=> [...prevPosts, newPost]);
      navigation.navigate('Home');
      setCaption('');
      setImageUri(null);
      setIsPostButtonPressed(true);
    }
  };

  const handleBackButtonPress = () => {
    setCaption('');
    setImageUri(null);
    setIsModalVisible(false);
    setIsPostButtonPressed(false);
  };

  const selectFromLibrary = () => {
    let options = {
      mediaType: 'photo' as MediaType,
      storageOptions: {
        path: 'image',
      },
    };
    launchImageLibrary(options, response => {
      if (
        response.assets &&
        response.assets.length > 0 &&
        response.assets[0].uri
      ) {
        setImageUri(response.assets[0].uri);
        setIsModalVisible(false);
      } else {
        handleBackButtonPress();
      }
    });
  };

  const selectFromCamera = () => {
    let options = {
      mediaType: 'photo' as MediaType,
      storageOptions: {
        path: 'image',
      },
    };
    launchCamera(options, response => {
      if (
        response.assets &&
        response.assets.length > 0 &&
        response.assets[0].uri
      ) {
        setImageUri(response.assets[0].uri);
        setIsModalVisible(false);
      } else {
        handleBackButtonPress();
      }
    });
  };



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.photoContainer}
        onPress={() => {
          setIsModalVisible(true);
        }}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.photoPreview} />
        ) : (
          <Text style={styles.choosePhotoText}>Choose Photo</Text>
        )}
      </TouchableOpacity>
      <TextInput
        placeholder="Write a caption..."
        style={styles.captionInput}
        onChangeText={text => setCaption(text)}
        value={caption}
        multiline
      />
      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={selectFromLibrary}>
              <Text style={styles.option}>Choose from Library</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={selectFromCamera}>
              <Text style={styles.option}>Take a Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false);
              }}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  photoContainer: {
    width: '80%',
    aspectRatio: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
    marginTop:20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    
  },
  choosePhotoText: {
    fontSize: 18,
    color: 'gray',
  },
  captionInput: {
    width: '80%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
    textAlign: 'left',
  },
  postButton: {
    backgroundColor: 'blue',
    width: '60%',
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.01)',
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
});

export default AddPost;
