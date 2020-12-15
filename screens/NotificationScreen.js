import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Modal,ScrollView,KeyboardAvoidingView,FlatList } from 'react-native';
import {ListItem,Icon} from "react-native-elements"
import db from "../config";
import  firebase from "firebase"
import MyHeader from "../components/MyHeader"
import SwipableFlatList from "../components/SwipableFlatList"

export default class NotificationScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            allNotifications:[],
            userId:firebase.auth().currentUser.email,
        }
        this.requestRef=null
    }
    getallNotifications=()=>{
        this.requestRef=db.collection("all_notifications").where("notification_status","==","UnRead")
        .where("targeted_user_id","==",this.state.userId)
        .onSnapshot((snapshot)=>{
            var allNotifications=[]
            snapshot.docs.map((doc)=>{
                var notification=doc.data()
                notification["doc_id"]=doc.id
                allNotifications.push(notification)
            })
            this.setState({
                allNotifications:allNotifications
            })
        })
    }
    componentDidMount(){
        this.getallNotifications();
    }
    componentWillUnmount(){
        this.requestRef()
    }
    keyExtractor=(item,index)=>index.toString()
    renderItem=({item,i})=>{
        return(
            <ListItem
            key={i}
            title={item.book_name}
            subtitle={item.message}
            titleStyle={{color:"black",fontWeight:"bold"}}
            leftElement={<Icon
                name="book" type="font-awesome" color="black"/>}
            bottomDivider
            />
        )
    }
    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader
                title="Notifications" navigation={this.props.navigation}/>
                {
                 this.state.allNotifications.length===0
                 ?(<View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                     <Text>
                         You Have No Notifications
                     </Text>
                 </View>)
                 :(
                    <SwipableFlatList
                    allNotifications={this.state.allNotifications}
                    />

                 )   
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:20
    },
    Button:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    text:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    })