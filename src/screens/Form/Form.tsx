import {React, useState} from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Tag from '../../components/tags';
import api from '../../services/api';
import * as uteis from './helper';
import LocalizacaoInput from '../../components/location';

/*
Essa página se refere ao campo de registro e login de repúblicas
É necessário deletar a parte de usuários
Página complexa, porém reduziu de três arquivos para um só, já que possuíam componentes parecidos
*/

/*
  type = 0 -> tela de login
  type = 1 -> tela de cadastro de usuário
  type = 2 -> tela de cadastro de república
*/

interface FormProps {
  type: number;
}

export default function Form({ type }: FormProps) {

  const navigation = useNavigation();

  const opcoes = ["Jantar","Almoço","USP","UFSCAR","Mista","Feminina","Masculina","Faxineira", "Sem trote"];

  //hooks dos dados de ambos clientes
  const [nome,setNome] = useState(null);
  const [email,setEmail] = useState(null);
  const [senha,setSenha] = useState(null);

  //hooks exclusivos da rep
  const [image,setImage] = useState(null); //imagem de plano de fundo
  const [insta,setInsta] = useState(null); //instagram
  const [desc,setDesc] = useState(null); //Descrição
  //o que a rep oferece
  const [tagsSelecionadas, setTagsSelecionadas] = useState<Record<string, boolean>>({
    'Jantar': false,
    'Almoço': false,
    'USP': false,
    'UFSCAR': false,
    'Mista': false,
    'Feminina': false,
    'Masculina': false,
    'Faxineira': false,
    'Sem trote': false,
    'Faz festas': false,
  });

  const handleToggleTag = (tagName: string) => {
    setTagsSelecionadas((prev) => ({
      ...prev,
      [tagName]: !prev[tagName],
    }));
  };

  return (
    <View style={styles.container}>
      <ScrollView vertical={true}
       showsHorizontalScrollIndicator={false}
       contentContainerStyle={styles.card_login}
       keyboardShouldPersistTaps="handled"
       listViewDisplayed="auto"
       >
        <Image
          source={require('../../assets/logoRapp-removebg-preview.png')}
          style={styles.logo}
        />

        {/* Input Nome do Usuário (Apenas Cadastro de Usuário) */}
        {type === 1 ? (
          <TextInput
            style={styles.input}
            placeholder="Nome do usuário"
            placeholderTextColor="#999"
            onChangeText = {setNome}
            value = {nome}
          />
        ) : null}

        {/* Inputs do nome da República (Apenas Cadastro de República) */}
        {type === 2 ? (
          <TextInput
            style={styles.input}
            placeholder="Nome da República"
            placeholderTextColor="#999"
            onChangeText = {setNome}
            value = {nome}
          />
        ) : null}

        {/* Inputs Padrão */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          onChangeText = {setEmail}
          value = {email}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          placeholderTextColor="#999"
          onChangeText = {setSenha}
          value = {senha}
        />

        {/* Instagram para contato*/}
        {type === 2 ? (
          <TextInput
            style={styles.input}
            placeholder="Instagram da rep"
            placeholderTextColor="#999"
            onChangeText = {setInsta}
            value = {insta}
          />
        ) : null}

        {/* Localização da rep*/}
        {/* NECESSÁRIO MEXER KKKKKK, boa sorte a quem tentar */}
        {/*{type === 2 ? (
            <View style={{gap:8,zIndex: 1000}}>
              <Text style = {styles.commonText}>Selecione a localização da sua república!</Text>
              <View style={{zIndex: 1000,
                 minWidth: '90%',
                 }}
              >
                <LocalizacaoInput/>
              </View>
            </View>
        ) : null}*/}

        {/* Descrição da república */}
        {type === 2 ? (
            <View style = {{gap:8,}}>
                <View>
                  <Text style={styles.commonText}>
                  Adicione uma descrição da sua rep!
                  </Text>
                </View>
                <View>
                  <TextInput
                    style={[styles.input, {height:100,}]}
                    placeholder=""
                    placeholderTextColor="#999"
                    onChangeText = {setDesc}
                    value = {desc}
                  />
                </View>
            </View>
        ) : null}

        {/* DocumentPicker para pegar a foto da rep */}
        {/* NECESSÁRIO CORRIGIR*/}
        {/*{type === 2 ? (
            <View style={{gap:8,}}>
                <View>
                    <Text style = {styles.commonText}>Envie uma foto da sua rep</Text>
                </View>
                <TouchableOpacity
                style = {[styles.input, {paddingTop:7,backgroundColor:'#F26E21',}]}

                onPress={async () => {
                  const img = await uteis.pegaImagem();
                  setImage(img);
                }}
                >
                    <Text style = {{textAlign: 'center',color:'white',}}>Carregar arquivo</Text>
                </TouchableOpacity>
            </View>
        ) : null}*/}

        {/* Inputs de checkList das características de cada rep*/}
        {type === 2 ? (
            <View style = {{alignItemns:'center', gap: 8,}}>
              <View>
                <Text style = {styles.commonText}>Coloque as opções que sua rep oferece:</Text>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', }}>
                {/* Adicionadas as chaves envolventes no opcoes.map */}
                {opcoes.map((el, index) => (
                  <View key={index}>
                    <Tag name={el}
                    isSelected={!!tagsSelecionadas[el]}
                    onPress={() => handleToggleTag(el)}/>
                  </View>
                ))}
              </View>
            </View>
        ) : null}

        {/* Botão Principal */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => uteis.enviaDados(type, nome, email, senha, navigation, tagsSelecionadas, desc, insta)}
        >
          <Text style={styles.button_text}>
            {type === 0 ? "Entrar" : "Cadastrar"}
          </Text>
        </TouchableOpacity>

        {/* Botão Secundário de Navegação (Apenas na tela de Login) */}
        {type === 0 ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('choice' as never)}
          >
            <Text style={styles.button_text}>Cadastrar</Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </View>
  );
}