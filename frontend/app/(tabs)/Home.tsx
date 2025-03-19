import { View, Text, StyleSheet,ScrollView } from 'react-native'
import React from 'react'
import Color from '@/services/Color'
import HomeHeader from '@/components/HomeHeader'
import CreateRecipi from '@/components/CreateRecipi'
import CatogoriesList from '@/components/CatogoriesList'

export default function Home() {
  return (
    <ScrollView style = {{backgroundColor : Color.WHITE,height:'100%',padding : 20 ,marginLeft : -15}}>
    {/* hedline */}
    <HomeHeader/>
    {/* generating data */}
    <CreateRecipi/>
    {/* section */}
    <CatogoriesList/>
    </ScrollView>
  )
}
