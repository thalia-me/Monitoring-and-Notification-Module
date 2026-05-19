// E-Defense — Login Screen
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../../contexts/AuthContext';

// @ts-ignore
import UNCLogo from '../../assets/unc-logo.png';

export const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('juan.delacruz@student.unc.edu.ph');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('Student Researcher');

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Please fill in both email and password.');
      return;
    }
    try {
      setLoading(true);
      await login({ email: username.trim(), password: password });
      // Navigation is automatically handled by AuthContext state changes
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please verify your credentials.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Left Panel */}
      <View style={styles.leftPanel}>
        <View style={styles.leftContent}>
          <View style={styles.logoCircle}>
             <Image source={UNCLogo} style={styles.logoImage} resizeMode="contain" />
          </View>
          <Text style={styles.brandTitle}>Research Defense Scheduler</Text>
          <Text style={styles.brandSubtitle}>
            Welcome to the Defense Appointment Scheduling!{'\n'}
            Your all-in-one platform for managing academic{'\n'}
            schedules efficiently.
          </Text>
          <Text style={styles.bottomLabel}>UNC Research Defense Scheduler</Text>
        </View>
      </View>

      {/* Right Panel */}
      <View style={styles.rightPanel}>
        <View style={styles.formWrapper}>
          <Text style={styles.formHeading}>
            Sign in with your registered email and password.
          </Text>

          {/* Quick Demo Accounts Helper */}
          <View style={{ backgroundColor: '#EBF5FF', borderLeftWidth: 4, borderLeftColor: '#1C64F2', padding: 12, borderRadius: 6, marginBottom: 20 }}>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#1E3A8A', marginBottom: 4 }}>💡 Demo Seeded Accounts (Password: password123):</Text>
            <Text style={{ fontSize: 12, color: '#1E40AF' }}>• <Text style={{ fontWeight: '600' }}>Student:</Text> juan.delacruz@student.unc.edu.ph</Text>
            <Text style={{ fontSize: 12, color: '#1E40AF' }}>• <Text style={{ fontWeight: '600' }}>Adviser:</Text> maria.danila@unc.edu.ph</Text>
            <Text style={{ fontSize: 12, color: '#1E40AF' }}>• <Text style={{ fontWeight: '600' }}>Dean:</Text> agnes.reyes@unc.edu.ph</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Login As:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={userType}
                onValueChange={(itemValue) => {
                  setUserType(itemValue);
                  if (itemValue === 'Student Researcher') {
                    setUsername('juan.delacruz@student.unc.edu.ph');
                    setPassword('password123');
                  } else if (itemValue === 'Adviser') {
                    setUsername('maria.danila@unc.edu.ph');
                    setPassword('password123');
                  } else if (itemValue === 'Dean') {
                    setUsername('agnes.reyes@unc.edu.ph');
                    setPassword('password123');
                  }
                }}
                style={styles.picker}
              >
                <Picker.Item label="Student Researcher" value="Student Researcher" />
                <Picker.Item label="Dean" value="Dean" />
                <Picker.Item label="Adviser" value="Adviser" />
              </Picker>
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Email Address:</Text>
            <TextInput
              style={styles.input}
              placeholder="juan.delacruz@student.unc.edu.ph"
              placeholderTextColor="#A0AEC0"
              value={username}
              onChangeText={setUsername}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Password:</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="*********"
                placeholderTextColor="#A0AEC0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#718096" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.forgotLink}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.signInBtn, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            activeOpacity={0.8}
            disabled={loading}
          >
            <Text style={styles.signInText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
            {!loading && <Ionicons name="arrow-forward-outline" size={18} color="#FFF" style={{ marginLeft: 8 }} />}
          </TouchableOpacity>

          <View style={styles.registerRow}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F4F5F7',
  },
  leftPanel: {
    width: '45%',
    backgroundColor: '#303030',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftContent: {
    alignItems: 'center',
    width: '80%',
  },
  logoCircle: {
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 10,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 130,
    height: 130,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  brandSubtitle: {
    fontSize: 14,
    color: '#A0AEC0',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },
  bottomLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginTop: 40,
  },
  rightPanel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F5F7',
  },
  formWrapper: {
    width: 400,
  },
  formHeading: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3748',
    marginBottom: 30,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#4A5568',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 45,
    fontSize: 14,
    color: '#2D3748',
    outlineStyle: 'none',
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    height: 45,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  picker: {
    height: 45,
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 0,
    fontSize: 14,
    color: '#2D3748',
    paddingHorizontal: 10,
    outlineStyle: 'none',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 45,
  },
  passwordInput: {
    flex: 1,
    fontSize: 14,
    color: '#2D3748',
    height: '100%',
    outlineStyle: 'none',
  },
  forgotLink: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotText: {
    fontSize: 13,
    color: '#1C64F2',
  },
  signInBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C64F2',
    borderRadius: 8,
    height: 45,
    marginBottom: 20,
  },
  signInText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#718096',
    marginRight: 5,
  },
  registerLink: {
    fontSize: 14,
    color: '#1C64F2',
    fontWeight: '500',
  },
});
