import { View, Text, Modal, ActivityIndicator,StyleSheet } from "react-native";
import React from "react";
import Color from "@/services/Color";

export default function LoadingDialoug({ visible, loading }: any) {
  visible = visible ?? false;
  loading = loading ?? 'Loading...';
  return (
    <Modal transparent visible = {visible}  >
      <View style = {style.modelcontent}>
        <ActivityIndicator style ={style.activity} color={Color.WHITE} size={30} />
        <Text>{loading}</Text>
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
modelcontent:{
    flex : 1,
    alignItems :'center',
    justifyContent :'center',
    backgroundColor :'#00000070'

},
activity:{
     backgroundColor : Color.PRIMARY,
     padding :20,
     borderRadius :10


},

})
