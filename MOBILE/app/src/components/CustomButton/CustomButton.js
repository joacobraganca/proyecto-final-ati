import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const CustomButton = ({onPress, text, type}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, type ? styles.blue : styles.red]}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 15,
    marginVertical: 25,
    alignItems: 'center',
    borderRadius: 5,
  },
  blue: {backgroundColor: '#3B71F3'},
  red: {backgroundColor: 'red'},
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});
export default CustomButton;
