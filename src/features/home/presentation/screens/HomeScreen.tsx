import React, { useMemo } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../styles';
import Card from '../../../../shared/ui/RepCards';
import DropDownInput from '../../../../shared/ui/dropDownInput';
import Tag from '../../../../shared/ui/tags';
import { useNavigation } from '@react-navigation/native';
import { useHome } from '../hooks/useHome';
import { formatPreco } from '../../../../shared/domain/format';
import type { Tag as TagType } from '../../../../shared/domain/types';

const categoryOrder = ['genero', 'refeicao', 'universidade', 'convivencia'];
const genderOrder = ['Mista', 'Masculina', 'Feminina'];
const priceOptions = ['Qualquer preço', 'Até R$ 700', 'R$ 700 a R$ 1.000', 'Acima de R$ 1.000'];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { q, setQ, tags, selected, setSelected, toggle, setFaixa, republicas, metricas, loading, error } = useHome();

  const orderedTags = useMemo(() => {
    return [...tags].sort((a: TagType, b: TagType) => {
      const category = categoryOrder.indexOf(a.categoria) - categoryOrder.indexOf(b.categoria);
      if (category !== 0) return category;
      if (a.categoria === 'genero') return genderOrder.indexOf(a.nome) - genderOrder.indexOf(b.nome);
      return a.nome.localeCompare(b.nome, 'pt-BR');
    });
  }, [tags]);

  const totalLabel =
    metricas?.total === 1 ? '1 república cadastrada' : `${metricas?.total ?? 0} repúblicas cadastradas`;

  return (
    <ScrollView style={styles.screenScroll} contentContainerStyle={styles.container}>
      <View style={styles.searchBarRow}>
        <TextInput
          style={styles.input}
          placeholder="Buscar república..."
          placeholderTextColor="#8A8179"
          value={q}
          onChangeText={setQ}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          <TouchableOpacity
            style={[styles.clearPill, selected.length > 0 && styles.clearPillOff]}
            onPress={() => setSelected([])}
          >
            <Text style={[styles.clearText, selected.length > 0 && styles.clearTextOff]}>Todas</Text>
          </TouchableOpacity>
          <DropDownInput options={priceOptions} defaultText="Qualquer preço" onSelect={(item) => setFaixa(item)} />
          {orderedTags.map((tag) => (
            <Tag
              key={tag.id}
              name={tag.nome}
              filter
              selected={selected.includes(tag.id)}
              onPress={() => toggle(tag.id)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.heroSection}>
        <Text style={styles.heroCategory}>Catálogo de repúblicas</Text>
        <Text style={styles.heroTitle}>
          Encontre sua <Text style={styles.heroHighlight}>república</Text> em São Carlos
        </Text>
        <Text style={styles.heroSubtitle}>{totalLabel} · São Carlos</Text>
      </View>

      {metricas ? (
        <View style={styles.metrics}>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{metricas.total}</Text>
            <Text style={styles.metricLabel}>cadastradas</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{formatPreco(metricas.precoMedio)}</Text>
            <Text style={styles.metricLabel}>preço médio</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{metricas.comFotos}</Text>
            <Text style={styles.metricLabel}>com fotos</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{metricas.semLocalizacao}</Text>
            <Text style={styles.metricLabel}>sem localização</Text>
          </View>
        </View>
      ) : null}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {loading && republicas.length === 0 ? (
        <Text style={styles.status}>Carregando catálogo...</Text>
      ) : republicas.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Nenhuma república encontrada</Text>
          <Text style={styles.emptyText}>Ajuste a busca ou limpe os filtros para ver o catálogo de São Carlos.</Text>
        </View>
      ) : (
        <View style={styles.container_cards}>
          {republicas.map((republica) => (
            <TouchableOpacity
              key={republica.id}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('Info_rep', { id: republica.id })}
            >
              <Card republica={republica} />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
