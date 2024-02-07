import {Image, Text, View} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {useUsername} from '../../Context/ContextAPI';

function ProfileHeader({username}: any) {
  const navigation: any = useNavigation();
  const {newPosts, setNewPosts} = useUsername();
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleLogout() {
    setNewPosts([]);
    navigation.navigate('Login');
  }

  return (
    <>
      <View px={15} pt={5} h={45}>
        <View
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <View flexDirection="row" alignItems="center">
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
            <TouchableOpacity onPress={() => navigation.navigate('AddPost')}>
              <Image
                h={24}
                w={24}
                mr={15}
                source={require('../../assets/footer/addPost.png')}
                alt="addicon"
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <Image
                h={18}
                w={20}
                source={require('../../assets/Menu.png')}
                alt="menu"
                tintColor={'black'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.option}>Settings and Privacy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false);
              }}>
              <Text style={styles.option}>Archive</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.option}>Saved</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false);
                handleLogout();
              }}>
              <Text style={styles.delete}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default ProfileHeader;

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
});
