import React, { useState } from 'react';
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

//Componente de localização do Google - útil para colocar a localização da rep
//Não está funciando, pois falta configurar a API gratuita do Google
//Entrem no google cloud console, lá vocês encontrarão a API necessária
export default function LocalizacaoInput() {
  const [endereco, setEndereco] = useState<any>(null);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <GooglePlacesAutocomplete
        fetchDetails={true}
        onPress={(data, details = null) => {
          // data: texto simples da localização
          // details: inclui latitude, longitude, cidade, etc.
          setEndereco({
            descricao: data.description,
            lat: details?.geometry.location.lat,
            lng: details?.geometry.location.lng,
          });
        }}
        query={{
          key: 'AIzaSyAncq9ysceZk21WunO68VolJtstQ_jPTuA',
          language: 'pt-BR',
        }}
        styles={{
          textInput: {
              height: 45,
              borderRadius: 20,
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#ccc',
              paddingHorizontal: 15,
            },
            listView: {
              backgroundColor: 'white',
              borderRadius: 10,
              elevation: 5, // Exibe a lista por cima no Android
              zIndex: 1000,
            },
        }}
      />
    </View>
  );
}
