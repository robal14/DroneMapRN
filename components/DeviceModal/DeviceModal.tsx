import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useBluetooth} from '../../bluetooth/context';
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';

const DeviceModal: React.FC = () => {
  const {selectDevice, currentDevice, devices} = useBluetooth();
  const [isModalVisible, setModalVisibility] = useState(false);
  const device = useMemo(() => {
    if (!currentDevice) {
      return null;
    }

    return devices[currentDevice];
  }, [devices, currentDevice]);

  const handleCloseModal = useCallback(() => {
    setModalVisibility(false);
    selectDevice(null);
  }, [selectDevice]);

  useEffect(() => {
    if (currentDevice) {
      setModalVisibility(true);
    }
  }, [currentDevice]);

  if (!device) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={handleCloseModal}>
      <View style={styles.centeredView}>
        <ScrollView style={styles.modalView}>
          <Text style={styles.modalHeader}>
            BasicID{'\n'}
            <Text style={styles.modalText}>
              Name: {device.name}
              {'\n'}RSSI: {device.rssi} {'\n'}MAC: {device.id} {'\n'}IdType:{' '}
              {device.data.idTypeString}
              {'\n'}Id: {device.data.id}
              {'\n'}UasIdType: {device.data.uaTypeString}
              {'\n'}UasId: {device.data.uasIdString}
            </Text>
          </Text>
          <Text style={styles.modalHeader}>
            Authentication{'\n'}
            <Text style={styles.modalText}>
              AuthType: {device.data.authTypeString}
              {'\n'}AuthLength: {device.data.authLength}
              {'\n'}AuthTimestamp: {device.data.authTimestampString}
              {'\n'}AuthData: {device.data.authData}
            </Text>
          </Text>
          <Text style={styles.modalHeader}>
            Location{'\n'}
            <Text style={styles.modalText}>
              Latitude: {device.data.droneLat}
              {'\n'}Longitude: {device.data.droneLon}
              {'\n'}HorizontalAccuracy:
              {device.data.horizontalAccuracyString}
              {'\n'}AltitudeGeo: {device.data.altitudeGeodetic}m{'\n'}
              AltitudePressure: {device.data.altitudePressure}m{'\n'}Status:{' '}
              {device.data.statusString}
              {'\n'}VerticalAccuracy:{device.data.verticalAccuracyString}
              {'\n'}HeightType: {device.data.heightTypeString}
              {'\n'}Height:{device.data.height}m{'\n'}HoriSpeed:
              {device.data.speedHori}m/s
              {'\n'}VertSpeed:{device.data.speedVert}m/s
              {'\n'}BaroAccuracy:{device.data.baroAccuracyString}
              {'\n'}SpeedAccuracy: {device.data.speedAccuracyString}
              {'\n'}Timestamp: {device.data.timestampString}
            </Text>
          </Text>
          <Text style={styles.modalHeader}>System/Operator</Text>
          <Text style={styles.modalText}>
            LocationType:{device.data.operatorLocationTypeString}
            {'\n'}Altitude:{device.data.operatorAltitudeGeoString}
            {'\n'}Latitude:{device.data.operatorLatitude}
            {'\n'}AreaCount:{device.data.areaCount}
            {'\n'}AreaRadius:{device.data.areaRadius}
            {'\n'}AreaCeiling:{device.data.areaCeilingString}
            {'\n'}AreaFloor:{device.data.areaFloorString}
            {'\n'}Category:{device.data.operatorLongitude}
            {'\n'}ClassValue:{device.data.operatorLongitude}
            {'\n'}SystemTimestamp:{device.data.operatorLongitude}
            {'\n'}OperatorIdType:{device.data.operatorIdType}
            {'\n'}OperatorId:{device.data.operatorIdString}
          </Text>
          <Text style={styles.modalHeader}>
            SelfId{'\n'}
            <Text style={styles.modalText}>
              DescriptionType:{device.data.descriptionTypeString}
              {'\n'}OperationDescription:
              {device.data.operationDescriptionString}
            </Text>
          </Text>
        </ScrollView>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={handleCloseModal}>
          <Text style={styles.textStyle}>Hide Details</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  modalView: {
    flex: 1,
    minWidth: '80%',
    maxHeight: '80%',
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 35,
    paddingHorizontal: '5%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  button: {
    borderRadius: 50,
    padding: 10,
    elevation: 3,
    width: '80%',
  },
  buttonOpen: {
    backgroundColor: '#3399ff',
  },
  buttonClose: {
    backgroundColor: '#3399ff',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: 'black',
    marginBottom: 5,
    fontSize: 14,
    textAlign: 'left',
  },
  modalHeader: {
    color: '#3399ff',
    fontSize: 20,
    marginBottom: 0,
    textAlign: 'left',
  },
});

export default DeviceModal;
