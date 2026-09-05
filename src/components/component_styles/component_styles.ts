import {StyleSheet, Text} from 'react-native';
import  {RFValue}  from "react-native-responsive-fontsize";

export default StyleSheet.create({
    card:{
        flex: 1,
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
    },
    repImage:{
        flex: 1,
        maxWidth: '100%',
        borderRadius: 20,
    },
    h1:{
        fontSize: RFValue(12,680),
        fontWeight: 'bold',
    },
    h2:{
        fontSize: RFValue(9,680),
        fontWeight: 'light',
    },
    container_info_card:{
        margin: 6,
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        minWidth: '100%',
        flex: 1,
    },
    ratings:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    tags:{
        backgroundColor: 'lightBlue',
        borderRadius: 20,
        borderColor: 'blue',
        borderWidth: 1,
        padding: 5,
        fontWeight: 'light',
    },
    tag_styles:{
        flexDirection: 'row',
        gap: 6,
        minHeight: '10%',
        alignItems: 'flex-start',
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});