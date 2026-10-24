import {StyleSheet, Text} from 'react-native'
import  {RFValue}  from "react-native-responsive-fontsize";

/*
Arquivo de estilização da página Home
*/

export default StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#FCEFDA',
            alignItems: 'flex-start',
            gap: 10,
          },
          titulo: {
            padding: 16,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
          },
          container_cards:{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              flex: 1,
          },
          input: {
              height: 40,
              flex: 1,
              minWidth: 100,
              borderColor: '#ccc',
              backgroundColor: 'white',
              borderWidth: 1,
              borderRadius: 20,
              paddingHorizontal: 10,
              fontSize: RFValue(11, 680),
              marginHorizontal: 2,
          },
          choices:{
              padding: 10,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#E6D8BB',
              width: '100%',
          },
          container_tags:{
              paddingHorizontal: 10,
              alignItems: 'flex-start',
              gap: 8,
          }
    })
