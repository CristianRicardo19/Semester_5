import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import InfoCard from './src/components/InfoCard';

// 1. Dataset array statis di luar komponen utama (minimal 5 item)
const DAFTAR_MAHASISWA = [
  { id: '1', nama: 'Susanto Siregar', prodi: 'Sistem Informasi' },
  { id: '2', nama: 'Budi Uciha', prodi: 'Teknologi Informasi' },
  { id: '3', nama: 'Dewi Haruno', prodi: 'Sistem Informasi' },
  { id: '4', nama: 'Wahyono Hatake', prodi: 'Teknik Informatika' },
  { id: '5', nama: 'Nur Hyuga', prodi: 'Sistem Informasi' },
];

export default function App() {
  // 2. State pencarian menggunakan React Hook useState
  const [keyword, setKeyword] = useState('');

  // State untuk mengontrol Pop-up Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState({ title: '', status: '' });

  // 4. Logika filter real-time menggunakan .filter() dan .toLowerCase()
  const mahasiswaTerfilter = DAFTAR_MAHASISWA.filter((item) =>
    item.nama.toLowerCase().includes(keyword.toLowerCase())
  );

  // Fungsi menampilkan Pop-up saat tombol "Lihat Detail" ditekan
  const handlePressCard = (judulTugas, statusTugas) => {
    setSelectedInfo({ title: judulTugas, status: statusTugas });
    setModalVisible(true);
  };

  const isSelectedSelesai = selectedInfo.status.toLowerCase() === 'selesai';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4338CA" />

      {/* Header Aplikasi */}
      <View style={styles.topBanner}>
        <Text style={styles.bannerTitle}>Dashboard Akademik</Text>
        <Text style={styles.bannerSubtitle}>UTS Lab. Mobile Computing</Text>
      </View>

      <FlatList
        data={mahasiswaTerfilter}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <View>
            <Text style={styles.sectionTitle}>Daftar Tugas & Aktivitas</Text>
            <InfoCard
              title="Penyelesaian Jobsheet 02 - 04"
              status="selesai"
              onPress={() =>
                handlePressCard('Penyelesaian Jobsheet 02 - 04', 'selesai')
              }
            />
            <InfoCard
              title="Proyek UTS Lab. Mobile Computing"
              status="proses"
              onPress={() =>
                handlePressCard('Proyek UTS Lab. Mobile Computing', 'proses')
              }
            />

            <Text style={[styles.sectionTitle, { marginTop: 18 }]}>
              Direktori Mahasiswa
            </Text>
            <TextInput
              style={styles.searchInput}
              placeholder="🔍 Cari nama mahasiswa..."
              placeholderTextColor="#94A3B8"
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

      {/* Pop-up Modal Detail */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Detail Aktivitas</Text>

            <View style={styles.modalBody}>
              <Text style={styles.modalLabel}>Nama Tugas:</Text>
              <Text style={styles.modalValue}>{selectedInfo.title}</Text>

              <Text style={[styles.modalLabel, { marginTop: 12 }]}>
                Status Pengerjaan:
              </Text>
              <View
                style={[
                  styles.modalBadge,
                  {
                    backgroundColor: isSelectedSelesai ? '#D1FAE5' : '#FFEDD5',
                  },
                ]}
              >
                <Text
                  style={{
                    color: isSelectedSelesai ? '#059669' : '#EA580C',
                    fontWeight: 'bold',
                    fontSize: 13,
                  }}
                >
                  {selectedInfo.status.toUpperCase()}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Tutup Pop-up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FF',
  },
  topBanner: {
    backgroundColor: '#4F46E5',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: '#C7D2FE',
    fontSize: 13,
    marginTop: 2,
  },
  listContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1E1B4B',
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    color: '#1E293B',
    marginBottom: 14,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  studentProdi: {
    fontSize: 13,
    color: '#6366F1',
    fontWeight: '500',
    marginTop: 2,
  },
  emptyContainer: {
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF1F2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECDD3',
  },
  emptyText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#E11D48',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 6,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1B4B',
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 10,
  },
  modalBody: {
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 4,
  },
  modalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  modalBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 4,
  },
  closeButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});