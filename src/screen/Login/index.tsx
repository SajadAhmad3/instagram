import React, {useContext, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Heading,
  Button,
  ButtonText,
  Input,
  InputField,
  Text,
  Image,
  Box,
} from '@gluestack-ui/themed';
import {storiesData} from '../../components/StoryView/stories';
import {UsernameContext} from '../../Context/ContextAPI';

const Login = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {setUsername: setUsernameContext} = useContext(UsernameContext);

  const handleLogin = () => {
    const userExists = storiesData.some(user => user.username === username);
    if (userExists) {
      setUsername(username);
      setUsernameContext(username);
      navigation.navigate('Dashboard');
    } else {
      setUsername('');
      setErrorMessage('Invalid Username, Please enter a valid username.');
    }
  };

  return (
    <>
      <View style={{flex: 0.8, justifyContent: 'center'}}>
        <View style={{alignItems: 'center'}}>
          <Image
            style={{height: 54, width: 200, marginBottom: 40}}
            source={require('../../assets/Instagram.png')}
            alt="Logo"
          />
        </View>

        <Input size="lg" mx={20}>
          <InputField
            type="text"
            placeholder="Username"
            onChangeText={text => setUsername(text)}
            value={username}
            autoCapitalize="none"
          />
        </Input>

        {!username && errorMessage && (
          <Text mx={20} fontSize={14} color="red">
            {errorMessage}
          </Text>
        )}

        <TouchableOpacity>
          <Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            mt={15}
            mx={20}
            onPress={handleLogin}>
            <ButtonText fontSize={18}>Login</ButtonText>
          </Button>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({});
