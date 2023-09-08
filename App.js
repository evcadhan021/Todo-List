import React, {Component} from 'react';
import {View,Text, TextInput, TouchableOpacity,FlatList,StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class App extends Component {
   constructor(props){
      super(props);
      this.state = {
         text: '',
         data:[],
         dataTampil:[],
         cari:'',
         index:'',
         editMode: false,
      };
   }
   componentDidMount(){
      this.getData();
   }


   create = (text) => {
      let data = this.state.data;
      
      data.push({item: text});

      this.setState({data,dataTampil: data});
      console.log('data',data);

      this.saveData(data);
   };
   saveData = async (data) => {
      try{
         await AsyncStorage.setItem('@database',JSON.stringify(data))
      }
      catch(e){
         console.log('save error', e);
      }
      this.setState({});
   };
   getData = async() => {
      try{
         let value = await AsyncStorage.getItem('@database');
         value = JSON.parse(value);

         if(value !== null) {
            this.setState({data:value,dataTampil: value});
            console.log(value)
         }
      }
      catch (e){
         console.log('get error',e)
      }
   };

   edit= () => {
      let data = this.state.data;

      data[this.state.index].item = this.state.text;

      this.setState({data, editMode: false ,text: '',dataTampil: data})
      this.saveData(data);
   }

   delete = () => {
      let data = this.state.data;

      data.splice(this.state.index, 1);

      this.setState({data,dataTampil: data});
      this.saveData(data);
   }

   cari = () => {
      let data = this.state.data;

      data = data.filter(item => item.item.toLowerCase().includes(this.state.cari.toLowerCase()));

      this.setState({dataTampil: data});
   }
   render (){
    return(
      <View style={{
         flex:1,backgroundColor:'silver'}}>
        <TextInput
         style={{height:40, borderColor:'gray',borderWidth:1,backgroundColor:'#0AA'}}
         onChangeText={(text) => this.setState({text})}
         value={this.state.text}
         placeholder='Masukkan Text'
         />
        <TouchableOpacity 
        style={{backgroundColor:'white'}} 
        onPress={() => this.state.editMode ? this.edit() : this.create(this.state.text)}>
            <Text style={styles.press}>Masukkan Data</Text>
        </TouchableOpacity>
        <FlatList
        style={{backgroundColor:'#bbdefb'}}
        data={this.state.dataTampil}
        renderItem={({item,index}) => (
         <ScrollView>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => this.setState({text: item.item,index,editMode: true})}>
                  <Text style={styles.item}>
                     {index}. {item.item}
                  </Text>
                  <TouchableOpacity 
                  style={{backgroundColor:'white',
                     paddingHorizontal:10,
                     padding:5,
                     borderRadius:10
                     }} onPress={() => this.setState({index}, () => this.delete())}>
                     <Text style={{fontWeight:'900'}}>X</Text>
                  </TouchableOpacity>
            </TouchableOpacity>
         </ScrollView>
        )}
      //   keyExtractor={(item) => item.id}
        />
         <TextInput
         style={{height:40, borderColor:'gray',borderWidth:1,backgroundColor:'#0AA'}}
         onChangeText={(text) => this.setState({cari: text}, () => this.cari())}
         value={this.state.cari}
         placeholder='Masukkan Pencarian'
         />
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
   press:{
      textAlign:'center',
      padding:10,
      backgroundColor:'#A7FFEB',
      letterSpacing:1,
      fontSize:15,
      fontWeight:'900',
   },
   button:{
      marginHorizontal:50,
      marginVertical:5,
      padding:10,
      borderRadius:5,
      backgroundColor:'#0AA',
      elevation:3,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
   },
   item:{
      fontWeight:'900',
   }

});