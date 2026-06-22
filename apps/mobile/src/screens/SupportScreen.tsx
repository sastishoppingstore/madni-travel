import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import {
  MessageCircle,
  Mail,
  Phone,
  Clock,
  MapPin,
  Globe,
  ChevronRight,
  Headphones,
} from 'lucide-react-native';
import { Colors } from '@/theme/colors';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { WHATSAPP_NUMBER, SUPPORT_EMAIL } from '@/utils/constants';
import Header from '@/components/Header';

const SUPPORT_CHANNELS = [
  {
    id: 'whatsapp',
    title: 'WhatsApp Support',
    subtitle: 'Get instant help via WhatsApp',
    icon: MessageCircle,
    color: '#25D366',
    action: () => Linking.openURL(`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}`),
  },
  {
    id: 'email',
    title: 'Email Support',
    subtitle: SUPPORT_EMAIL,
    icon: Mail,
    color: Colors.info,
    action: () => Linking.openURL(`mailto:${SUPPORT_EMAIL}`),
  },
  {
    id: 'phone',
    title: 'Call Us',
    subtitle: WHATSAPP_NUMBER,
    icon: Phone,
    color: Colors.primary,
    action: () => Linking.openURL(`tel:${WHATSAPP_NUMBER}`),
  },
];

const OFFICE_HOURS = [
  { day: 'Monday - Friday', time: '9:00 AM - 9:00 PM' },
  { day: 'Saturday', time: '10:00 AM - 6:00 PM' },
  { day: 'Sunday', time: 'Emergency Only' },
];

const SupportScreen = () => {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <View style={styles.container}>
      <Header title="Customer Support" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header Card */}
        <View style={styles.headerCard}>
          <View style={styles.headerIcon}>
            <Headphones size={32} color={Colors.white} />
          </View>
          <Text style={styles.headerTitle}>We're Here to Help</Text>
          <Text style={styles.headerSubtitle}>
            Contact us through any of the channels below. Our team is ready to assist you 24/7.
          </Text>
        </View>

        {/* Contact Channels */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          {SUPPORT_CHANNELS.map(channel => {
            const IconComponent = channel.icon;
            return (
              <TouchableOpacity
                key={channel.id}
                style={styles.channelCard}
                onPress={channel.action}
                activeOpacity={0.8}
              >
                <View style={[styles.channelIcon, { backgroundColor: `${channel.color}15` }]}>
                  <IconComponent size={24} color={channel.color} />
                </View>
                <View style={styles.channelInfo}>
                  <Text style={styles.channelTitle}>{channel.title}</Text>
                  <Text style={styles.channelSubtitle}>{channel.subtitle}</Text>
                </View>
                <ChevronRight size={20} color={Colors.textMuted} />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Office Hours */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Office Hours</Text>
          <View style={styles.hoursCard}>
            <View style={styles.hoursHeader}>
              <Clock size={20} color={Colors.primary} />
              <Text style={styles.hoursHeaderText}>Working Hours</Text>
            </View>
            {OFFICE_HOURS.map((item, index) => (
              <View key={index} style={styles.hoursRow}>
                <Text style={styles.hoursDay}>{item.day}</Text>
                <Text style={styles.hoursTime}>{item.time}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Visit Us */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visit Our Office</Text>
          <View style={styles.officeCard}>
            <View style={styles.officeIcon}>
              <MapPin size={20} color={Colors.primary} />
            </View>
            <View style={styles.officeInfo}>
              <Text style={styles.officeTitle}>Madni Travel & Tours</Text>
              <Text style={styles.officeAddress}>
                6 Main Mushaf Ali Road, Sargodha, Pakistan
              </Text>
            </View>
          </View>
        </View>

        {/* Website */}
        <TouchableOpacity
          style={styles.websiteCard}
          onPress={() => openLink('https://madnitravel.com')}
          activeOpacity={0.8}
        >
          <Globe size={20} color={Colors.primary} />
          <Text style={styles.websiteText}>www.madnitravel.com</Text>
          <ChevronRight size={18} color={Colors.textMuted} />
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  headerCard: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.base,
  },
  channelCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  channelIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.base,
  },
  channelInfo: {
    flex: 1,
  },
  channelTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  channelSubtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  hoursCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  hoursHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  hoursHeaderText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  hoursDay: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  hoursTime: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  officeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  officeIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: `${Colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.base,
  },
  officeInfo: {
    flex: 1,
  },
  officeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  officeAddress: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  websiteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginTop: Spacing.base,
    gap: Spacing.sm,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  websiteText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.primary,
    flex: 1,
    textAlign: 'center',
  },
});

export default SupportScreen;
