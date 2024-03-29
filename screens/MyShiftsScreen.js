import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MyShiftsScreen = () => {
    // Dummy shift details, replace with your actual data
    const shifts = [
        { date: 'Today', city: 'Helsinki', time: '14:00 - 16:00' },
        { date: 'Today', city: 'Tampere', time: '12:00 - 16:00' },
        { date: 'Today', city: 'Turku', time: '9:00 - 11:00' },
        { date: 'Today', city: 'Turku', time: '13:30 - 15:00' },
        { date: 'Tomorrow', city: 'Helsinki', time: '14:00 - 16:00' }
    ];

    const handleCancel = (city) => {
        // Implement cancel shift functionality here
        alert(`Shift in ${city} cancelled!`);
    };

    // Helper function to parse shift time into start and end times
    const parseShiftTime = (time) => {
        const [startTime, endTime] = time.split(' - ');
        return { startTime, endTime };
    };

    // Helper function to check if the current time falls within the shift time range
    const isWithinShiftTimeRange = (shift) => {
        const { startTime, endTime } = parseShiftTime(shift.time);
        const currentTime = new Date();
        const currentHours = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();
        const currentTimeString = `${currentHours}:${currentMinutes}`;

        return startTime <= currentTimeString && currentTimeString <= endTime;
    };


    // Helper function to group shifts by date
    const groupShiftsByDate = (shifts) => {
        return shifts.reduce((acc, shift) => {
            if (acc[shift.date]) {
                acc[shift.date].push(shift);
            } else {
                acc[shift.date] = [shift];
            }
            return acc;
        }, {});
    };

    const groupedShifts = groupShiftsByDate(shifts);

    return (
        <View style={styles.container}>
            {Object.keys(groupedShifts).map((date, index) => (
                <View key={index}>
                    <View style={[styles.dateRow, { backgroundColor: '#CBD2E1' }]}>
                        <Text style={styles.dateText}>{date}</Text>
                    </View>
                    {groupedShifts[date].map((shift, shiftIndex) => (
                        <View key={shiftIndex} style={styles.shiftContainer}>
                            <View style={[styles.shiftDetails, { backgroundColor: '#F1F4F8' }]}>
                                <View style={styles.shiftInfo}>
                                    <Text style={styles.timeText}>{shift.time}</Text>
                                    <Text style={styles.cityText}>{shift.city}</Text>
                                </View>
                                <Button
                                    title={`Cancel`}
                                    onPress={() => handleCancel(shift.city)}
                                    disabled={shift.date === 'Today' && isWithinShiftTimeRange(shift)} // Disable cancel button if date is today and current time is within the shift time range
                                />
                            </View>
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
        paddingTop: 10, // Add paddingTop to reduce the gap between the first date row and the navbar
    },
    dateRow: {
        backgroundColor: '#CBD2E1',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    shiftContainer: {
        marginBottom: 20,
        alignItems: 'left',
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    shiftDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#F1F4F8',
        padding: 10,
        borderRadius: 5,
    },
    shiftInfo: {
        flexDirection: 'column',
        flex: 1,
    },
    timeText: {
        fontSize: 16,
    },
    cityText: {
        fontSize: 16,
    },
    disabledButton: {
        backgroundColor: '#A9A9A9', // Set the background color for disabled button
    },
});

export default MyShiftsScreen;
