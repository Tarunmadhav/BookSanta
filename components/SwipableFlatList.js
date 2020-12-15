import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Modal,ScrollView,KeyboardAvoidingView,FlatList,Animated } from 'react-native';
import {ListItem,Icon} from "react-native-elements"
import db from "../config";
import  fiebase from "firebase"
import MyHeader from "../components/MyHeader"
import { Dimensions } from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view'

export default class SwipableFlatList extends React.Component{
    constructor(props){
        super(props);
        this.state={
           allNotifications:this.props.allNotifications
        }
    }
    onSwipeValueChange=swipeData=>{
        var allNotifications=this.state.allNotifications
        const {key,value} = swipeData
        if(value<-Dimensions.get("window").width){
     const newData=[...allNotifications]
     const prevIndex=allNotifications.findIndex(item=>item.key===key)
     this.updateMarkAsRead(allNotifications[prevIndex])
     newData.splice(prevIndex,1)
     this.setState({
         allNotifications:newData
     })
     
     }
     }
     updateMarkAsRead=(notification)=>{
         db.collection("all_notifications").doc(notification.doc_id).update({
             notification_status:"Read"
         })
     }

     renderItem=data=>{
      <Animated.View>

     
            <ListItem
           
            title={data.item.book_name}
            subtitle={data.item.message}
            titleStyle={{color:"black",fontWeight:"bold"}}
            leftElement={<Icon
                name="book" type="font-awesome" color="black"/>}
          
            bottomDivider
            />
             </Animated.View>
        
    }
    renderHiddenItem=()=>{
        <View style={styles.rowBack}>
            <View style={[styles.backRightButton,styles.backButton]}>
<Text style={styles.backText}>

</Text>
            </View>
        </View>
    }
    render(){
        return(
            <View style={{flex:0.8}}>
<SwipeListView
disableRightSwipe
data={this.state.allNotifications}
renderItem={this.renderItem}
renderHiddenItem={this.renderHiddenItem}
rightOpenValue={-Dimensions.get("window").width}
previewRowKey={"0"}
previewOpenValue={-40}
previewOpenDelay={3000}
onSwipeValueChange={this.onSwipeValueChange}
/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    backButton:{
        backgroundColor:"blue",
        right:0,

    },
    backRightButton:{
        alignItems:"center",
        bottom:0,
        justifyContent:"center",
        top:0,
    width:100
    },
rowBack:{
    alignItems:"center",
    backgroundColor:"pink",
    flexDirection:"row",
    justifyContent:"center",
    paddingLeft:15
},
backText:{
    fontWeight:"bold",
    fontSize:15,
    color:"Black"
}
    })