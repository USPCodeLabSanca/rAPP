import {StyleSheet, Text} from 'react-native';
import  {RFValue}  from "react-native-responsive-fontsize";

/*
Arquivo de estilização dos componentes universais
*/

export default StyleSheet.create({
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
        alignItems: 'center',
        gap: 8,
    },
    repImage:{
        flex: 1,
        maxWidth: '100%',
        maxHeight: 150,
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
    container_info_card:{
        margin: 6,
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        minWidth: '100%',
        gap: 8,
        flex: 1,
    },
    ratings:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    tags:{
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E6D8BB',
        paddingHorizontal: 12,
        paddingBottom: 8,
        paddingTop: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tag_styles:{
        flexDirection: 'row',
        gap: 6,
        alignItems: 'flex-start',
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
