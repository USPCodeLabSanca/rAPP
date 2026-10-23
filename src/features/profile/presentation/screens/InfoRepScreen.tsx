import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import api from '../../../../shared/http/api';
import Tag from '../../../../shared/ui/tags';
import styles from '../styles';

export default function InfoRepScreen({ route }: any) {
  const { id } = route.params || {};
  const [rep, setRep] = useState<any>(null);

  async function loadRep() {
    try {
      const repsFromApi = await api.get(`/reps?id=${id}`);
      if (repsFromApi.data && repsFromApi.data.length > 0) {
        setRep(repsFromApi.data[0]);
      }
    } catch (error) {
      console.error("Erro ao buscar república:", error);
    }
  }

  useEffect(() => {
    if (id) {
      loadRep();
    }
  }, [id]);

  if (!rep) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando dados da república...</Text>
      </View>
    );
  }

  // Função para abrir o Instagram diretamente
  const abrirInstagram = () => {
    if (rep.insta) {
      const cleanInsta = rep.insta.replace('@', '');
      Linking.openURL(`https://instagram.com/${cleanInsta}`);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Imagem de Capa no Topo */}
      <Image
        style={styles.bannerImage}
        source={require('../../../../shared/ui/foto_banner.jpg')}
      />

      <View style={styles.contentContainer}>
        {/* Título e Localização */}
        <Text style={styles.title}>{rep.nome}</Text>
        <Text style={styles.location}>📍 Entrada da arquitetura - São Carlos, SP</Text>

        <View style={styles.divider} />

        {/* Seção do que a Rep Oferece (Tags) */}
        <Text style={styles.sectionTitle}>O que essa rep oferece/características</Text>
        <View style={styles.tagsContainer}>
          {
              Array.isArray(rep.tags) && rep.tags.length > 0 ? (
                  rep.tags.map((el : string, idx: number) => (
                      <Tag name={el} key={idx} selected={true}/>
                  ))
              ):(
                  <Text style={{ color: '#666' }}>Nenhuma característica informada.</Text>
              )
          }
        </View>

        <View style={styles.divider} />

        {/* Descrição */}
        <Text style={styles.sectionTitle}>Sobre a república</Text>
        <Text style={styles.descriptionText}>
          {rep.descr || "Sem descrição informada no momento."}
        </Text>

        {/* Botão de Contato / Instagram */}
        {rep.insta ? (
          <TouchableOpacity style={styles.contactButton} onPress={abrirInstagram}>
            <Text style={styles.contactButtonText}>📸 Ver no Instagram ({rep.insta})</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </ScrollView>
  );
}
