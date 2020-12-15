import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Modal,ScrollView,KeyboardAvoidingView,Image } from 'react-native';
import {Header,Icon,Badge} from "react-native-elements"
import firebase from "firebase"
import db from "../config";


export default class MyHeader extends React.Component{
    constructor(props){
        super(props);
        this.state={
          value:"",
            userId:firebase.auth().currentUser.email,
        }
        
    }

    getNumberOfUnreadNotifications(){
        db.collection("all_notifications")
        .where("notification_status","==","UnRead")
        .where("targeted_user_id","==",this.state.userId)
        .onSnapshot((snapshot)=>{
            var UnreadNotifications=snapshot.docs.map((doc)=>{
                doc.data()
               
               
            })
            this.setState({
                value:UnreadNotifications.length
            })
        })
    }
    componentDidMount(){
        this.getNumberOfUnreadNotifications()
    }
    BellIconWithBadge=()=>{
        return(
            <View>
                <Icon
                name="bell" type="font-awesome" color="white" size={25}
                onPress={()=>{
                    this.props.navigation.navigate("Notification")
                }}
                />
                <Badge
                value={this.state.value}
                containerStyle={{position:"absolute",top:-4,right:-4}}
                />
            </View>
        )
    }
render(){
     return(
        <Header
        leftComponent={<Icon
        name="bars" type="font-awesome" color="black" onPress={()=>{
            this.props.navigation.toggleDrawer()
        }}/>}
        centerComponent={{text:this.props.title,style:{color:"blue",fontSize:20,fontWeight:"bold"}}}
        rightComponent={<this.BellIconWithBadge {...this.props}/>}
        backgroundColor="red"
        />
    )
}
   
}