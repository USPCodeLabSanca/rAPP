import {StyleSheet, Text} from 'react-native'
import  {RFValue}  from "react-native-responsive-fontsize";

export default StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#FFE5B4',
          },
          titulo: {
            padding: 16,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
          },
          container_cards:{
              minWidth: 300,
              alignItems: 'center',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
          },
          input: {
              height: 40,
              minWidth: '40%',
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 10,
              fontSize: RFValue(12,680),
          },
          choices:{
              padding: 16,
              justifyContent: 'space-between',
              flexDirection: 'row',
          },
          container_tags:{
              maxWidth: '70%',
              height: '10%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              gap: 8,
          }
    })