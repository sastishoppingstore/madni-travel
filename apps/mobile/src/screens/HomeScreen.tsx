import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Dimensions,
  Pressable,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  Bell,
  Plane,
  Landmark,
  Building2,
  Palmtree,
  Sparkles,
  CalendarDays,
  Users,
  ChevronDown,
  ChevronRight,
  ArrowLeftRight,
  Briefcase,
  Gift,
  User,
  Star,
  MessageSquareMore,
  Headphones,
} from 'lucide-react-native';
import { Colors } from '@/theme/colors';
import { FontFamily } from '@/theme/typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type SearchTab = 'flights' | 'hotels' | 'umrah' | 'holidays';

type ServiceItem = {
  key: string;
  title: string;
  accent: string;
  emoji: string;
  bullets: string[];
  route: string;
  stars?: boolean;
};

const HERO_PARTICLES = Array.from({ length: 8 }).map((_, index) => ({
  id: `particle-${index}`,
  top: 22 + index * 9,
  left: index % 2 === 0 ? 20 + index * 8 : SCREEN_WIDTH - 90 - index * 7,
  size: 4 + (index % 3),
}));

const SEARCH_TABS: Array<{ key: SearchTab; label: string; icon: React.ReactNode }> = [
  { key: 'flights', label: 'Flights', icon: <Plane size={15} color={Colors.travelTextSecondary} /> },
  { key: 'hotels', label: 'Hotels', icon: <Building2 size={15} color={Colors.travelTextSecondary} /> },
  { key: 'umrah', label: 'Umrah', icon: <Landmark size={15} color={Colors.travelTextSecondary} /> },
  { key: 'holidays', label: 'Holidays', icon: <Gift size={15} color={Colors.travelTextSecondary} /> },
];

const SERVICES: ServiceItem[] = [
  {
    key: 'visa-service',
    title: 'Visa Service',
    accent: Colors.travelBlue,
    emoji: '🛂',
    bullets: ['Fast, Reliable & Hassle-Free', 'Tourist, Business, Family Visas', 'Expert Guidance'],
    route: 'VisaServices',
  },
  {
    key: 'holiday-plan',
    title: 'Holiday Plan',
    accent: Colors.travelGreen,
    emoji: '🏖️',
    bullets: ['Curated Holidays', 'Custom Packages', 'Family & Group Trips'],
    route: 'Packages',
  },
  {
    key: 'hotel-booking',
    title: 'Hotel Booking',
    accent: Colors.travelBlue,
    emoji: '🏨',
    bullets: ['Find & Book the Best Hotels', 'Worldwide Hotel Options', 'Best Price Guarantee'],
    route: 'HotelSearch',
    stars: true,
  },
  {
    key: 'umrah-packages',
    title: 'Umrah Packages',
    accent: Colors.travelBlue,
    emoji: '🕋',
    bullets: ['Spiritual Journey Made Easy', 'Visa & Transport Included', 'Experienced Support'],
    route: 'UmrahPackages',
  },
  {
    key: 'tour-packages',
    title: 'Tour Packages',
    accent: Colors.travelBlue,
    emoji: '🎈',
    bullets: ['Explore the World with Our Amazing Tours', 'Customizable Itineraries', 'Expertly Curated Experiences'],
    route: 'Packages',
  },
  {
    key: 'transport-service',
    title: 'Transport Service',
    accent: Colors.travelBlue,
    emoji: '🚐',
    bullets: ['Airport Transfers & Local Transport', 'Comfortable & Safe Rides', '24/7 Availability'],
    route: 'Support',
  },
  {
    key: 'insurance',
    title: 'Travel Insurance',
    accent: Colors.travelBlue,
    emoji: '🛡️',
    bullets: ['Travel with Confidence', 'Medical Coverage', 'Trip Cancellation', '24/7 Assistance'],
    route: 'Support',
  },
  {
    key: 'best-deals',
    title: 'Best Deals',
    accent: Colors.travelRed,
    emoji: '🏷️',
    bullets: ['Exclusive Deals for Smart Travelers', 'Flight & Hotel Deals', 'Save More, Travel More'],
    route: 'Flights',
  },
];

