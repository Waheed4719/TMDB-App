import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  TextInput,
  FlatList,
  SafeAreaView,
  LogBox
} from 'react-native'
import Icon from 'react-native-vector-icons/dist/Feather'
import IconMaterial from 'react-native-vector-icons/dist/MaterialIcons'
import Carousel from 'react-native-anchor-carousel'
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5'
import Axios from 'axios'
import { FONTS } from '../constants'

function Home ({ navigation }) {
  const [data, setData] = useState([])
  const [background, setBackground] = useState({})
  const [searchText, setSearchText] = useState('')
  const ApiKey = '96ccc8483c2ac6e5224d8b9e918f99ae'
  const header = {
    access_token:
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmNjYzg0ODNjMmFjNmU1MjI0ZDhiOWU5MThmOTlhZSIsInN1YiI6IjVlY2U4YWFkYWFlYzcxMDAyMDY3NTU2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Jc6sjQWA0xOqkiHIQrmrDC7CerwLJZIAHUWVm7gQrdQ'
  }
  var Base_url = 'https://image.tmdb.org/t/p/w300'

  var Video_url = `https://www.youtube.com/watch?v=SUXWAEX2jlg`

  const getTrailer = async item => {
    try {
      let response = await Axios.get(
        `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${ApiKey}&language=en-US`,
        header
      )
      console.log(response.data.results[0])
      let officialTrailer = response.data.results.filter(
        item => item.name == 'Official Trailer'
      )[0]
      console.log(officialTrailer)
      setBackground({
        uri: Base_url + item.poster_path,
        name: item.title,
        stat: item.release_date,
        desc: item.overview,
        videoKey: officialTrailer?.key
      })
    } catch (error) {}
  }

  const getMovieData = async () => {
    try {
      let response = await Axios.get(
        'https://api.themoviedb.org/4/list/1?page=1&api_key=' + ApiKey,
        // `https://api.themoviedb.org/3/movie/634649?api_key=${ApiKey}&language=en-US`,
        header
      )
      if (response) {
        setData(response.data.results)
        // console.log(items.data)
        // console.log(console.log(JSON.parse(JSON.stringify(items))))
        console.log(response.data.results[0])
        getTrailer(response.data.results[0])
        // setBackground({
        //   uri: Base_url + response.data.results[0].poster_path,
        //   name: response.data.results[0].title,
        //   desc: response.data.results[0].overview,
        //   stat: '2019 - Action/Sci-fi - 3h 2m'
        // })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMovieData()
  }, [])

  const searchMovies = async value => {
    console.log(value)
    setSearchText(value)
  }

  const carouselRef = useRef(null)

  const { width, height } = Dimensions.get('window')
  const renderItem = ({ item, index }) => {
    return (
      <View key={index}>
        <TouchableOpacity
          onPress={() => {
            carouselRef.current.scrollToIndex(index)
            getTrailer(item)
            // setBackground({
            //   uri: Base_url + item.poster_path,
            //   name: item.title,
            //   stat: item.release_date,
            //   desc: item.overview
            // })
          }}
        >
          <Image
            source={{ uri: Base_url + item.poster_path }}
            style={styles.carouselImage}
          />
          <Text style={styles.carouselText}>{item.title}</Text>
          <IconMaterial
            name='library-add'
            size={30}
            color='white'
            style={styles.carouselIcon}
          />
        </TouchableOpacity>
      </View>
    )
  }
  LogBox.ignoreAllLogs(true)
  return (
    <ScrollView >
      <View style={styles.carouselIntentContainer}>
        <View style={{ ...StyleSheet.absoluteFill, backgroundColor: '#000' }}>
          <ImageBackground
            source={{ uri: background.uri }}
            style={styles.ImageBg}
            blurRadius={6}
          >
            <View style={styles.searchBoxContainer}>
              <TextInput
                placeholder='Search Movies'
                placeholderTextColor='#666'
                style={styles.SearchBox}
                value={searchText}
                onChangeText={value => searchMovies(value)}
              />
              <Icon
                name='search'
                size={22}
                color='#666'
                style={styles.searchBoxIcon}
              />
            </View>
            <Text
              style={{
                ...FONTS.h1,
                color: 'white',
                marginLeft: 10,
                marginVertical: 10
              }}
            >
              Top Picks This Week
            </Text>

            <View style={styles.carouselContainerView}>
              <SafeAreaView>
                <Carousel
                  style={styles.Carousel}
                  data={data}
                  renderItem={renderItem}
                  itemWidth={200}
                  containerWidth={width - 20}
                  separatorWidth={0}
                  ref={carouselRef}
                  inActiveOpacity={0.4}
                />
              </SafeAreaView>
            </View>
            <View style={styles.movieInfoContainer}>
              <View style={styles.info}>
                <Text
                  onPress={() => console.log('hello world')}
                  style={{
                    fontSize: 20,
                    color: 'white',
                    // fontWeight: 'bold',
                    marginBottom: 6,
                    width: Dimensions.get('window').width * 0.7,
                    ...FONTS.h2,
                  }}
                >
                  {background.name}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'white',
                    fontWeight: 'bold',
                    opacity: 0.8,
                    ...FONTS.body5
                  }}
                >
                  {background.stat}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.playIconContainer}
                onPress={() =>
                  navigation.navigate('HomeContainer', {
                    screen: 'Detail',
                    params: { background: background }
                  })
                }
              >
                <FontAwesome5
                  name='play'
                  size={22}
                  color='#02ad94'
                  style={{ marginLeft: 4 }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                paddingHorizontal: 14,
                marginVertical: 10,
                marginTop: 14,
                flex: 1
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  opacity: 0.8,
                  lineHeight: 20,
                  maxHeight: 150,
                  ...FONTS.body4
                }}
              >
                {background.desc}
              </Text>
              <TouchableOpacity style={{ marginTop: 10 }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: '#fff',
                    ...FONTS.h4
                  }}
                >
                  Read Reviews and More...
                </Text>
              </TouchableOpacity>
              <View style={{ height: 400, marginTop: 20 }}>
              <Text
                  style={{
                    alignSelf: 'flex-start',
                    color: '#fff',
                    ...FONTS.h1,
                    marginBottom: 20
                  }}
                >
                  My List
                </Text>
                <FlatList
                  style={{ marginBottom: 30, height: 400 }}
                  data={data}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity style={{ marginRight: 20, width: 200 }}>
                        <Image
                          style={{ height: 300, width: 200,borderRadius:4 }}
                          source={{ uri: Base_url + item.poster_path }}
                        />
                      </TouchableOpacity>
                    )
                  }}
                />
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  carouselIntentContainer: {
    flex: 1,
    backgroundColor: 'blue',
    height: 1100,
    paddingHorizontal: 14
  },

  ImageBg: {
    flex: 1,
    height: null,
    width: null,
    opacity: 1,
    justifyContent: 'flex-start'
  },

  searchBoxContainer: {
    backgroundColor: '#fff',
    elevation: 10,
    borderRadius: 4,
    marginVertical: 10,
    width: '95%',
    flexDirection: 'row',
    alignSelf: 'center'
  },
  SearchBox: {
    padding: 10,
    fontSize: 14,
    fontWeight: '500',
    width: '90%'
  },
  searchBoxIcon: {
    position: 'absolute',
    right: 20,
    top: 14
  },
  carouselContainerView: {
    width: '100%',
    height: 350,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Carousel: {
    flex: 1,
    overflow: 'visible'
  },
  carouselImage: {
    width: 200,
    height: 320,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)'
  },
  carouselText: {
    padding: 14,
    color: 'white',
    position: 'absolute',
    bottom: 10,
    left: 2,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Bold'
  },
  carouselIcon: {
    position: 'absolute',
    top: 15,
    right: 15
  },

  info: {
    justifyContent: 'flex-start',
    paddingLeft: 14,
    paddingVertical: 5,
    alignItems: 'flex-start'
  },
  movieInfoContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width - 14
  },
  playIconContainer: {
    backgroundColor: '#212121',
    padding: 18,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    height: 60,
    width: 60
  }
})

export default Home
