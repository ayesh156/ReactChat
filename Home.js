import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Image,
  View,
  Button,
  FlatList,
  Touchable,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Home({ navigation }) {

  const [items, setItems] = useState([
    {
      pic: 'https://reactnative.dev/img/tiny_logo.png',
      name: 'Hashan Gunathilake',
      msg: 'Hi! There',
      time: '7:10 PM',
      count: '3',
    },
  ]);

  async function loadFriendList(text) {
    const userJSONText = await AsyncStorage.getItem('user');
    const f = new FormData();
    f.append('userJSONText', userJSONText);
    f.append('text', text);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        setItems(JSON.parse(request.responseText));
      }
    };

    request.open('POST', 'http://10.0.2.2/react_chat/load_users.php', true);
    request.send(f);
  }
  
  function start(){
    loadFriendList("");
  }

  useEffect(start,[]);

  const ui = (
    <SafeAreaView style={styles.home}>
      <Button title="Sign In" onPress={na} />
      <Text style={styles.homeText1}>Message</Text>
      <View style={styles.homeView1}>
        <TextInput style={styles.homeInput1} autoCorrect={false} onChangeText={p} />
        <TouchableOpacity style={styles.searchBtn} onPress={loadFriendList}>
        <Icon name="search" size={30} color="#900" style={styles.homeImage1} />
        </TouchableOpacity>
      </View>

      <FlatList data={items} renderItem={itemUI} />
    </SafeAreaView>
  );

  function p(text){
    loadFriendList(text);
  }

  function itemUI({ item }) {
    const ui = (
      <Pressable onPress={mn}>
        <View style={styles.item}>
          <Image source={{ uri: "http://10.0.2.2/react_chat/" + item.pic }} style={styles.itemImage} />
          <View style={styles.itemView1}>
            <Text style={styles.itemText1}>{item.name}</Text>
            <Text style={styles.itemText2}>{item.msg}</Text>
          </View>
          <View style={styles.itemView2}>
            <Text style={styles.itemText3}>{item.time}</Text>
            <View style={styles.itemShape1}>
              <Text style={styles.itemText4}>{item.count}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  
    function mn() {
      // Navigate to Home
      // Alert.alert("Message", "Success");

      const obj = {
        "id":item.id,
        "name":item.name,
        "img":"http://10.0.2.2/react_chat/" + item.pic
      };

      navigation.navigate("Chat",obj);

      var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
      }
    };

    request.open('GET', 'http://10.0.2.2/react_chat/test.php?id='+item.id, true);
    request.send();

    loadFriendList("");

    }
  
    return ui;
  }  

  function na() {
    navigation.navigate("Sign In");
  }

  return ui;
}

const styles = StyleSheet.create({
  searchBtn:{
    alignItems:"center",
    justifyContent:"center",
  },
  itemImage: {
    width: 76,
    height: 76,
    borderRadius: 50,
  },
  item: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 5,
  },
  itemText1: {
    color: '#303030',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemText2: {
    color: '#6F6F6F',
    fontSize: 16,
  },
  itemText3: {
    color: '#6F6F6F',
    fontSize: 14,
    marginBottom: 5,
  },
  itemText4: {
    color: 'white',
    fontSize: 14,
  },
  itemView1: {
    paddingLeft: 20,
    justifyContent: 'center',
    paddingRight: 30,
    width: '55%',
  },
  itemView2: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: "20%"
  },
  itemShape1: {
    width: 24,
    height: 24,
    backgroundColor: '#0d5eff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  home: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightgreen',
  },
  homeText1: {
    fontSize: 28,
    paddingVertical: 15,
    color: '#2b2b2b',
    fontFamily: 'BarlowBlack',
  },
  homeInput1: {
    height: 50,
    borderStyle: 'solid',
    borderWidth: 2,
    width: '90%',
    borderRadius: 20,
    fontSize: 20,
    paddingLeft: 15,
    paddingEnd: 60,
    borderColor: '#2b2b2b',
  },
  homeView1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeImage1: {
    position: 'absolute',
    right: 15,
    height: 35,
    width: 35,
    color: '#2b2b2b',
  },
});