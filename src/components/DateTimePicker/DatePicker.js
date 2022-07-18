import React, {useState} from 'react';
import {View, Button, Platform, TouchableOpacity, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Styles from '../../screens/auth/signup/styles';
import moment from 'moment';

export const CustomDatePicker = props => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [selected, setSelected] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setSelected(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  var Y = new Date().getFullYear();

  const {label} = props;
  return (
    <View>
      <TouchableOpacity style={Styles.touchable} onPress={showDatepicker}>
        <Text style={Styles.txt}>
          {selected === '' ? label : moment(selected).format('l')}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          maximumDate={new Date(Y - 13, 10, 20)}
        />
      )}
    </View>
  );
};
