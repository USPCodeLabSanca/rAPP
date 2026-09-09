import {StyleSheet, Text} from 'react-native'
import  {RFValue}  from "react-native-responsive-fontsize";

/*
Arquivo de estilização da página Info_rep
*/

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCEFDA',
        alignItems: 'flex-start',
        gap: 10,
    },
    card:{
        maxWidth: '90%',
        minHeight: 300,
        backgroundColor: 'white',
        borderRadius: 20,
        //overflow: 'hidden',
        margin: 16,
        padding: 12,
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
    },
    repImage:{
        flex: 1,
        maxWidth: '100%',
        maxHeight: 250,
        borderRadius: 20,
    },
    h1:{
        fontSize: RFValue(12,680),
        fontWeight: 'bold',
        color: '#666666',
    },
    h2:{
        fontSize: RFValue(9,680),
        fontWeight: 'light',
        color: '#666666',
    },
})