const DESTINATIONS = [
  { id: 'dubai', city: 'Dubai', country: 'UAE', price: 320, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800' },
  { id: 'istanbul', city: 'Istanbul', country: 'Turkey', price: 290, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800' },
  { id: 'maldives', city: 'Maldives', country: 'Maldives', price: 390, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800' },
  { id: 'london', city: 'London', country: 'UK', price: 330, image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800' },
  { id: 'bali', city: 'Bali', country: 'Indonesia', price: 410, image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800' },
  { id: 'makkah', city: 'Makkah', country: 'Saudi Arabia', price: 210, image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800' },
] as const;

const TESTIMONIALS = [
  {
    id: '1',
    name: 'Ahmed R.',
    location: 'Dubai, UAE',
    text: 'Madani Travel made our Umrah journey so smooth and comfortable. Excellent service and very supportive team.',
    image: 'https://i.pravatar.cc/160?img=12',
  },
  {
    id: '2',
    name: 'Sana K.',
    location: 'London, UK',
    text: 'Booked our family trip to Maldives. Everything was perfectly arranged. Highly recommended!',
    image: 'https://i.pravatar.cc/160?img=47',
  },
  {
    id: '3',
    name: 'Bilal M.',
    location: 'Riyadh, KSA',
    text: 'Great deals on flights and hotels. Support is available 24/7 which is amazing.',
    image: 'https://i.pravatar.cc/160?img=14',
  },
] as const;

function SectionTitle({ title, subtitle, right }: { title: string; subtitle?: string; right?: string }) {
  return (
    <View style={styles.sectionHeaderRow}>
      <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
      </View>
      {right ? <Text style={styles.sectionAction}>{right}</Text> : null}
    </View>
  );
}

function StarRating() {
  return (
    <View style={styles.starRow}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={13} color={Colors.travelStar} fill={Colors.travelStar} />
      ))}
    </View>
  );
}

function ServiceCard3D({
  item,
  index,
  onPress,
}: {
  item: ServiceItem;
  index: number;
  onPress: () => void;
}) {
  const tiltX = useSharedValue(0);
  const tiltY = useSharedValue(0);
  const scale = useSharedValue(0.96);
  const translateY = useSharedValue(28);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(index * 80, withTiming(1, { duration: 350 }));
    translateY.value = withDelay(index * 80, withSpring(0, { damping: 14, stiffness: 110 }));
    scale.value = withDelay(index * 80, withSpring(1, { damping: 14, stiffness: 110 }));
  }, [index, opacity, scale, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { perspective: 1000 },
      { rotateX: `${tiltX.value}deg` },
      { rotateY: `${tiltY.value}deg` },
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  const handlePressIn = () => {
    tiltX.value = withSpring(-6, { damping: 12, stiffness: 120 });
    tiltY.value = withSpring(8, { damping: 12, stiffness: 120 });
    scale.value = withSpring(0.98, { damping: 14, stiffness: 140 });
  };

  const handlePressOut = () => {
    tiltX.value = withSpring(0, { damping: 12, stiffness: 120 });
    tiltY.value = withSpring(0, { damping: 12, stiffness: 120 });
    scale.value = withSpring(1, { damping: 14, stiffness: 120 });
  };

  return (
    <Animated.View style={[styles.serviceCard, animatedStyle]}>
      <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.serviceCardPressable}>
        <View style={styles.serviceCardContent}>
          <Text style={[styles.serviceTitle, { color: item.accent }]}>{item.title}</Text>

          <View style={styles.serviceBullets}>
            {item.bullets.map((bullet) => (
              <View key={bullet} style={styles.bulletRow}>
                <Text style={styles.bulletCheck}>✓</Text>
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>

          {item.stars ? <StarRating /> : null}

          <View style={styles.serviceBottomRow}>
            <View style={styles.serviceArrowButton}>
              <ChevronRight size={16} color={Colors.travelBlue} />
            </View>
          </View>
          <View style={styles.serviceEmojiWrap}>
            <Text style={styles.serviceEmoji}>{item.emoji}</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<SearchTab>('flights');
  const [fromAirport, setFromAirport] = useState({ code: 'DXB', city: 'Dubai, UAE' });
  const [toAirport, setToAirport] = useState({ code: 'LHR', city: 'London, UK' });
  const heroFloat = useSharedValue(0);
  const searchPress = useSharedValue(1);
  const tabSlide = useSharedValue(0);

  useEffect(() => {
    heroFloat.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 1500, easing: Easing.inOut(Easing.quad) }),
        withTiming(8, { duration: 1500, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      true,
    );
  }, [heroFloat]);

  useEffect(() => {
    const index = SEARCH_TABS.findIndex((tab) => tab.key === activeTab);
    tabSlide.value = withTiming(index, { duration: 180 });
  }, [activeTab, tabSlide]);

  const heroFloatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: heroFloat.value }],
  }));

  const tabIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tabSlide.value * ((SCREEN_WIDTH - 48) / 4) }],
  }));

  const searchPressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: searchPress.value }],
  }));

  const handleSwap = () => {
    const nextFrom = toAirport;
    setToAirport(fromAirport);
    setFromAirport(nextFrom);
  };

  const renderService = ({ item, index }: { item: ServiceItem; index: number }) => (
    <View style={styles.serviceColumn}>
      <ServiceCard3D
        item={item}
        index={index}
        onPress={() => navigation.navigate(item.route as never)}
      />
    </View>
  );

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 120 }]}
        >
          <View style={[styles.heroSection, { paddingTop: insets.top + 8 }]}>
            <View style={styles.heroBackdropBase} />
            <View style={styles.heroBackdropBlue} />
            <View style={styles.heroBackdropGlow} />

            <View style={styles.heroIconLeft}>
              <Landmark size={82} color="rgba(255,255,255,0.16)" />
            </View>
            <View style={styles.heroIconRight}>
              <Building2 size={86} color="rgba(255,255,255,0.16)" />
            </View>
            <View style={styles.heroPalmLeft}>
              <Palmtree size={60} color="rgba(255,255,255,0.12)" />
            </View>
            <View style={styles.heroPalmRight}>
              <Palmtree size={56} color="rgba(255,255,255,0.12)" />
            </View>

            <View style={styles.heroTopBar}>
              <View style={styles.brandBlock}>
                <View style={styles.brandIcon}>
                  <Landmark size={13} color={Colors.travelGold} />
                </View>
                <View>
                  <Text style={styles.brandTitle}>Madani Travel</Text>
                  <Text style={styles.brandTagline}>Journey with Trust, Travel with Peace</Text>
                </View>
              </View>

              <View style={styles.heroActions}>
                <View style={styles.bellWrap}>
                  <Bell size={22} color={Colors.white} />
                  <View style={styles.bellBadge} />
                </View>
                <View style={styles.avatarCircle}>
                  <User size={16} color={Colors.travelNavy} />
                </View>
              </View>
            </View>

            <Animated.View style={[styles.heroPlaneWrap, heroFloatStyle]}>
              <View style={styles.planeShadow} />
              <Plane size={58} color={Colors.white} strokeWidth={1.6} />
            </Animated.View>

            {HERO_PARTICLES.map((particle) => (
              <View
                key={particle.id}
                style={[
                  styles.heroParticle,
                  {
                    top: particle.top,
                    left: particle.left,
                    width: particle.size,
                    height: particle.size,
                  },
                ]}
              />
            ))}
            <Sparkles size={12} color="rgba(255,255,255,0.55)" style={styles.sparkleOne} />
            <Sparkles size={10} color="rgba(255,255,255,0.45)" style={styles.sparkleTwo} />

            <View style={styles.heroTextWrap}>
              <Text style={styles.heroLineOne}>Your Journey,</Text>
              <Text style={styles.heroLineTwo}>Our Priority</Text>
              <Text style={styles.heroLineThree}>
                Flights, Hotels, Umrah & Holiday Packages - All in One Place
              </Text>
            </View>
          </View>

          <Animated.View style={[styles.searchCard, searchPressStyle]}>
            <View style={styles.tabRow}>
              <Animated.View style={[styles.tabIndicator, tabIndicatorStyle]} />
              {SEARCH_TABS.map((tab) => {
                const focused = activeTab === tab.key;
                return (
                  <TouchableOpacity
                    key={tab.key}
                    activeOpacity={0.8}
                    style={[styles.tabButton, focused && styles.tabButtonActive]}
                    onPress={() => setActiveTab(tab.key)}
                  >
                    {React.cloneElement(tab.icon as React.ReactElement, {
                      color: focused ? Colors.white : Colors.travelTextSecondary,
                    })}
                    <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>{tab.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {activeTab === 'flights' ? (
              <View style={styles.formWrap}>
                <View style={styles.rowTwo}>
                  <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>From Airport</Text>
                    <View style={styles.inputValueRow}>
                      <Plane size={16} color={Colors.travelBlue} />
                      <Text style={styles.inputValue}>{fromAirport.code}</Text>
                    </View>
                    <Text style={styles.inputMeta}>{fromAirport.city}</Text>
                  </View>

                  <TouchableOpacity style={styles.swapButton} onPress={handleSwap} activeOpacity={0.9}>
                    <ArrowLeftRight size={18} color={Colors.white} />
                  </TouchableOpacity>

                  <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>To Airport</Text>
                    <View style={styles.inputValueRow}>
                      <Plane size={16} color={Colors.travelBlue} />
                      <Text style={styles.inputValue}>{toAirport.code}</Text>
                    </View>
                    <Text style={styles.inputMeta}>{toAirport.city}</Text>
                  </View>
                </View>

                <View style={styles.rowTwo}>
                  <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>Departure Date</Text>
                    <View style={styles.inputValueRow}>
                      <CalendarDays size={16} color={Colors.travelBlue} />
                      <Text style={styles.inputValueSmall}>25 May, 2025</Text>
                    </View>
                  </View>
                  <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>Return Date</Text>
                    <View style={styles.inputValueRow}>
                      <CalendarDays size={16} color={Colors.travelBlue} />
                      <Text style={styles.inputValueSmall}>01 Jun, 2025</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.rowTwo}>
                  <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>Passengers</Text>
                    <View style={styles.inputValueRow}>
                      <Users size={16} color={Colors.travelBlue} />
                      <Text style={styles.inputValueSmall}>1 Passenger</Text>
                    </View>
                  </View>
                  <View style={styles.inputCard}>
                    <Text style={styles.inputLabel}>Class</Text>
                    <View style={styles.inputValueRow}>
                      <Briefcase size={16} color={Colors.travelBlue} />
                      <Text style={styles.inputValueSmall}>Economy</Text>
                      <ChevronDown size={16} color={Colors.travelTextSecondary} />
                    </View>
                  </View>
                </View>

                <Pressable
                  onPress={() => navigation.navigate('Flights' as never)}
                  onPressIn={() => {
                    searchPress.value = withSpring(0.97, { damping: 14, stiffness: 180 });
                  }}
                  onPressOut={() => {
                    searchPress.value = withSpring(1, { damping: 14, stiffness: 180 });
                  }}
                  style={styles.searchButton}
                >
                  <Text style={styles.searchButtonText}>Search Flights ✈️</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.placeholderCard}>
                <Text style={styles.placeholderTitle}>
                  {activeTab === 'hotels' ? 'Hotel Search' : activeTab === 'umrah' ? 'Umrah Packages' : 'Holiday Packages'}
                </Text>
                <Text style={styles.placeholderText}>
                  This tab is styled to match the home design. The booking flow can be wired later.
                </Text>
              </View>
            )}
          </Animated.View>

          <View style={styles.sectionBlock}>
            <FlatList
              data={SERVICES}
              keyExtractor={(item) => item.key}
              numColumns={2}
              scrollEnabled={false}
              renderItem={renderService}
              columnWrapperStyle={styles.serviceGridRow}
            />
          </View>

          <View style={styles.supportBanner}>
            <View style={styles.supportLeft}>
              <Text style={styles.supportTitle}>Customer Support</Text>
              <Text style={styles.supportSubtitle}>We&apos;re Here to Help, Every Step of the Way</Text>
              <View style={styles.supportList}>
                <Text style={styles.supportBullet}>✓ 24/7 Support</Text>
                <Text style={styles.supportBullet}>✓ Multiple Channels</Text>
                <Text style={styles.supportBullet}>✓ Quick & Friendly Assistance</Text>
              </View>
            </View>
            <View style={styles.supportRight}>
              <View style={styles.supportIconCircle}>
                <Headphones size={28} color={Colors.travelGold} />
                <MessageSquareMore size={18} color={Colors.travelBlue} style={styles.supportIconBubble} />
              </View>
              <TouchableOpacity style={styles.supportButton} activeOpacity={0.85} onPress={() => navigation.navigate('Support' as never)}>
                <Text style={styles.supportButtonText}>Contact Us →</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sectionBlock}>
            <SectionTitle title="Popular Destinations" right="View All >" />
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={DESTINATIONS}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.destinationList}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.destinationCard} activeOpacity={0.9}>
                  <ImageBackground source={{ uri: item.image }} style={styles.destinationImage} imageStyle={styles.destinationImageRadius}>
                    <View style={styles.destinationShade} />
                    <View style={styles.destinationTextWrap}>
                      <Text style={styles.destinationCity}>{item.city}</Text>
                      <Text style={styles.destinationCountry}>{item.country}</Text>
                    </View>
                    <View style={styles.priceBadge}>
                      <Text style={styles.priceBadgeText}>From ${item.price}</Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={styles.sectionBlock}>
            <SectionTitle title="What Our Travelers Say" />
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={TESTIMONIALS}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.testimonialList}
              snapToInterval={SCREEN_WIDTH * 0.75}
              decelerationRate="fast"
              renderItem={({ item }) => (
                <View style={styles.testimonialCard}>
                  <StarRating />
                  <Text style={styles.testimonialText}>“{item.text}”</Text>
                  <View style={styles.testimonialFooter}>
                    <Image source={{ uri: item.image }} style={styles.testimonialAvatar} />
                    <View>
                      <Text style={styles.testimonialName}>{item.name}</Text>
                      <Text style={styles.testimonialLocation}>{item.location}</Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>

          <View style={styles.ctaBanner}>
            <View style={styles.ctaCopy}>
              <Text style={styles.ctaTitle}>Ready to Start Your Journey?</Text>
              <Text style={styles.ctaSubtitle}>
                Book your next trip with Madani Travel and create unforgettable memories.
              </Text>
            </View>
            <View style={styles.ctaAction}>
              <View style={styles.ctaPlane}>
                <Plane size={40} color={Colors.white} />
              </View>
              <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('Flights' as never)} activeOpacity={0.85}>
                <Text style={styles.ctaButtonText}>Book Now ✈️</Text>
              </TouchableOpacity>
              <Text style={styles.ctaFinePrint}>It&apos;s quick & easy!</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.travelNavy,
  },
  scrollContent: {
    backgroundColor: Colors.background,
  },
  heroSection: {
    minHeight: 360,
    backgroundColor: Colors.travelNavy,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  heroBackdropBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.travelNavy,
  },
  heroBackdropBlue: {
    position: 'absolute',
    left: -20,
    right: -20,
    bottom: 0,
    height: 220,
    backgroundColor: Colors.travelBlue,
    opacity: 0.72,
    borderTopLeftRadius: 110,
    borderTopRightRadius: 110,
  },
  heroBackdropGlow: {
    position: 'absolute',
    right: -70,
    top: 20,
    width: 220,
    height: 220,
    borderRadius: 220,
    backgroundColor: Colors.travelSkyLight,
    opacity: 0.24,
  },
  heroIconLeft: {
    position: 'absolute',
    left: -10,
    bottom: 42,
  },
  heroIconRight: {
    position: 'absolute',
    right: -6,
    bottom: 24,
  },
  heroPalmLeft: {
    position: 'absolute',
    left: 24,
    top: 112,
  },
  heroPalmRight: {
    position: 'absolute',
    right: 22,
    top: 96,
  },
  heroTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  brandBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  brandTitle: {
    color: Colors.white,
    fontFamily: FontFamily.interExtraBold,
    fontSize: 16,
    lineHeight: 18,
  },
  brandTagline: {
    color: Colors.travelTextLight,
    fontFamily: FontFamily.inter,
    fontSize: 10,
    marginTop: 2,
  },
  heroActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bellWrap: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.travelGold,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  heroPlaneWrap: {
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 28,
    width: 220,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planeShadow: {
    position: 'absolute',
    bottom: 6,
    width: 120,
    height: 18,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.18)',
    transform: [{ scaleX: 1.2 }],
  },
  heroParticle: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.72)',
  },
  sparkleOne: {
    position: 'absolute',
    left: 42,
    top: 70,
  },
  sparkleTwo: {
    position: 'absolute',
    right: 56,
    top: 126,
  },
  heroTextWrap: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  heroLineOne: {
    color: Colors.travelGold,
    fontFamily: FontFamily.playfairItalic,
    fontSize: 28,
    lineHeight: 30,
    marginBottom: 2,
  },
  heroLineTwo: {
    color: Colors.white,
    fontFamily: FontFamily.interExtraBold,
    fontSize: 40,
    lineHeight: 42,
    letterSpacing: -1,
  },
  heroLineThree: {
    color: 'rgba(255,255,255,0.86)',
    fontFamily: FontFamily.inter,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    maxWidth: 310,
    marginTop: 10,
  },
  searchCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: -40,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E6EEF9',
    shadowColor: Colors.travelNavy,
    shadowOpacity: 0.14,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  tabRow: {
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: '#F5F8FD',
    borderRadius: 14,
    padding: 4,
    marginBottom: 12,
  },
  tabIndicator: {
    position: 'absolute',
    left: 4,
    top: 4,
    bottom: 4,
    width: (SCREEN_WIDTH - 40) / 4,
    borderRadius: 10,
    backgroundColor: Colors.travelBlue,
  },
  tabButton: {
    flex: 1,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    gap: 6,
    zIndex: 2,
  },
  tabButtonActive: {},
  tabLabel: {
    color: Colors.travelTextSecondary,
    fontFamily: FontFamily.interSemiBold,
    fontSize: 13,
  },
  tabLabelActive: {
    color: Colors.white,
  },
  formWrap: {
    gap: 10,
  },
  rowTwo: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'stretch',
  },
  inputCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 82,
  },
  inputLabel: {
    color: Colors.travelTextLight,
    fontFamily: FontFamily.inter,
    fontSize: 10,
    marginBottom: 6,
  },
  inputValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputValue: {
    color: Colors.travelNavy,
    fontFamily: FontFamily.interExtraBold,
    fontSize: 20,
  },
  inputValueSmall: {
    color: Colors.travelNavy,
    fontFamily: FontFamily.interSemiBold,
    fontSize: 14,
    flexShrink: 1,
  },
  inputMeta: {
    color: Colors.travelTextSecondary,
    fontFamily: FontFamily.inter,
    fontSize: 11,
    marginTop: 4,
  },
  swapButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.travelBlue,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: -2,
    zIndex: 3,
  },
  searchButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: Colors.travelBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    shadowColor: Colors.travelBlue,
    shadowOpacity: 0.34,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  searchButtonText: {
    color: Colors.white,
    fontFamily: FontFamily.interExtraBold,
    fontSize: 16,
  },
  placeholderCard: {
    backgroundColor: Colors.travelCard,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2ECF8',
  },
  placeholderTitle: {
    color: Colors.travelNavy,
    fontFamily: FontFamily.interExtraBold,
    fontSize: 16,
    marginBottom: 6,
  },
  placeholderText: {
    color: Colors.travelTextSecondary,
    fontFamily: FontFamily.inter,
    fontSize: 12,
    lineHeight: 18,
  },
  sectionBlock: {
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  serviceGridRow: {
    gap: 12,
  },
  serviceColumn: {
    flex: 1,
  },
  serviceCard: {
    flex: 1,
    backgroundColor: Colors.travelCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2ECF8',
    minHeight: 182,
    overflow: 'hidden',
    shadowColor: Colors.travelNavy,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  serviceCardPressable: {
    flex: 1,
  },
  serviceCardContent: {
    flex: 1,
    padding: 14,
    paddingBottom: 16,
    position: 'relative',
  },
  serviceTitle: {
    fontFamily: FontFamily.interExtraBold,
    fontSize: 15,
    marginBottom: 8,
  },
  serviceBullets: {
    gap: 6,
    paddingRight: 64,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  bulletCheck: {
    color: Colors.travelGreen,
    fontFamily: FontFamily.interExtraBold,
    fontSize: 12,
    lineHeight: 16,
    marginTop: 1,
  },
  bulletText: {
    flex: 1,
    color: Colors.travelTextSecondary,
    fontFamily: FontFamily.inter,
    fontSize: 11,
    lineHeight: 15,
  },
  starRow: {
    flexDirection: 'row',
    gap: 2,
    marginTop: 8,
  },
  serviceBottomRow: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serviceArrowButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#CBD5E0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  serviceEmojiWrap: {
    position: 'absolute',
    right: 8,
    bottom: 4,
    width: 78,
    height: 78,
    borderRadius: 39,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.72)',
  },
  serviceEmoji: {
    fontSize: 36,
  },
  supportBanner: {
    marginHorizontal: 16,
    marginTop: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F0D080',
    backgroundColor: '#FFF8E7',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  supportLeft: {
    flex: 1,
  },
  supportRight: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  supportTitle: {
    color: Colors.travelNavy,
    fontFamily: FontFamily.interExtraBold,
    fontSize: 15,
  },
  supportSubtitle: {
    color: Colors.travelTextSecondary,
    fontFamily: FontFamily.inter,
    fontSize: 11,
    marginTop: 4,
    marginBottom: 10,
  },
  supportList: {
    gap: 4,
  },
  supportBullet: {
    color: Colors.travelTextSecondary,
    fontFamily: FontFamily.inter,
    fontSize: 11,
  },
  supportIconCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: 'rgba(212,160,23,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportIconBubble: {
    position: 'absolute',
    right: -2,
    bottom: -2,
  },
  supportButton: {
    backgroundColor: '#C8860A',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  supportButtonText: {
    color: Colors.white,
    fontFamily: FontFamily.interSemiBold,
    fontSize: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    color: Colors.travelNavy,
    fontFamily: FontFamily.interExtraBold,
    fontSize: 18,
  },
  sectionSubtitle: {
    color: Colors.travelBlue,
    fontFamily: FontFamily.interSemiBold,
    fontSize: 12,
    marginTop: 3,
  },
  sectionAction: {
    color: Colors.travelBlue,
    fontFamily: FontFamily.interSemiBold,
    fontSize: 12,
  },
  destinationList: {
    gap: 12,
    paddingRight: 16,
  },
  destinationCard: {
    width: 110,
    height: 150,
    borderRadius: 14,
    overflow: 'hidden',
  },
  destinationImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  destinationImageRadius: {
    borderRadius: 14,
  },
  destinationShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,26,60,0.18)',
  },
  destinationTextWrap: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
  },
  destinationCity: {
    color: Colors.white,
    fontFamily: FontFamily.interExtraBold,
    fontSize: 13,
  },
  destinationCountry: {
    color: 'rgba(255,255,255,0.8)',
    fontFamily: FontFamily.inter,
    fontSize: 10,
    marginTop: 2,
  },
  priceBadge: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    backgroundColor: Colors.travelBlue,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  priceBadgeText: {
    color: Colors.white,
    fontFamily: FontFamily.interExtraBold,
    fontSize: 10,
  },
  testimonialList: {
    gap: 12,
    paddingRight: 16,
  },
  testimonialCard: {
    width: SCREEN_WIDTH * 0.75,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.travelNavy,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  testimonialText: {
    color: Colors.travelTextSecondary,
    fontFamily: FontFamily.inter,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 10,
    minHeight: 72,
  },
  testimonialFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  testimonialAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
  },
  testimonialName: {
    color: Colors.travelNavy,
    fontFamily: FontFamily.interSemiBold,
    fontSize: 13,
  },
  testimonialLocation: {
    color: Colors.travelTextLight,
    fontFamily: FontFamily.inter,
    fontSize: 10,
    marginTop: 2,
  },
  ctaBanner: {
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: Colors.travelNavy,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  ctaCopy: {
    flex: 1,
  },
  ctaTitle: {
    color: Colors.white,
    fontFamily: FontFamily.interExtraBold,
    fontSize: 16,
  },
  ctaSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontFamily: FontFamily.inter,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 6,
  },
  ctaAction: {
    alignItems: 'center',
    gap: 8,
  },
  ctaPlane: {
    width: 66,
    height: 66,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  ctaButton: {
    backgroundColor: Colors.travelGold,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  ctaButtonText: {
    color: Colors.travelNavy,
    fontFamily: FontFamily.interExtraBold,
    fontSize: 14,
  },
  ctaFinePrint: {
    color: 'rgba(255,255,255,0.72)',
    fontFamily: FontFamily.inter,
    fontSize: 9,
  },
});
