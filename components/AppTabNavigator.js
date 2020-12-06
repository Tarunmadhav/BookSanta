import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Modal,ScrollView,KeyboardAvoidingView,Image } from 'react-native';
import db from "../config";
import  firebase from "firebase"
import BookDonateScreen from "../screens/BookDonateScreen"
import {createBottomTabNavigator} from "react-navigation-tabs"
import BookRequestScreen from '../screens/BookRequestScreen';
export const AppTabNavigator =createBottomTabNavigator({
 DonateBooks:{
     screen:BookDonateScreen,
     navigationOptions:{
         tabBarIcon:<Image
         source={
             require("../assets/request-list.png")
         } style={{width:20,height:20}}/>,
         tabBarLabel:"DonateBooks"
     }
 },
RequestBooks:{
    screen:BookRequestScreen,
    navigationOptions:{
        tabBarIcon:<Image
        source={
            require("../assets/request-book.png")
        } style={{width:20,height:20}}/>,
        tabBarLabel:"RequestBooks"
    }
},
})