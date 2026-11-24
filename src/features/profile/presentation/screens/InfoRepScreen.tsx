import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import api from '../../../../shared/http/api';
import Tag from '../../../../shared/ui/tags';
import styles from '../styles';
import {
  featureTags,
  formatCep,
  formatDistancia,
  formatPhone,
  formatPreco,
  genderOf,
  instagramLink,
  mapaLink,
  whatsappLink,
} from '../../../../shared/domain/format';
import type { Foto, PontoReferencia, Republica } from '../../../../shared/domain/types';

export default function InfoRepScreen({ route }: any) {
  const { id } = route.params || {};
  const [rep, setRep] = useState<Republica | null>(null);
  const [pontos, setPontos] = useState<PontoReferencia[]>([]);
  const [fotoId, setFotoId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    let active = true;
    api
      .get<Republica>(`/republicas/${id}`)
      .then(async (response) => {
        if (!active) return;
        setRep(response.data);
        const principal = response.data.fotos.find((foto) => foto.ePrincipal) ?? response.data.fotos[0];
        setFotoId(principal?.id ?? null);
        const local = response.data.localizacao;
        const pontosResponse = await api.get<PontoReferencia[]>('/pontos-referencia', {
          params: local ? { lat: local.latitude, lon: local.longitude } : undefined,
        });
        if (active) setPontos(pontosResponse.data);
      })
      .catch(() => {
        if (active) setError('Não foi possível abrir esta república.');
      });
    return () => {
      active = false;
    };
  }, [id]);

  if (error && !rep) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>{error}</Text>
      </View>
    );
  }

  if (!rep) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando república...</Text>
      </View>
    );
  }

  const genero = genderOf(rep.tags);
  const tags = featureTags(rep.tags);
  const ativa: Foto | undefined = rep.fotos.find((foto) => foto.id === fotoId) ?? rep.fotos[0];
  const local = rep.localizacao;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.gallery}>
        {ativa ? (
          <Image style={styles.bannerImage} source={{ uri: ativa.urlImagem }} resizeMode="cover" />
        ) : (
          <View style={styles.fallback}>
            <Text style={styles.fallbackLetter}>{rep.nome.slice(0, 1)}</Text>
          </View>
        )}
        {rep.fotos.length > 1 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.thumbs}>
            {rep.fotos.map((foto) => (
              <TouchableOpacity
                key={foto.id}
                style={[styles.thumb, foto.id === ativa?.id && styles.thumbOn]}
                onPress={() => setFotoId(foto.id)}
              >
                <Image style={styles.thumbImage} source={{ uri: foto.urlImagem }} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : null}
      </View>

      <View style={styles.content}>
        <View>
          <Text style={styles.eyebrow}>República em São Carlos</Text>
          <Text style={styles.title}>{rep.nome}</Text>
          <Text style={styles.location}>
            {local ? `${local.bairro} · São Carlos, SP` : 'Localização ainda não informada'}
          </Text>
        </View>

        <View style={styles.panel}>
          <Text>
            <Text style={styles.price}>{formatPreco(rep.precoMensal)}</Text>
            <Text style={styles.pricePeriod}>/mês</Text>
          </Text>
          <View style={styles.tagsContainer}>
            {genero ? <Tag name={genero.nome} categoria="genero" /> : null}
            {tags.map((tag) => (
              <Tag key={tag.id} name={tag.nome} categoria={tag.categoria} />
            ))}
          </View>
          <Text style={styles.descriptionText}>{rep.descricao}</Text>
          <View>
            <Text style={styles.metaLabel}>WhatsApp</Text>
            <Text style={styles.metaValue}>{formatPhone(rep.whatsapp)}</Text>
          </View>
          <View>
            <Text style={styles.metaLabel}>Instagram</Text>
            <Text style={styles.metaValue}>@{rep.instagram.replace(/^@/, '')}</Text>
          </View>
          {local ? (
            <View>
              <Text style={styles.metaLabel}>Endereço</Text>
              <Text style={styles.metaValue}>
                {local.logradouro}, {local.numero} · {local.bairro}
                {local.cep ? ` · ${formatCep(local.cep)}` : ''}
              </Text>
            </View>
          ) : null}
          <TouchableOpacity style={styles.contactButton} onPress={() => Linking.openURL(whatsappLink(rep.whatsapp, rep.nome))}>
            <Text style={styles.contactButtonText}>Conversar no WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ghostButton} onPress={() => Linking.openURL(instagramLink(rep.instagram))}>
            <Text style={styles.ghostButtonText}>Abrir Instagram</Text>
          </TouchableOpacity>
        </View>

        {local ? (
          <View style={styles.panel}>
            <Text style={styles.sectionTitle}>Localização</Text>
            <Text style={styles.hint}>
              Distância em linha reta até os campi e referências de São Carlos, a mesma conta do painel.
            </Text>
            {pontos.map((ponto) => (
              <View key={ponto.id} style={styles.pointRow}>
                <Text style={styles.pointName}>{ponto.nome}</Text>
                <Text style={styles.pointDistance}>{formatDistancia(ponto.distanciaMetros)}</Text>
              </View>
            ))}
            <TouchableOpacity
              style={styles.ghostButton}
              onPress={() => Linking.openURL(mapaLink(local.latitude, local.longitude))}
            >
              <Text style={styles.ghostButtonText}>Abrir no mapa</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}
