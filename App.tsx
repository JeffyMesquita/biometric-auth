import { useEffect, useState } from 'react';
import { Text, View, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

import { styles } from './styles';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function verifyAvailableAuthenticate() {
    const compatible = await LocalAuthentication.hasHardwareAsync();

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();

    console.log(
      types.map((type) => LocalAuthentication.AuthenticationType[type])
    );
  }

  async function handleAuthenticate() {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!isBiometricEnrolled) {
      return Alert.alert(
        'Login',
        'Não há biometria cadastrada. Por favor, cadastre uma biometria.'
      );
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Autentique-se para acessar o app',
      fallbackLabel: 'Biometria não reconhecida. Usar senha',
    })

    console.log(auth);
    setIsAuthenticated(auth.success);
  }

  useEffect(() => {
    verifyAvailableAuthenticate();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Usuário Conectado: {isAuthenticated ? 'Sim' : 'Não'}</Text>

      <Button title="Autenticar" onPress={handleAuthenticate} />
    </View>
  );
}
