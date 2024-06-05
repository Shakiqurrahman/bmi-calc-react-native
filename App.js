import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Picker } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

export default function App() {
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [heightMeters, setHeightMeters] = useState('');
  const [heightUnit, setHeightUnit] = useState('m');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [bmi, setBmi] = useState(null);
  const [error, setError] = useState('');

  const convertFeetAndInchesToMeters = (feet, inches) => {
    const totalInches = parseFloat(feet) * 12 + parseFloat(inches);
    const meters = totalInches * 0.0254;
    return meters;
  };

  const calculateBmi = () => {
    let heightInMeters = 0;
    let weightInKg = 0;

    if (heightUnit === 'm') {
      heightInMeters = parseFloat(heightMeters);
    } else if (heightUnit === 'ft') {
      heightInMeters = convertFeetAndInchesToMeters(heightFeet, heightInches);
    }

    if (weightUnit === 'kg') {
      weightInKg = parseFloat(weight);
    } else if (weightUnit === 'lbs') {
      weightInKg = parseFloat(weight) * 0.453592;
    }

    if (heightInMeters && weightInKg) {
      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2));
      setError('');
    } else {
      setError('Please enter valid values for height and weight');
      setBmi(null);
    }
  };

  return (
    <PaperProvider theme={DefaultTheme}>
      <View style={styles.container}>
        <Text style={styles.title}>BMI Calculator</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Height:</Text>
          <View style={styles.flexBtn}>
          {heightUnit === 'ft' ? (
            <View style={styles.feetInchesContainer}>
              <TextInput
                style={styles.inputFeet}
                keyboardType="numeric"
                value={heightFeet}
                onChangeText={setHeightFeet}
                placeholder="Feet"
              />
              <TextInput
                style={styles.inputInches}
                keyboardType="numeric"
                value={heightInches}
                onChangeText={setHeightInches}
                placeholder="Inches"
              />
            </View>
          ) : (
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={heightMeters}
              onChangeText={setHeightMeters}
              placeholder="Enter height in meters"
            />
          )}
          <Picker
            selectedValue={heightUnit}
            style={styles.picker}
            onValueChange={(itemValue) => setHeightUnit(itemValue)}
          >
            <Picker.Item label="m" value="m" />
            <Picker.Item label="ft" value="ft" />
          </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Weight:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            placeholder="Enter weight"
          />
          <Picker
            selectedValue={weightUnit}
            style={styles.picker}
            onValueChange={(itemValue) => setWeightUnit(itemValue)}
          >
            <Picker.Item label="kg" value="kg" />
            <Picker.Item label="lbs" value="lbs" />
          </Picker>
        </View>

        <Button title="Calculate BMI" onPress={calculateBmi} />

        {bmi && (
          <Text style={styles.result}>Your BMI is: {bmi}</Text>
        )}
        {error && (
          <Text style={styles.error}>{error}</Text>
        )}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: '90%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  feetInchesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '90%',
  },
  inputFeet: {
    flex: 1,
    width: '90%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 5,
  },
  inputInches: {
    width: '90%',
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  picker: {
    height: 40,
    width: '60px',
    marginTop: -8,
  },
  flexBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 20,
  },

  result: {
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
    color: 'green',
  },
  error: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
  },
});
