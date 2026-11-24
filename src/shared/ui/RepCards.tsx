import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './component_styles/component_styles';
import Tag from './tags';
import { capaOf, featureTags, formatPreco, genderOf } from '../domain/format';
import type { Republica } from '../domain/types';

const emoji: Record<string, string> = {
  Mista: '👥',
  Masculina: '👨',
  Feminina: '👩',
};

export default function Card({ republica }: { republica: Republica }) {
  const capa = capaOf(republica.fotos);
  const genero = genderOf(republica.tags);
  const tags = featureTags(republica.tags).slice(0, 3);
  const generoNome = genero?.nome ?? '';
  const isFeminina = generoNome === 'Feminina';
  const isMasculina = generoNome === 'Masculina';

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageWrapper}>
        {capa ? (
          <Image style={styles.repImage} source={{ uri: capa.urlImagem }} resizeMode="cover" />
        ) : (
          <View style={styles.fallback}>
            <Text style={styles.fallbackLetter}>{republica.nome.slice(0, 1)}</Text>
          </View>
        )}
        {genero ? (
          <View style={[styles.tipoBadge, isFeminina ? styles.tipoFeminina : isMasculina ? styles.tipoMasculina : styles.tipoMista]}>
            <Text style={[styles.tipoBadgeText, isFeminina ? styles.tipoTextFeminina : isMasculina ? styles.tipoTextMasculina : null]}>
              {emoji[genero.nome] ? `${emoji[genero.nome]} ` : ''}
              {genero.nome}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {republica.nome}
        </Text>
        <Text style={styles.cardLocation} numberOfLines={1}>
          {republica.localizacao?.bairro ?? 'São Carlos'} · São Carlos, SP
        </Text>
        <View style={styles.tagsRow}>
          {tags.map((tag) => (
            <Tag key={tag.id} name={tag.nome} categoria={tag.categoria} />
          ))}
        </View>
        <View style={styles.bottomRow}>
          <Text>
            <Text style={styles.priceValue}>{formatPreco(republica.precoMensal)}</Text>
            <Text style={styles.pricePeriod}>/mês</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
