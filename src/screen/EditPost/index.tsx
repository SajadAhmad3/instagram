import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useUsername} from '../../Context/ContextAPI';
import {useNavigation} from '@react-navigation/native';

const EditPost = ({route}: any) => {
  const {username, setNewPost, newPosts, setNewPosts} = useUsername();

  const navigation: any = useNavigation();

  const {postIdToDelete, handleEditCaption} = route.params;

  const editPost = newPosts.find(post => post.id === postIdToDelete);
  const editPostImg = editPost?.image;
  const editPostCap = editPost?.caption;

  const [editedCaption, setEditedCaption] = useState(editPostCap || '');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.photoContainer} onPress={() => {}}>
        <Image source={editPostImg} style={styles.photoPreview} />
      </TouchableOpacity>
      <TextInput
        placeholder="Write a caption"
        style={styles.captionInput}
        defaultValue={editPostCap}
        onChangeText={setEditedCaption}
        multiline
      />
      <TouchableOpacity
        style={styles.postButton}
        onPress={() => {
          handleEditCaption(editedCaption);
          navigation.goBack();
        }}>
        <Text style={styles.postButtonText}>Save</Text>
      </TouchableOpacity>
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
});

export default EditPost;
