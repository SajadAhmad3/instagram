import {
  Button,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useState} from 'react';
import {Image, View, Text} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary, MediaType} from 'react-native-image-picker';

const EditProfile = ({route}: any) => {
  const {user, editName, editAddress, editBio, editPic} = route.params;

  const navigation = useNavigation();
  const [selectImg, setSelectImg] = useState(user.profile);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user.address);
  const [bio, setBio] = useState(user.bio);

  const selectFromLibrary = () => {
    let options = {
      mediaType: 'photo' as MediaType,
      storageOptions: {
        path: 'image',
      },
    };
    launchImageLibrary(options, response => {
      if (response.assets && response.assets.length > 0) {
        setSelectImg(response.assets[0].uri);
        setIsModalVisible(false);
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
      if (response.assets && response.assets.length > 0) {
        setSelectImg(response.assets[0].uri);
        setIsModalVisible(false);
      }
    });
  };

  const deleteProfilePic = () => {
    setSelectImg('/Users/sajadahmadrather/instaG/src/assets/nopic.png');
  }

  return (
    <View flex={1}>
      <View flexDirection="row" alignItems="center" px={15} my={10}>
        <TouchableOpacity
          onPress={() => {
            editName(name);
            editAddress(address);
            editBio(bio);
            editPic(selectImg);

            navigation.goBack();
          }}>
          <Image
            w={16}
            h={12}
            source={require('../../assets/Back.png')}
            alt="back"
            mr={10}
          />
        </TouchableOpacity>
        <Text color="black" fontSize={16} fontWeight="600">
          Edit profile
        </Text>
      </View>
      <View alignItems="center" justifyContent="center">
        <Image
          w={80}
          h={80}
          borderRadius={100}
          source={selectImg}
          alt={'image'}
        />
        <TouchableOpacity
          onPress={() => {
            setIsModalVisible(true);
          }}>
          <Text color="#3897F0" fontSize={14} fontWeight='500'>Edit picture</Text>
        </TouchableOpacity>
      </View>

      <View p={10}>
        <View>
          <Text fontSize={12} opacity={0.5}>
            Name
          </Text>
          <TextInput
            placeholder="name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
        </View>

        <View>
          <Text fontSize={12} opacity={0.5}>
            Address
          </Text>
          <TextInput
            placeholder="address"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />
        </View>

        <View>
          <Text fontSize={12} opacity={0.5}>
            Bio
          </Text>
          <TextInput
            placeholder="bio"
            value={bio}
            onChangeText={setBio}
            style={styles.input}
          />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={selectFromLibrary}>
              <Text style={styles.option}>Choose from Library</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={selectFromCamera}>
              <Text style={styles.option}>Take a Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setIsModalVisible(false); deleteProfilePic();}}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    borderBottomWidth: 1,
    borderColor: '#CDCDCD',
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
