/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
  Alert,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {DropDown} from './src/components';
import {inWords, convertCurrency} from './src/helpers';

const App = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [currencyListData, setCurrencyListData] = useState([]);
  const [userInput, setUserInput] = useState<any>();
  const [targetCurrencyValue, setTargetCurrencyValue] = useState<any>();

  useEffect(() => {
    const getCurrencyResults = async () => {
      const response = await fetch(
        'https://freecurrencyapi.net/api/v2/latest?apikey=0bbbb6a0-8958-11ec-98c5-296619e599cd',
      );
      const {data} = await response.json();
      const formatedDropDownList: any = [];
      Object.keys(data).forEach(countryName => {
        formatedDropDownList.push({
          label: countryName,
          value: data[countryName],
        });
      });
      setCurrencyListData(formatedDropDownList);
    };
    getCurrencyResults();
  }, []);

  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(value);
  };

  const handleValueChange = (value: any) => {
    setUserInput(value);
  };

  const handleCalculateTargetCurrency = () => {
    //calculate the conversion rates
    //the below function will always convert USD to the selected currency

    const convertedResult = convertCurrency(userInput, selectedCurrency);
    setTargetCurrencyValue(convertedResult);
  };
  function numberWithCommas(value: string) {
    return value?.toString()?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <SafeAreaView>
      <View style={styles.row}>
        <Text style={styles.title}>Input</Text>
        <TextInput
          keyboardType={'decimal-pad'}
          style={styles.editableTextInput}
          value={userInput}
          onChangeText={handleValueChange}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>Result</Text>
        <View style={styles.resultBox}>
          <Text>{numberWithCommas(targetCurrencyValue)}</Text>
        </View>
      </View>
      <DropDown
        currency={selectedCurrency}
        currencyListData={currencyListData}
        setCurrency={handleCurrencyChange}
      />
      <Button title="Convert" onPress={handleCalculateTargetCurrency} />
      <View style={styles.result}>
        <Text>Input : == {inWords(userInput)} </Text>
        <Text> Output: == {inWords(targetCurrencyValue)}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: wp(4),
  },
  editableTextInput: {
    borderColor: 'gray',
    borderWidth: wp(0.4),
    borderRadius: wp(1),
    padding: wp(4),
    minWidth: wp(70),
  },
  nonEditableTextInput: {
    borderColor: 'gray',
    borderWidth: wp(0.4),
    borderRadius: wp(1),
    padding: wp(4),
    minWidth: wp(70),
  },
  resultBox: {
    borderColor: 'gray',
    borderWidth: wp(0.4),
    borderRadius: wp(1),
    padding: wp(4),
    minWidth: wp(70),
  },
  title: {
    fontSize: RFValue(16),
    marginRight: wp(4),
  },
  result: {
    margin: wp(4),
  },
  resultTitle: {
    fontWeight: 'bold',
    fontSize: RFValue(16),
  },
  convertButton: {
    marginTop: wp(4),
  },
});

export default App;
