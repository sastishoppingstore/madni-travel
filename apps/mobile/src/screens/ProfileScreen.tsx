import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  User,
  Phone,
  Mail,
  ChevronRight,
  Headphones,
  MessageCircle,
  LogOut,
  Shield,
  FileText,
  Star,
} from 'lucide-react-native';
import { Colors } from '@/theme/colors';
import { Spacing, BorderRadius } from '@/theme/spacing';
import { useAuth } from '@/hooks/useAuth';
import { getInitials } from '@/utils/helpers';
import LoadingSpinner from '@/components/LoadingSpinner';

const MENU_ITEMS = [
  {
    id: 'support',
    title: 'Customer Support',
    subtitle: 'Get help with your bookings',
    icon: Headphones,
    color: Colors.primary,
    screen: 'Support',
  },
  {
    id: 'chatbot',
    title: 'AI Assistant',
    subtitle: 'Chat with our smart assistant',
    icon: MessageCircle,
    color: '#8B5CF6',
    screen: 'Chatbot',
  },
  {
    id: 'terms',
    title: 'Terms & Conditions',
    subtitle: 'Read our terms of service',
    icon: FileText,
    color: Colors.info,
    screen: null,
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    subtitle: 'How we protect your data',
    icon: Shield,
    color: Colors.success,
    screen: null,
  },
  {
    id: 'rate',
    title: 'Rate Our App',
    subtitle: 'Share your feedback',
    icon: Star,
    color: Colors.accent,
    screen: null,
  },
];

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, logout, isLoading } = useAuth();

  if (isLoading && !user) {
    return <LoadingSpinner fullScreen message="Loading profile..." />;
  }

  const handleMenuPress = (item: (typeof MENU_ITEMS)[0]) => {
    if (item.screen) {
      navigation.navigate(item.screen as never);
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {getInitials(user?.name || 'User')}
              </Text>
            </View>
            <View style={styles.onlineIndicator} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || 'Guest User'}</Text>
            <View style={styles.infoRow}>
              <Mail size={14} color={Colors.textMuted} />
              <Text style={styles.infoText}>{user?.email || 'No email'}</Text>
            </View>
            {user?.phone && (
              <View style={styles.infoRow}>
                <Phone size={14} color={Colors.textMuted} />
                <Text style={styles.infoText}>{user.phone}</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Menu */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Settings</Text>
          {MENU_ITEMS.map(item => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => handleMenuPress(item)}
                activeOpacity={0.7}
              >
                <View style={[styles.menuIcon, { backgroundColor: `${item.color}15` }]}>
                  <IconComponent size={22} color={item.color} />
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
                <ChevronRight size={18} color={Colors.textMuted} />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout} activeOpacity={0.8}>
          <LogOut size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Madni Travel v1.0.0</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingTop: 60,
    paddingBottom: Spacing.xl,
    borderBottomLeftRadius: BorderRadius.lg,
    borderBottomRightRadius: BorderRadius.lg,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.white,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  userInfo: {
    marginLeft: Spacing.lg,
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  infoText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  scrollView: {
    flex: 1,
  },
  menuContainer: {
    margin: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.base,
  },
  menuContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.base,
    backgroundColor: Colors.errorLight,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.error,
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
  },
});

export default ProfileScreen;
