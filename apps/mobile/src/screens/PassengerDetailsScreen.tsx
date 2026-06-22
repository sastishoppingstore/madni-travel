import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronDown, User, Calendar, Flag } from 'lucide-react-native';
import { Colors } from '@/theme/colors';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { useBookingStore } from '@/store/bookingStore';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';

const TITLES = ['Mr', 'Mrs', 'Ms', 'Dr'];

const PassengerDetailsScreen = () => {
  const navigation = useNavigation();
  const { searchParams } = useBookingStore();
  const [passengers, setPassengers] = useState([
    {
      title: 'Mr' as string,
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      nationality: '',
      passportNumber: '',
      passportExpiry: '',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTitleDropdown, setShowTitleDropdown] = useState<number | null>(null);

  const passengerCount = searchParams?.passengers || 1;

  const updatePassenger = (index: number, field: string, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const isFormValid = passengers.every(
    p => p.firstName && p.lastName && p.dateOfBirth && p.nationality
  );

  const handleContinue = async () => {
    if (!isFormValid) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsLoading(false);
    navigation.navigate('Checkout' as never);
  };

  const renderPassengerForm = (index: number) => {
    const passenger = passengers[index] || passengers[0];
    return (
      <View key={index} style={styles.passengerCard}>
        <Text style={styles.passengerTitle}>Passenger {index + 1}</Text>

        {/* Title */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Title</Text>
          <TouchableOpacity
            style={styles.selectInput}
            onPress={() =>
              setShowTitleDropdown(showTitleDropdown === index ? null : index)
            }
          >
            <Text style={styles.selectValue}>{passenger.title || 'Select'}</Text>
            <ChevronDown size={16} color={Colors.textMuted} />
          </TouchableOpacity>
          {showTitleDropdown === index && (
            <View style={styles.dropdown}>
              {TITLES.map(t => (
                <TouchableOpacity
                  key={t}
                  style={styles.dropdownItem}
                  onPress={() => {
                    updatePassenger(index, 'title', t);
                    setShowTitleDropdown(null);
                  }}
                >
                  <Text style={styles.dropdownText}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* First Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>First Name *</Text>
          <View style={styles.inputContainer}>
            <User size={18} color={Colors.textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter first name"
              placeholderTextColor={Colors.textMuted}
              value={passenger.firstName}
              onChangeText={text => updatePassenger(index, 'firstName', text)}
              autoCapitalize="words"
            />
          </View>
        </View>

        {/* Last Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Last Name *</Text>
          <View style={styles.inputContainer}>
            <User size={18} color={Colors.textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter last name"
              placeholderTextColor={Colors.textMuted}
              value={passenger.lastName}
              onChangeText={text => updatePassenger(index, 'lastName', text)}
              autoCapitalize="words"
            />
          </View>
        </View>

        {/* Date of Birth */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Date of Birth *</Text>
          <View style={styles.inputContainer}>
            <Calendar size={18} color={Colors.textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={Colors.textMuted}
              value={passenger.dateOfBirth}
              onChangeText={text => updatePassenger(index, 'dateOfBirth', text)}
            />
          </View>
        </View>

        {/* Nationality */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nationality *</Text>
          <View style={styles.inputContainer}>
            <Flag size={18} color={Colors.textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter nationality"
              placeholderTextColor={Colors.textMuted}
              value={passenger.nationality}
              onChangeText={text => updatePassenger(index, 'nationality', text)}
            />
          </View>
        </View>

        {/* Passport Number */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Passport Number</Text>
          <View style={styles.inputContainer}>
            <FileTextIcon size={18} color={Colors.textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter passport number"
              placeholderTextColor={Colors.textMuted}
              value={passenger.passportNumber}
              onChangeText={text => updatePassenger(index, 'passportNumber', text)}
              autoCapitalize="characters"
            />
          </View>
        </View>

        {/* Passport Expiry */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Passport Expiry</Text>
          <View style={styles.inputContainer}>
            <Calendar size={18} color={Colors.textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={Colors.textMuted}
              value={passenger.passportExpiry}
              onChangeText={text => updatePassenger(index, 'passportExpiry', text)}
            />
          </View>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Header title="Passenger Details" />
        <LoadingSpinner fullScreen message="Processing..." />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Passenger Details" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.subtitle}>
          Please enter details for {passengerCount} passenger{passengerCount > 1 ? 's' : ''}
        </Text>

        {Array.from({ length: passengerCount }).map((_, index) =>
          renderPassengerForm(index)
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.continueButton, !isFormValid && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!isFormValid}
          activeOpacity={0.8}
        >
          <Text style={styles.continueText}>Continue to Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Inline icon component for passport
const FileTextIcon = ({ size, color, style }: { size: number; color: string; style?: any }) => (
  <View style={style}>
    <Text style={{ fontSize: size - 4, color, fontWeight: 'bold' }}>P</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  passengerCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.base,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  passengerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  inputGroup: {
    marginBottom: Spacing.base,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.base,
    gap: Spacing.sm,
  },
  inputIcon: {
    marginRight: Spacing.xs,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    height: '100%',
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.base,
  },
  selectValue: {
    fontSize: 15,
    color: Colors.text,
  },
  dropdown: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    marginTop: 4,
    elevation: 5,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    padding: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  dropdownText: {
    fontSize: 15,
    color: Colors.text,
  },
  bottomBar: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingBottom: Spacing.lg + 10,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    opacity: 0.6,
  },
  continueText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default PassengerDetailsScreen;
