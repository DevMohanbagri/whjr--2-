import React,{Component} from 'react'
import {SafeAreaView, View, Text, FlatList, StyleSheet, Alert} from 'react-native'
import axios from 'axios';

export default class Details extends Component{
    constructor(props){
        super(props)
        this.state={
            listData : [],
            url: 'http://localhost:5000/'
        }
    }

    get_planets=()=>{
        const {url} = this.state
        axios
            .get(url)
            .then(response=>{
                return this.setState({listData: response.data.data})    
            })
            .catch(error=>{
                Alert.alert(error.message)
            })
    }

    componentDidMount(){
        this.get_planets()
    }

    renderItem=({item,index})=>(
        <ListItem
        key = {index}
        title = {`planet:${item.name}`}
        subtitle = {`Distance from Earth:${item.distance_from_earth}`}
        titleStyle = {styles.title}
        containerStyle = {styles.listContainer}
        bottomDivider
        chevron
        onPress={()=>
            this.props.navigation.navigate('Details', {planet_name:item.name})
        }
        />

    )
    keyExtractor=(item,index)=> index.toString()


    render() {
        const {listData} = this.state
        if(listData.length === 0){
            return(
                <View style = {styles.emptyContainer}>
                    <Text>Loading...</Text>     
                </View>
            )
        }
        else{
            return(
                <View style = {styles.container}>
                    <SafeAreaView/>
                    <View style = {styles.upperContainer}>
                        <Text style = {styles.headerText}>Planets World</Text>
                    </View>

                    <View style = {styles.lowerContainer}>
                        <FlatList 
                            keyExtractor={this.keyExtractor}
                            data={this.state.listData}
                            renderItem={this.renderItem}
                        />
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#edc988',
    },
    upperContainer:{
        flex:0.1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyContainer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyContainerText:{
        fontSize: 24
    },
    headerText:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#132743'
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#d7385e'
    },
    lowerConatiner:{
        flex:0.9
    },
    listConatiner:{
        backgroundColor: '#eeecda'
    }

})