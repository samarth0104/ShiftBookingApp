import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const AvailableShiftsScreen = () => {
  const [availableShifts, setAvailableShifts] = useState([
    { city: 'Helsinki', shifts: 6, date: 'Today', time: '10:00 AM - 11:00 AM', status: 'Available' },
    { city: 'Helsinki', shifts: 6, date: 'Today', time: '2:00 PM - 3:00 PM', status: 'Available' },
    { city: 'Helsinki', shifts: 6, date: 'Today', time: '7:00 PM - 8:00 PM', status: 'Available' },
    { city: 'Helsinki', shifts: 6, date: 'Tomorrow', time: '7:00 PM - 8:00 PM', status: 'Available' },
    { city: 'Helsinki', shifts: 6, date: 'Tomorrow', time: '7:00 PM - 8:00 PM', status: 'Available' },
    { city: 'Tampere', shifts: 2, date: 'Today', time: '8:00 AM - 4:00 PM', status: 'Available' },
    { city: 'Tampere', shifts: 2, date: 'Tomorrow', time: '8:00 AM - 4:00 PM', status: 'Available' },
    { city: 'Tampere', shifts: 2, date: 'Tomorrow', time: '8:00 AM - 4:00 PM', status: 'Available' },
    { city: 'Turku', shifts: 2, date: 'Tomorrow', time: '8:00 AM - 4:00 PM', status: 'Available' },
    { city: 'Turku', shifts: 2, date: 'Tomorrow', time: '8:00 AM - 4:00 PM', status: 'Available' },
    { city: 'Turku', shifts: 2, date: 'Tomorrow', time: '8:00 AM - 4:00 PM', status: 'Available' },
  ]);

  const [selectedCity, setSelectedCity] = useState(availableShifts[0].city);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleBooking = (shiftIndex) => {
    console.log('Booking button clicked for shift index:', shiftIndex);
    setAvailableShifts(prevShifts => {
      const updatedShifts = [...prevShifts];
      updatedShifts[shiftIndex].status = 'Booked';
      return updatedShifts;
    });
  };



  const cities = Array.from(new Set(availableShifts.map(shift => shift.city)));

  const groupedShifts = availableShifts.reduce((acc, curr) => {
    if (!acc[curr.city]) {
      acc[curr.city] = {};
    }
    if (!acc[curr.city][curr.date]) {
      acc[curr.city][curr.date] = [];
    }
    acc[curr.city][curr.date].push(curr);
    return acc;
  }, {});

  const isWithinShiftTimeRange = (shift) => {
    const currentTime = new Date();
    const startTime = new Date(currentTime.toDateString() + ' ' + shift.time.split(' - ')[0]);
    const endTime = new Date(currentTime.toDateString() + ' ' + shift.time.split(' - ')[1]);

    return currentTime >= startTime && currentTime <= endTime;
  };

  return (
    <View style={styles.container}>
      <View style={[styles.cityNavigation, styles.cityBackground]}>
        {cities.map((city, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.cityButton,
              selectedCity === city ? styles.selectedCityButton : null,
            ]}
            onPress={() => handleCitySelect(city)}
          >
            <Text style={[styles.cityButtonText, selectedCity === city ? styles.selectedCityText : null]}>
              {city} ({Object.values(groupedShifts[city] || {}).flat().length})
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {groupedShifts[selectedCity] && Object.keys(groupedShifts[selectedCity]).map((date, dateIndex) => (
        <View key={dateIndex} style={styles.shiftContainer}>
          <View style={[styles.dateContainer, groupedShifts[selectedCity][date][0].date === 'Today' ? { backgroundColor: '#CBD2E1' } : null]}>
            <Text style={styles.dateText}>{date}</Text>
          </View>
          {groupedShifts[selectedCity][date].map((shift, shiftIndex) => (
            <View key={shiftIndex} style={styles.shiftDetails}>
              <Text style={styles.timeText}>{shift.time}</Text>
              <Text style={styles.statusText}>{shift.status === 'Booked' ? 'Booked' : (isWithinShiftTimeRange(shift) ? 'Overlapping' : 'Available')}</Text>
              <Button
                title={shift.status === 'Booked' ? 'Cancel' : 'Book'}
                onPress={() => handleBooking(shiftIndex)}
                disabled={isWithinShiftTimeRange(shift) || shift.status === 'Booked'}
                disabledStyle={styles.disabledButton}
              />
            </View>

          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cityNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cityBackground: {
    padding: 10,
    borderRadius: 5,
  },
  cityButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  selectedCityText: {
    color: 'blue',
  },
  shiftContainer: {
    marginBottom: 20,
  },
  dateContainer: {
    backgroundColor: '#CBD2E1',
    padding: 10,
    borderRadius: 5,
  },
  shiftDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F1F4F8',
    padding: 10,
    borderRadius: 5,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 16,
  },
  statusText: {
    fontSize: 16,
    color: 'gray',
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
});

export default AvailableShiftsScreen;

