import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  cardContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e7e0d6',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 190,
    backgroundColor: '#efe6da',
  },
  repImage: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e85d2c',
  },
  fallbackLetter: {
    color: '#fff',
    fontSize: 64,
    fontWeight: '800',
  },
  tipoBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 252, 248, 0.94)',
  },
  tipoMista: { backgroundColor: 'rgba(255, 252, 248, 0.94)' },
  tipoFeminina: { backgroundColor: '#fde7f3' },
  tipoMasculina: { backgroundColor: '#e7f0ff' },
  tipoBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2a2420',
  },
  tipoTextFeminina: { color: '#9d174d' },
  tipoTextMasculina: { color: '#1d4e89' },
  cardContent: {
    padding: 16,
    gap: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#221C18',
  },
  cardLocation: {
    fontSize: 14,
    color: '#6f675f',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 4,
  },
  priceValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#e85d2c',
  },
  pricePeriod: {
    fontSize: 14,
    color: '#6f675f',
    fontWeight: '500',
  },
});
