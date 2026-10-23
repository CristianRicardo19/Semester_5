import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import InfoCard from './src/components/InfoCard';

// 1. Dataset array statis di luar komponen utama (minimal 5 item)
const DAFTAR_MAHASISWA = [
  { id: '1', nama: 'Alifia Putri', prodi: 'Sistem Informasi' },
  { id: '2', nama: 'Budi Santoso', prodi: 'Teknologi Informasi' },
  { id: '3', nama: 'Citra Dewi', prodi: 'Sistem Informasi' },
  { id: '4', nama: 'Dimas Anggara', prodi: 'Teknik Informatika' },
  { id: '5', nama: 'Eka Nur Safitri', prodi: 'Sistem Informasi' },
];

export default function App() {
  // 2. State pencarian menggunakan React Hook useState
  const [keyword, setKeyword] = useState('');

  // 4. Logika filter real-time menggunakan .filter() dan .toLowerCase()
  const mahasiswaTerfilter = DAFTAR_MAHASISWA.filter((item) =>
    item.nama.toLowerCase().includes(keyword.toLowerCase())
  );

  // Fungsi callback ketika tombol "Lihat Detail" pada InfoCard ditekan
  const handlePressCard = (judulTugas, statusTugas) => {
    Alert.alert(
      'Detail Informasi',
      `Tugas: ${judulTugas}\nStatus saat ini: ${statusTugas}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" />

      <FlatList
        // 5. Konfigurasi wajib FlatList: data, keyExtractor, renderItem, ListEmptyComponent
        data={mahasiswaTerfilter}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <View>
            {/* BAGIAN SOAL 1: Render InfoCard minimal 2 kali dengan data berbeda */}
            <Text style={styles.sectionTitle}>Daftar Tugas & Aktivitas</Text>
            <InfoCard
              title="Penyelesaian Jobsheet 02 - 04"
              status="selesai"
              onPress={() =>
                handlePressCard('Penyelesaian Jobsheet 02 - 04', 'Selesai')
              }
            />
            <InfoCard
              title="Proyek UTS Lab. Mobile Computing"
              status="proses"
              onPress={() =>
                handlePressCard('Proyek UTS Lab. Mobile Computing', 'Proses')
              }
            />

            {/* BAGIAN SOAL 2: Input Pencarian Real-Time */}
            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
              Direktori Mahasiswa
            </Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Cari nama mahasiswa..."
              placeholderTextColor="#9E9E9E"
              value={keyword}
              onChangeText={(text) => setKeyword(text)}
            />
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.studentCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.nama.charAt(0)}</Text>
            </View>
            <View style={styles.studentInfo}>
              <Text style={styles.studentName}>{item.nama}</Text>
              <Text style={styles.studentProdi}>{item.prodi}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Data tidak ditemukan!</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  listContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: '#2D3748',
    marginBottom: 12,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EBF8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2B6CB0',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  studentProdi: {
    fontSize: 13,
    color: '#718096',
    marginTop: 2,
  },
  emptyContainer: {
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#E53E3E',
  },
});