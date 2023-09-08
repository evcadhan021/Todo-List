import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  // Simulasi waktu tampilan Splash
  useEffect(() => {
    const timer = setTimeout(() => {
      // Pindahkan pengguna ke layar utama atau layar berikutnya
      navigation.replace('MainScreen'); // Ganti 'MainScreen' dengan nama layar utama Anda
    }, 3000); // Tampilkan Splash selama 3 detik

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={uri("https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.befunky.com%2Fimages%2Fprismic%2F426477d1-77be-4c8b-acba-e6abed933661_hero-blur-image-4.jpg%3Fauto%3Davif%2Cwebp%26format%3Djpg%26width%3D896&tbnid=CaQp1jRVfM5p6M&vet=12ahUKEwjBv7fAgJmBAxWTz6ACHcnHCgwQMyg-egUIARDXAQ..i&imgrefurl=https%3A%2F%2Fwww.befunky.com%2Ffeatures%2Fblur-image%2F&docid=KwafTdewQkEguM&w=896&h=504&q=Image&client=firefox-b-lm&ved=2ahUKEwjBv7fAgJmBAxWTz6ACHcnHCgwQMyg-egUIARDXAQ")} // Ganti dengan path gambar splash Anda
        style={styles.logo}
      />
      <Text style={styles.title}>Nama Aplikasi</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Ganti dengan warna latar belakang yang Anda inginkan
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain', // Sesuaikan dengan kebutuhan
  },
  title: {
    fontSize: 24,
    marginTop: 16,
  },
});

export default SplashScreen;
