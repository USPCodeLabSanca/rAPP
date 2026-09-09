import api from '../../services/api';
import DocumentPicker, { types, isCancel } from 'react-native-document-picker';

/*
arquivo com funções auxiliares para o Forms
*/


//função que envia os dados do Forms para o servidor via api
export async function enviaDados(
  type: number,
  nome: string | null,
  email: string | null,
  senha: string | null,
  navigation: any,
  tags: Record<string,boolean> | null,
  desc: string | null,
  insta: string | null,
) {
  if (nome || email || senha) {
    try {
      if (type === 1) {
        await api.post('/users', { nome, email, senha });
      } else if (type === 2) {
       const tagsArray = tags
         ? Object.entries(tags)
             .filter(([_, selecionado]) => selecionado)
             .map(([nomeTag]) => nomeTag)
         : [];

        await api.post('/reps', { nome, senha, email, insta, desc, tags: tagsArray });
      }

      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  }
}

//PRECISA CORRIGIR
//A ideia dessa função é pegar imagens para as fotos da república
//essas fotos ficarão no carrossel de fotos que aparecerá ao clicar em uma república
export const pegaImagem = async () => {
  try {
    const res = await DocumentPicker.pick({
      type: [types.images],
    });
    return res[0];
  } catch (err) {
    if (!isCancel(err)) {
      console.error(err);
    }
    return null;
  }
};