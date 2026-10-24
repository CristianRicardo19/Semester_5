import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const InfoCard = ({ title, status, onPress }) => {
  // Syarat Soal 1: Hijau untuk 'selesai', Oranye untuk 'proses'
  const isCompleted = status?.toLowerCase() === 'selesai';
  const statusColor = isCompleted ? '#059669' : '#EA580C'; // Hijau Emerald vs Oranye Terang
  const badgeBgColor = isCompleted ? '#D1FAE5' : '#FFEDD5';

  return (
    <View style={[styles.card, { borderLeftColor: statusColor }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.badge, { backgroundColor: badgeBgColor }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {isCompleted ? '✓ SELESAI' : '⏳ PROSES'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: statusColor }]}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Lihat Detail</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderLeftWidth: 6,
    borderWidth: 1,
    borderColor: '#E0E7FF',
    shadowColor: '#312E81',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E1B4B',
    flex: 1,
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default InfoCard;