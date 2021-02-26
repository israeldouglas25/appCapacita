import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function App() {
  const [weight, setWeight] = React.useState (0);
  const [height, setHeight] = React.useState (0);
  const [water, setWater] = React.useState (0);
  const [cups, setCups] = React.useState (0);  
  const [imc, setImc] = React.useState (0);
  const [imcDescription, setImcDescription] = React.useState ('');

  const imcDescriptoinMessage = {
    low: 'abaixo do peso, cuidado',
    normal: 'com peso normal, parabéns',
    attention: 'com sobrepeso, atenção',
    fat1: 'na obesidade grau 1, cuidado',
    fat2: 'na obesidade grau 2, cuidado',
    fat3: 'na obesidade grau 3, cuidado'
  }

  useEffect(() => {
    if(weight.value && height.value){
      const weightNumber = Number(weight.value.replace(',','.'));
      const heightNumber = Number(height.value.replace(',','.'));

      let calcImc = weightNumber / (heightNumber * heightNumber);

      if(calcImc && calcImc !== Infinity){
        calcImc = calcImc.toFixed(2);
        setImc(calcImc);
        if (calcImc < 18.5) {
          setImcDescription(imcDescriptoinMessage.low);
        } else if(calcImc < 24.9){
          setImcDescription(imcDescriptoinMessage.normal);
        } else if(calcImc < 29.9){
          setImcDescription(imcDescriptoinMessage.attention);
        } else if(calcImc < 34.9){
          setImcDescription(imcDescriptoinMessage.fat1);
        } else if(calcImc < 39.9){
          setImcDescription(imcDescriptoinMessage.fat2);
        } else{
          setImcDescription(imcDescriptoinMessage.fat3);
        }        
      } else{
        setImc(0);
      }
    } else{
      setImc(0);
    }
  }, [weight, height]);


  useEffect( () => {
    let calWater = weight.value * 0.035;
    let calCups = calWater / 0.3;
    if(calWater){
      setWater (calWater.toPrecision(3));
      setCups (calCups.toFixed(0));
    }
  }, [weight]);
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text style={styles.title}>Saúde+</Text>
          <Text style={styles.label}>Peso em quilogramas (Ex. 70,300)</Text>
          < TextInputMask 
            style = {styles.textInput}
            type = { 'custom' } 
            options = { { 
              mask: '99,999' 
            } } 
            value = {weight.value} 
            onChangeText = { (weightInput)  =>  { 
                setWeight ( { 
                value: weightInput 
              } ) 
            } } 
            keyboardType = 'number-pad'
            autoFocus = {true}
          />
          <Text style={styles.label}>Altura em metros (Ex. 1,55)</Text>
          < TextInputMask 
            style = {styles.textInput}
            type = { 'custom' } 
            options = { { 
              mask: '9,99' 
            } } 
            value = {height.value} 
            onChangeText = { (heightInput)  =>  { 
                setHeight ( { 
                value: heightInput 
              } ) 
            } } 
            keyboardType = 'number-pad'
          />

          <View style={styles.box}>
            <Text style={styles.textBox}>
              O seu IMC é de {imc
              .toString()
              .replace('.',',')} e por isso você está {imcDescription}. 
              Você deveria tomar {water.toString().replace('.',',')} litros de água diariamente, 
              o que corresponde a {cups.toString().replace('.',',')} copos de 300ml por dia.
            </Text>
          </View>

          <StatusBar style="auto" />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 40,
  },
  title: {fontSize: 40, fontWeight: 'bold', color: '#3C5E45'},
  label: {marginTop: 20, fontSize: 18, color: '#515753'},
  textBox: {margin: 20, fontSize: 18, color: '#515753'},
  box: {backgroundColor: '#EBFBEF', marginTop: 20},
  textInput: {
    height: 40,
    width: '80%',
    margin: 10,
    color: '#737A75',
    borderColor: '#515753',
    borderBottomWidth: 1,
  }
});
