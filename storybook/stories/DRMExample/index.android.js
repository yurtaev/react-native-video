import React from 'react'

import { Text, SafeAreaView, StyleSheet } from 'react-native'
import { storiesOf } from '@storybook/react-native'

import Video, { DRMType } from 'react-native-video'

import authXmlBuyDRM from './authXmlBuyDRM'

const source = {
  type: 'mpd',
  uri: 'https://d2jl6e4h8300i8.cloudfront.net/netflix_meridian/4k-18.5!9/keyos-logo/g180-avc_a2.0-vbr-aac-128k/r30/dash-wv-pr/stream.mpd',
}

const drm = {
  licenseServer: 'https://wv-keyos.licensekeyserver.com/',
  type: DRMType.WIDEVINE,
  headers: { customdata: authXmlBuyDRM },
}

storiesOf('DRM', module)
  .addDecorator(getStory => <SafeAreaView style={styles.container}>{getStory()}</SafeAreaView>)
  .addParameters({ options: { panelPosition: 'top' } })
  .add('Widevine', () => (
    <>
      <Text>Widevine + Android.</Text>
      <Video
        style={styles.player}
        controls
        source={source}
        drm={drm}
      />
    </>
  ))

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  player: {
    flex: 1,
  },
})
