import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import AntdIcon from 'react-native-vector-icons/dist/AntDesign'
import VideoPlayer from 'react-native-video'
import { Fonts } from '../constants'
import YouTubePlayer from 'react-native-youtube-sdk'
const { width, height } = Dimensions.get('screen')

function Detail ({ navigation, route }) {
  const videoPlayerRef = React.useRef(null)
  const { background } = route.params
  console.log(route.params)
  return (
    <View style={styles.detailScreen}>
      <View
        style={{
          ...StyleSheet.absoluteFill,
          backgroundColor: '#000',
          flex: 1,
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <View style={styles.mainPlayerView}>
          {!background?.videoKey ? (
            <Text style={{ color: 'white', textAlign:'center' }}>No Video Found!</Text>
          ) : (
            <YouTubePlayer
              ref={videoPlayerRef}
              autoplay={true}
              play={true}
              fullscreen
              videoId={background?.videoKey}
              showSeekBar={true}
              showPlayPauseButton
              style={{ ...styles.backgroundVideo }}
              startTime={5}
              onError={e => console.log(e)}
              onChangeState={e => console.log(e)}
              onChangeFullscreen={e => console.log(e)}
            />
          )}
        </View>
    
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  detailScreen: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'red',
    justifyContent: 'center'
  },
  backgroundVideo: {
    alignSelf: 'stretch',
    height:300
  },
  mainPlayerView: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative'
  }
})

export default Detail
