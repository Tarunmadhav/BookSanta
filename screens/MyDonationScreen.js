import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Modal,ScrollView,KeyboardAvoidingView,FlatList } from 'react-native';
import {ListItem,Icon} from "react-native-elements"
import db from "../config";
import  firebase from "firebase"
import {MyHeader} from "../components/MyHeader"

export default class MyDonation extends React.Component{
    static navigationOptions={header:null}
    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            allDonations:[],
            userName:''
        }
        this.requestRef=null
    }
    getallDonations=()=>{
        this.requestRef=db.collection("all_donations").where("donor_id","==",this.state.userId)
            .onSnapshot((snapshot)=>{
            var allDonations=[]
            snapshot.docs.map((doc)=>{
                var Donations=doc.data()
                Donations["doc_id"]=doc.id
                allDonations.push(Donations)
            })
            this.setState({
                allDonations:allDonations
            })
        })

    }
    componentDidMount(){
        this.getallDonations();
    }
    componentWillUnmount(){
        this.requestRef()
    }
    getDonorDetails=()=>{
db.collection("users").where("emailId","==",this.state.userId)
.get()
.then(snapshot=>{
    snapshot.forEach(doc=>{
        this.setState({
           userName:doc.data().first_Name+""+doc.data().last_Name
        })
        
    })
})
    }
    keyExtractor=(item,index)=>index.toString()
    renderItem=({item,i})=>{
        return(
            <ListItem
            key={i}
            title={item.book_name}
            subtitle={"RequestedBy:"+item.requested_by+"\nStatus"+item.request_status}
            titleStyle={{color:"black",fontWeight:"bold"}}
            leftElement={<Icon
                name="book" type="font-awesome" color="black"/>}
            rightElement={
                <TouchableOpacity style={[styles.Button,
                {backgroundColor:item.request_status==="Book Sent"?"Green":"Red"}
                ]} onPress={()=>{
                    this.sendBook(item)
                }}>
<Text style={{color:"Red"}}>
{item.request_status==="Book Sent"?"Book Sent":"Send Book"}
</Text>
                </TouchableOpacity>
            }
            bottomDivider
            />
        )
    }
    sendBook=(bookDetails)=>{
if(bookDetails.request_status==="Book Sent"){
    var requestStatus="Donor Sent Book"
    db.collection("all_donations").doc(bookDetails.doc_id).update({
        "request_status":"Donor Sent Book"
    })
    this.sendNotification(bookDetails,requestStatus)
}
else{
    var requestStatus="Book Sent"
    db.collection("all_donations").doc(bookDetails.doc_id).update({
        "request_status":"Book Sent"
    })
    this.sendNotification(bookDetails,requestStatus)
}
    }
    sendNotification=(bookDetails,requestStatus)=>{
        var requestId=bookDetails.request_id
        var donorId=bookDetails.donor_id
        db.collection("all_notification").where("reqest_id","==",requestId)
        .where("donor_id","==",donorId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                var message=""
                if(requestStatus==="Book Sent"){
                    message=this.state.donorName+"Sent You A Book"
                }
                else{
                    message=this.state.donorName+"Shown Intrest To Sent You A Book"
                }
                db.collection("all_notifications").doc(doc_id).update({
                    message:message,
                    notification_status:"UnRead",
                    date:firebase.firestore.FieldValue.serverTimestamp(),
                })
                this.setState({
                   userName:doc.data().first_Name+""+doc.data().last_Name
                })
                
            })
        })
    }
    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader
                title="My Donations" navigation={this.props.navigation}/>
                {
                 this.state.allDonations.length===0
                 ?(<View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                     <Text>
                         List Of All Donated Books
                     </Text>
                 </View>)
                 :(
                     <FlatList
                     keyExtractor={this.keyExtractor}
                     data={this.state.allDonations}
                    renderItem={this.renderItem}
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