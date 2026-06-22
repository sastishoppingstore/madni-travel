import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  Plane,
  Palmtree,
  Moon,
  FileText,
  Building2,
  Bus,
} from 'lucide-react-native';
import { Colors } from '@/theme/colors';
import { Spacing } from '@/theme/spacing';
import { BorderRadius } from '@/theme/spacing';

const iconMap: Record<string, React.ElementType> = {
  Plane,
  Palmtree,
  Moon,
  FileText,
  Building2,
  Bus,
};

interface ServiceCardProps {
  id: string;
  name: string;
  icon: string;
  color: string;
  onPress: () => void;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  icon,
  color,
  onPress,
  index,
}) => {
  const IconComponent = iconMap[icon] || Plane;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.7}
      delayPressIn={0}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
        <IconComponent size={26} color={color} strokeWidth={1.8} />
      </View>
      <Text style={styles.label}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '30%',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
});

export default ServiceCard;
