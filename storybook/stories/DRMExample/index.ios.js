import React from 'react'

import { Text, SafeAreaView, StyleSheet } from 'react-native'
import { storiesOf } from '@storybook/react-native'

import Video, { DRMType } from 'react-native-video'

import authXmlBuyDRM from './authXmlBuyDRM'

const source = {
  type: 'm3u8',
  uri: 'https://d2jl6e4h8300i8.cloudfront.net/netflix_meridian/4k-18.5!9/keyos-logo/g180-avc_a2.0-vbr-aac-128k/r30/hls-fp/master.m3u8',
}

const getLicense = async ({ spcBase64, contentId }, props) => {
  const {
    drm: { headers },
  } = props

  const data = `spc=${spcBase64}&assetId=${contentId}`

  const response = await fetch('https://fp-keyos.licensekeyserver.com/getkey/', {
    method: 'POST',
    headers,
    body: data,
  })

  const key = await response.text()
  return key
}

const drm = {
  certificateUrl: 'https://fp-keyos.licensekeyserver.com/cert/7e11400c7dccd29d0174c674397d99dd.der',
  type: DRMType.FAIRPLAY,
  headers: {
    customdata: authXmlBuyDRM,
  },
  getLicense,
}

storiesOf('DRM', module)
  .addDecorator(getStory => <SafeAreaView style={styles.container}>{getStory()}</SafeAreaView>)
  .addParameters({ options: { panelPosition: 'top' } })
  .add('FairPlay', () => (
    <>
      <Text>Fairplay only works on real devices.</Text>
      <Video style={styles.player} controls source={source} drm={drm} />
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
