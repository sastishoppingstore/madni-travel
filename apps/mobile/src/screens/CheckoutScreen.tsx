import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  CreditCard,
  ShieldCheck,
  ChevronRight,
  Plane,
  Users,
  Calendar,
} from 'lucide-react-native';
import { Colors } from '@/theme/colors';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { formatPrice } from '@/utils/helpers';
import { useBookingStore } from '@/store/bookingStore';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';

const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
  { id: 'easypaisa', name: 'Easypaisa', icon: null },
  { id: 'jazzcash', name: 'JazzCash', icon: null },
];

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const { selectedFlight, searchParams, addBooking } = useBookingStore();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  [cardNumber];
  const [expiry, setExpiry] = useState('');
  [expiry];
  const [cvv, setCvv] = useState('');
  [cvv];
  const [isProcessing, setIsProcessing] = useState(false);

  const flightPrice = selectedFlight?.price || 0;
  const passengerCount = searchParams?.passengers || 1;
  const taxes = Math.round(flightPrice * passengerCount * 0.12);
  const serviceFee = 2500;
  const totalAmount = flightPrice * passengerCount + taxes + serviceFee;

  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const bookingId = 'BK' + Date.now().toString().slice(-8);
    const success = await addBooking({
      type: 'flight',
      title: `${selectedFlight?.from?.name || 'Lahore'} to ${selectedFlight?.to?.name || 'Jeddah'}`,
      subtitle: `${selectedFlight?.airline || 'Airline'} - ${selectedFlight?.cabin || 'Economy'}`,
      date: searchParams?.departDate || new Date().toISOString().split('T')[0],
      status: 'confirmed',
      amount: totalAmount,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=200',
    });

    setIsProcessing(false);

    if (success) {
      navigation.navigate('BookingConfirmation' as never, { bookingId } as never);
    }
  };

  if (isProcessing) {
    return (
      <View style={styles.container}>
        <Header title="Checkout" />
        <LoadingSpinner fullScreen message="Processing your payment..." />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Checkout" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Booking Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Booking Summary</Text>

          <View style={styles.flightSummary}>
            <View style={styles.airlineBadge}>
              <Text style={styles.airlineCode}>{selectedFlight?.airlineCode || 'PK'}</Text>
            </View>
            <View style={styles.flightInfo}>
              <Text style={styles.flightRoute}>
                {selectedFlight?.from?.code || 'LHE'} - {selectedFlight?.to?.code || 'JED'}
              </Text>
              <Text style={styles.flightMeta}>
                {selectedFlight?.airline || 'PIA'} | {selectedFlight?.flightNumber || 'PK731'}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Calendar size={14} color={Colors.textMuted} />
              <Text style={styles.detailText}>{searchParams?.departDate || '2024-12-20'}</Text>
            </View>
            <View style={styles.detailItem}>
              <Users size={14} color={Colors.textMuted} />
              <Text style={styles.detailText}>{passengerCount} Passenger(s)</Text>
            </View>
            <View style={styles.detailItem}>
              <Plane size={14} color={Colors.textMuted} />
              <Text style={styles.detailText}>{searchParams?.cabinClass || 'Economy'}</Text>
            </View>
          </View>

          <View style={styles.priceBreakdown}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Flight Fare ({passengerCount}x)</Text>
              <Text style={styles.priceValue}>{formatPrice(flightPrice * passengerCount)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Taxes & Fees</Text>
              <Text style={styles.priceValue}>{formatPrice(taxes)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Service Fee</Text>
              <Text style={styles.priceValue}>{formatPrice(serviceFee)}</Text>
            </View>
            <View style={[styles.priceRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>{formatPrice(totalAmount)}</Text>
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.paymentCard}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {PAYMENT_METHODS.map(method => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethod,
                paymentMethod === method.id && styles.paymentMethodActive,
              ]}
              onPress={() => setPaymentMethod(method.id)}
            >
              <View style={styles.paymentMethodLeft}>
                {method.icon && <method.icon size={22} color={Colors.primary} />}
                {!method.icon && (
                  <View style={styles.paymentIconPlaceholder}>
                    <Text style={styles.paymentIconText}>{method.name[0]}</Text>
                  </View>
                )}
                <Text style={styles.paymentMethodName}>{method.name}</Text>
              </View>
              <View
                style={[
                  styles.radioButton,
                  paymentMethod === method.id && styles.radioButtonActive,
                ]}
              >
                {paymentMethod === method.id && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Secure Badge */}
        <View style={styles.secureBadge}>
          <ShieldCheck size={18} color={Colors.success} />
          <Text style={styles.secureText}>Your payment is secured with SSL encryption</Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabelSmall}>Total</Text>
          <Text style={styles.priceValueLarge}>{formatPrice(totalAmount)}</Text>
        </View>
        <TouchableOpacity style={styles.payButton} onPress={handlePayment} activeOpacity={0.8}>
          <Text style={styles.payButtonText}>Pay Now</Text>
          <ChevronRight size={18} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  summaryCard: {
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
  flightSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  airlineBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  airlineCode: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  flightInfo: {
    marginLeft: Spacing.base,
    flex: 1,
  },
  flightRoute: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  flightMeta: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: Spacing.base,
    marginBottom: Spacing.base,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  priceBreakdown: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.base,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
  },
  priceLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: Spacing.sm,
    paddingTop: Spacing.base,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
  },
  paymentCard: {
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
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  paymentMethodActive: {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}05`,
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
  },
  paymentIconPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentIconText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  paymentMethodName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonActive: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.base,
  },
  secureText: {
    fontSize: 13,
    color: Colors.success,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingBottom: Spacing.lg + 10,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabelSmall: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  priceValueLarge: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primary,
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  payButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CheckoutScreen;
