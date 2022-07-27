import React,{Component} from 'react'
import {SafeAreaView, Style, View, Text, FlatList, StyleSheet, Alert} from 'react-native'
import Cards from 'react-native-elements';

export default class Details extends Component{
    constructor(props) {
        super(props)
        this.state={
            details: {},
            imagePath: '',
            url : `http://localhost:5000/planet?name=${this.props.navigation.getParam("planet_name")}`,
    }

    setDetails=(planetDetails)=>{
        const planetType = planetDetails.planet_type
        imagePath = ''
        switch(planetType){
            case 'Gas Giant':
                imagePath = require('../assets/gas_giant.png')
                break;
            case 'Terrestrial':
                imagePath = require('../assets/terrestrial.png')
                break;
            case 'Super Earth':
                imagePath = require('../assets/super_earth.png')
                break;
            case 'Neptune Like':
                imagePath = require('../assets/neptune_like.png')
                break;
            default: imagePath = require('../assets/gas_giant.png')
        }
        this.setState({
            imagePath: imagePath,
            details: planetDetails
        })
    }

    getDetails=()=>{
        const {url} = this.state
        axios
            .get(url)
            .then(response=>{
                this.setDetails(response.data.data)
            })
            .catch(error=>{
                Alert.alert(error.message)
            })
    }
    
    }
    render() {
        const {details, imagePath} = this.state
        if(details.specifications){
            return(
                <View style = {styles.container}>
                    <Card 
                        title = {details.name}
                        image = {imagePath}
                        imageProps = {{resizeMode: 'contain', width: '100%'}}
                    >
                        <View>
                            <Text style = {styles.cardItem}>
                                {`Distance from Earth:${detials.distance_from_earth}`}
                            </Text>
                            <Text style = {styles.cardItem}>
                                {`Distance from their Sun:${detials.distance_from_their_sun}`}
                            </Text>
                            <Text style = {styles.cardItem}>
                                {`Distance from Earth:${detials.gravity}`}
                            </Text>
                            <Text style = {styles.cardItem}>
                                {`Distance from Earth:${detials.orbital_period}`}
                            </Text>
                            <Text style = {styles.cardItem}>
                                {`Distance from Earth:${detials.orbital_speed}`}
                            </Text>
                            <Text style = {styles.cardItem}>
                                {`Distance from Earth:${detials.planet_mass}`}
                            </Text>
                            <Text style = {styles.cardItem}>
                                {`Distance from Earth:${detials.planet_type}`}
                            </Text>
                        </View>
                        <View style = {[styles.cardItem,{flexDirection: "column"}]}>
                            <Text>
                                {details.specifications? `Specifications : ` : ""}
                            </Text>
                            {details.specifications.map((item, index)=>(
                                <Text key = {index.toString()} style = {{marginLeft: 50}}>
                                    {item}
                                </Text>
                            ))}
                        </View>
                    </Card>
                </View>
            )
        }
        return null
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    cardItem:{
        marginBottom: 10
    }
})