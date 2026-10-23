import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const InfoCard = ({ title, status, onPress }) => {
  // Logika pewarnaan kondisional berdasarkan status ('selesai' vs 'proses')
  const isCompleted = status?.toLowerCase() === 'selesai';
  const statusColor = isCompleted ? '#2E7D32' : '#EF6C00'; // Hijau vs Oranye
  const badgeBgColor = isCompleted ? '#E8F5E9' : '#FFF3E0';

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.badge, { backgroundColor: badgeBgColor }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {status.toUpperCase()}
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Lihat Detail</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    flex: 1,
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#1976D2',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default InfoCard;