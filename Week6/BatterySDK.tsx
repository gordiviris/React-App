import { useEffect, useState, useCallback } from "react";
import * as Battery from "expo-battery";
import { StyleSheet, Text, View } from "react-native";
import { Accelerometer } from "expo-sensors";
import { Accel } from "./Accelerometer";

export default function BatterySDK() {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [subscription, setSubscription] = useState<Battery.Subscription | null>(
    null
  );
  const batLevel = batteryLevel !== null ? Math.round(100 * batteryLevel) : 0;
  const { x, y, z } = Accel();
  const shake = Math.sqrt(x * x + y * y + z * z);
  const batPercent = `${batLevel}%`;

  const _subscribe = async () => {
    const batteryLevel = await Battery.getBatteryLevelAsync();
    setBatteryLevel(batteryLevel);

    setSubscription(
      Battery.addBatteryLevelListener(({ batteryLevel }) => {
        setBatteryLevel(batteryLevel);
        console.log("batteryLevel changed!", batteryLevel);
      })
    );
  };

  const _unsubscribe = useCallback(() => {
    subscription && subscription.remove();
    setSubscription(null);
  }, [subscription]);

  // useEffect(() => {
  //   _subscribe();
  //   return () => _unsubscribe();
  // }, [_unsubscribe]);

  useEffect(() => {
    if (shake > 1.1) {
      setBatteryLevel((batteryLevel) =>
        Math.min((batteryLevel as any) + 0.01, +1)
      );
    }
  }, [shake]);

  const batColor = (batLevel: number) => {
    let batteryColor = "#b00d23";

    if (batLevel >= 50) {
      batteryColor = "#5BC236";
    } else if (batLevel > 20 && batLevel < 50) {
      batteryColor = "#FFF224";
    }

    return batteryColor;
  };

  const Status = () => {
    if (batLevel === 100) {
      return `Battery Life: ${batLevel}% Battery Fully Charged!`;
    } else {
      return `Battery Life: ${batLevel}%`;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>SHAKE TO CHARGE</Text>
      <Text style={styles.batteryPer}>{Status()}</Text>
      <View style={styles.batBar}>
        <View
          style={[
            styles.fillBat,
            {
              width: batPercent as any,
              backgroundColor: `${batColor(batLevel)}`,
            },
          ]}
        ></View>
        <View style={styles.line1}>
          <View style={styles.line2}>
            <View style={styles.line3}></View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  batteryPer: {
    fontSize: 20,
    padding: 10,
  },
  batBar: {
    width: 300,
    height: 100,
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 5,
  },
  fillBat: {
    height: "100%",
    borderRadius: 5,
  },
  line1: {
    borderRightWidth: 5,
    height: "100%",
    width: 75,
    position: "absolute",
    top: 0,
    left: 0,
  },
  line2: {
    borderRightWidth: 5,
    height: "100%",
    width: 150,
    position: "absolute",
    top: 0,
    left: 0,
  },
  line3: {
    borderRightWidth: 5,
    height: "100%",
    width: 225,
    position: "absolute",
    top: 0,
    left: 0,
  },
});
