import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';

import {
  JetConfig,
  JetProvider,
  ConnectionText,
  StatusEmoji,
  StatusText,
} from 'jet';

// Registering an error handler that always throw unhandled exceptions
// This is to enable Jet to exit on uncaught errors
const originalHandler = ErrorUtils.getGlobalHandler();
ErrorUtils.setGlobalHandler((err, isFatal) => {
  originalHandler(err, isFatal);
  throw err;
});

function loadTests(_: JetConfig) {
  const tests = (require as any).context('./e2e', true, /\.jet\.ts$/);
  tests.keys().forEach(tests);
}

function App() {
  return (
    <JetProvider tests={loadTests}>
      <StatusBar hidden />
      <View style={styles.container}>
        <ConnectionText style={styles.connectionText} />
        <View style={styles.statusContainer}>
          <StatusEmoji style={styles.statusEmoji} />
          <StatusText style={styles.statusText} />
        </View>
      </View>
    </JetProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusEmoji: {
    fontSize: 30,
    margin: 30,
    textAlign: 'center',
  },
  statusText: {
    fontSize: 20,
    margin: 20,
    textAlign: 'center',
    color: 'black',
  },
  connectionText: {
    textAlign: 'center',
    color: 'black',
  },
});

export default App;
