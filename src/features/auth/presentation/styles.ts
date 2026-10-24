import {StyleSheet, Text} from 'react-native';
import  {RFValue}  from "react-native-responsive-fontsize";

//Estilização da página do Forms
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCEFDA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card_login:{
        maxWidth: '80%',
        minHeight: 400,
        backgroundColor: 'white',
        borderRadius: 20,
        //overflow: 'hidden',
        margin: 16,
        padding: 12,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
    },
    logo:{
          width: 200,
          height: 200,
    },
    input: {
          height: 40,
          minWidth: '90%',
          borderColor: '#ccc',
          backgroundColor: 'white',
          borderWidth: 1,
          borderRadius: 20,
          paddingHorizontal: 10,
          fontSize: RFValue(12,680),
    },
    button:{
          height: 32,
          minWidth: '60%',
           justifyContent: 'center',
           alignItems: 'center',
           borderRadius: 20,
           backgroundColor: '#F26E21',
           paddingBottom: 8,
           paddingTop: 5,
           paddingHorizontal: 12,
    },
    button_text:{
        color: 'white',
        fontSize: RFValue(12,680),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    commonText:{
        color:'#F26E21',
        textAlign:'center',
        fontSize: 15,
        fontWeight:'bold',
    },
})
