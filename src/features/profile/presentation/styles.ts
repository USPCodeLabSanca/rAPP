import {StyleSheet, Text} from 'react-native'
import  {RFValue}  from "react-native-responsive-fontsize";

/*
Arquivo de estilização da página Info_rep
*/

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FCEFDA' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' },
    loadingText: { fontSize: 16, color: '#666' },

    bannerImage: { width: '100%', height: 240, resizeMode: 'cover' },
    contentContainer: { padding: 20, borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -20, backgroundColor: '#FCEFDA' },

    title: { fontSize: 26, fontWeight: 'bold', color: '#333' },
    location: { fontSize: 14, color: '#666', marginTop: 4 },

    divider: { height: 1, backgroundColor: '#D4D4D4', marginVertical: 18 },

    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 12 },
    tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    descriptionText: { fontSize: 15, color: '#555', lineHeight: 22 },

    contactButton: {
      backgroundColor: '#F26E21',
      paddingVertical: 14,
      borderRadius: 25,
      alignItems: 'center',
      marginTop: 24,
    },
    contactButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
})
