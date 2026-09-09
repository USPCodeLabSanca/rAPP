import {StyleSheet, Text} from 'react-native'
import  {RFValue}  from "react-native-responsive-fontsize";

/*
Arquivo de estilização da página Cadastro
*/

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCEFDA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card_login:{
        maxWidth: '60%',
        minHeight: 300,
        backgroundColor: 'white',
        borderRadius: 20,
        //overflow: 'hidden',
        margin: 16,
        padding: 12,
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
    },
    logo:{
          width: 200,
          height: 200,
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
    container_text:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: -40,
        marginBottom: 10,
    },
    text:{
        textAlign: 'center',
    },
})