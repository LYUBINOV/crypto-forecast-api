import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { GlobalStyles, normalizeWidth, normalizeHeight } from '../../../shared/GlobalStyles';

export default function GraphComponent({ labels, data }) {
   const [graphPoint, setGraphPoint] = useState({
      time: '',
      value: '' 
   });

   if(graphPoint.time == '' && graphPoint.value == '') {
      setGraphPoint({
         time: labels[labels.length - 1], 
         value: data[data.length - 1]
      })
   }

   //JSPORN: funkcia ktora vrati jsx element pre boldnutie textu <3
   const BOLD = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>;

   return (
      <View style={styles.container}>   
         <View style={styles.graphPoint}>
            <View style={styles.timeView}>
               <Text style={styles.text}>
                  <BOLD>Time: </BOLD>
                  {graphPoint.time}
               </Text>
            </View>
            <View style={styles.emptySpaceBetweenTimeAndValue} />
            <View style={styles.valueView}>
               <Text style={styles.text}>
                  <BOLD>Value: </BOLD>
                  {graphPoint.value}
               </Text>
            </View>
         </View>
         <View style={styles.lineChartView}>
            <LineChart
               data={{
                  datasets: [{
                     data: data
                  }]
               }}
               onDataPointClick={({ index, value }) => setGraphPoint({time: labels[index], value: value})} 
               width={normalizeWidth(300)} // from react-native
               height={normalizeHeight(150)}
               yAxisInterval={4} // optional, defaults to 1
               chartConfig={{
                  backgroundColor: 'white',
                  backgroundGradientFrom: GlobalStyles.cardColor,
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  propsForDots: {
                     r: '2',
                     strokeWidth: '3',
                     stroke: 'pink'
                  },
                  propsForLabels: {
                     fontSize: '8',
                  },
                  strokeWidth: 4,
               }}
               bezier
               style={{
                  // padding: 20,
                  // marginBottom: 30,
                  borderRadius: 10,
                  // flex: 1,
                  alignItems: 'center',
               }}
            />
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'column',
      // flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   lineChartView: {
      // flex: 1,
      // alignItems: 'center',
      marginBottom: normalizeHeight(10),
   },
   graphPoint: {
      flexDirection: 'row',
      // alignItems: 'center',
      // justifyContent: 'center',
      width: normalizeWidth(300),
      // backgroundColor: GlobalStyles.cardColor,
      borderRadius: 10,
      marginBottom: normalizeHeight(10),
      // flex: 1,
      // padding: 10
    },
   timeView: {
      // width: 150,
      alignItems: 'flex-start',
      // marginLeft: 20,
      flex: 1,
      // backgroundColor: 'red'
   }, 
   valueView: {
      // flex: 1,
      // width: 150,
      alignItems: 'flex-end',
      // backgroundColor: 'yellow'
      // marginRight: 20
   }, 
   text: {
      color: GlobalStyles.textColor,
      fontSize: normalizeWidth(14)
   }
});