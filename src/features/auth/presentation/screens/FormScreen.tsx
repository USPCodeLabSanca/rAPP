import React, {useState} from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styles';
import { useNavigation } from '@react-navigation/native';
import Tag from '../../../../shared/ui/tags';
import api from '../../../../shared/http/api';
import * as uteis from '../helper';
import LocalizacaoInput from '../../../../shared/ui/location';

/*
Essa página se refere ao campo de registro e login de repúblicas
É necessário deletar a parte de usuários
Página complexa, porém reduziu de três arquivos para um só, já que possuíam componentes parecidos
*/

/*
  type = 0 -> tela de login
  type = 1 -> tela de cadastro
*/

interface FormProps {
  type: number;
}

export default function FormScreen({ type }: FormProps) {

  const navigation = useNavigation();

  const opcoes = ["Jantar","Almoço","USP","UFSCAR","Mista","Feminina","Masculina","Faxineira", "Sem trote"];

  //hooks dos dados de ambos clientes
  const [nome,setNome] = useState<string | null>(null);
  const [email,setEmail] = useState<string | null>(null);
  const [senha,setSenha] = useState<string | null>(null);

  //hooks exclusivos da rep
  const [image,setImage] = useState<any>(null); //imagem de plano de fundo
  const [insta,setInsta] = useState<string | null>(null); //instagram
  const [desc,setDesc] = useState<string | null>(null); //Descrição
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
       >
        <Image
          source={require('../../../../assets/logoRapp-removebg-preview.png')}
          style={styles.logo}
        />

        {/* Inputs do nome da República (Apenas Cadastro de República) */}
        {type === 1 ? (
          <TextInput
            style={styles.input}
            placeholder="Nome da República"
            placeholderTextColor="#999"
            onChangeText = {setNome}
            value = {nome || ''}
          />
        ) : null}

        {/* Inputs Padrão */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          onChangeText = {setEmail}
          value = {email || ''}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          placeholderTextColor="#999"
          onChangeText = {setSenha}
          value = {senha || ''}
        />

        {/* Instagram para contato*/}
        {type === 1 ? (
          <TextInput
            style={styles.input}
            placeholder="Instagram da rep"
            placeholderTextColor="#999"
            onChangeText = {setInsta}
            value = {insta || ''}
          />
        ) : null}

        {/* Descrição da república */}
        {type === 1 ? (
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
                    value = {desc || ''}
                  />
                </View>
            </View>
        ) : null}

        {/* Inputs de checkList das características de cada rep*/}
        {type === 1 ? (
            <View style = {{alignItems:'center', gap: 8,}}>
              <View>
                <Text style = {styles.commonText}>Coloque as opções que sua rep oferece:</Text>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', }}>
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
