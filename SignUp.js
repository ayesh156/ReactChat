import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Image,
  View,
  Button,
  Pressable,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalDropdown from 'react-native-modal-dropdown';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

export function SignUp({navigation}) {

    const[mobileNumber,setMobileNumber] = useState("");
    const[name,setName] = useState("");
    const[password,setPassword] = useState("");
    const[verifyPassword,setVerifyPassword] = useState("");
    const[country,setCountry] = useState("");
    const[profileImage,setProfileImage] = useState(null);
  
    const [countries,setCountries] = useState([]);
  
    const ui = (
      <SafeAreaView style={styles.signInMain}>
  
        <Image
          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
          style={styles.signInImage}
        />
  
        <Button title='Select Profile Picture' onPress={selectProfilePicture} />
  
        <View style={styles.signInView1}>
          <Icon name="user" style={styles.signInIcon1} />
          <TextInput
            style={styles.signInInput1}
            autoCorrect={false}
            placeholder={'Your name'}
            onChangeText={setName}
          />
        </View>
  
        <View style={styles.signInView1}>
          <Icon name="mobile" style={styles.signInIcon1} />
          <TextInput
            style={styles.signInInput1}
            autoCorrect={false}
            inputMode={'numeric'}
            maxLength={10}
            placeholder={'Your Mobile'}
            onChangeText={setMobileNumber}
          />
        </View>
  
        <View style={styles.signInView1}>
          <Icon name="lock" style={styles.signInIcon1} />
          <TextInput
            style={styles.signInInput1}
            secureTextEntry={true}
            placeholder={'Your Password'}
            onChangeText={setPassword}
          />
        </View>
  
        <View style={styles.signInView1}>
          <Icon name="lock" style={styles.signInIcon1} />
          <TextInput
            style={styles.signInInput1}
            secureTextEntry={true}
            placeholder={'Re-type Password'}
            onChangeText={setVerifyPassword}
          />
        </View>
  
        <ModalDropdown
          options={countries}
          dropdownStyle={styles.signUpTDropdown}
          dropdownTextStyle={styles.signUpDropdownText2}
          textStyle={styles.signUpTDropdownText}
          style={styles.signUpSelect}
          defaultValue={'Select Country'}
          onSelect={setCountry}
        />
  
        <Pressable style={styles.signInButton1} onPress={signUpRequest}>
          <Text style={styles.signInText1}>Sign Up</Text>
        </Pressable>
        <Pressable style={styles.signInButton2}>
          <Text style={styles.signInText1}>Back to Sign In</Text>
        </Pressable>
  
      </SafeAreaView>
  
    );
  
    function loadCountries(){
  
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState == 4&&request.status == 200) {
          var countryArray = JSON.parse(request.responseText);
          setCountries(countryArray);
        }
      };
    
      request.open('GET', 'http://10.0.2.2/react_chat/load_countries.php', true);
      request.send();
  
    };
  
    loadCountries();
  
     async function selectProfilePicture() {
      
      const options = {
        "mediaType":"photo",
      };
  
      const result = await launchImageLibrary(options);
  
      if(result.didCancel){
        Alert.alert("Message","No Image");
      }else{
  
        const imageObject = {
          "uri":result.assets[0].uri,
          "name":"profile.png",
          "type":"image/png",
        };
  
        setProfileImage(imageObject);
        
      }
      
    };
  
    function signUpRequest() {
  
      var form = new FormData();
      form.append('mobile', mobileNumber);
      form.append('name', name);
      form.append('password', password);
      form.append('verifyPassword', verifyPassword);
      form.append('country', country);
      form.append('profile_picture', profileImage);
    
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState == 4&&request.status == 200) {
          Alert.alert(request.responseText);
        }
      };
    
      request.open('POST', 'http://10.0.2.2/react_chat/signUp.php', true);
      request.send(form);
    }
  
    return ui;
  
  }

  const styles = StyleSheet.create({
    signUpDropdownText2: {
      fontSize: 18,
      textAlign: 'center',
      color: 'black',
    },
    signUpTDropdown: {
      width: '40%',
    },
    signUpTDropdownText: {
      color: '#999',
      fontSize: 20,
    },
    signUpSelect: {
      borderRadius: 10,
      borderWidth: 1,
      borderStyle: 'solid',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      width: '80%',
    },
    signUpMain: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
    },
    signInText1: {
      fontWeight: 'bold',
      fontSize: 18,
      color: 'white',
    },
    signInButton1: {
      width: '80%',
      height: 50,
      backgroundColor: '#303030',
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    signInButton2: {
      width: '80%',
      height: 50,
      backgroundColor: '#01d56a',
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    signInMain: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
    },
    signInImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    signInView1: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    signInIcon1: {
      fontSize: 24,
      position: 'absolute',
      start: 15,
    },
    signInInput1: {
      width: '80%',
      height: 50,
      fontSize: 20,
      borderRadius: 10,
      borderColor: 'black',
      borderWidth: 1,
      paddingStart: 40,
      paddingEnd: 20,
    },
  });