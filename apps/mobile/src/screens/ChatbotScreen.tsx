import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Loader,
} from 'lucide-react-native';
import { Colors } from '@/theme/colors';
import { Spacing, BorderRadius } from '@/theme/spacing';
import Header from '@/components/Header';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const QUICK_PROMPTS = [
  'Umrah package prices',
  'Flight to Jeddah',
  'Visa requirements',
  'Hotel in Makkah',
];

// Simulated bot responses
const getBotResponse = (userMessage: string): string => {
  const lower = userMessage.toLowerCase();
  if (lower.includes('umrah')) {
    return 'Our Umrah packages start from PKR 145,000 for 7 days. We offer Economy, Standard, Premium, and Ramadan Special packages. All include flights, visa, hotel, and transport. Would you like to see the details?';
  } else if (lower.includes('flight') || lower.includes('jeddah') || lower.includes('ticket')) {
    return 'We have flights to Jeddah starting from PKR 78,500. Airlines include PIA, Saudi Airlines, Emirates, and Qatar Airways. Would you like to search for specific dates?';
  } else if (lower.includes('visa')) {
    return 'We offer visa services for Saudi Arabia (Umrah), UAE, Turkey, UK, Azerbaijan, Thailand, Malaysia, and Singapore. Processing time ranges from 3 to 30 days depending on the country. Prices start from PKR 8,000.';
  } else if (lower.includes('hotel') || lower.includes('makkah') || lower.includes('madina')) {
    return 'We partner with 3-star to 5-star hotels in Makkah and Madina, ranging from 100m to 800m from Haram. Prices vary by season. Would you like specific hotel recommendations?';
  } else if (lower.includes('price') || lower.includes('cost') || lower.includes('pkr')) {
    return 'Our packages are competitively priced. Umrah starts at PKR 145,000, Holiday packages from PKR 65,000, and Flights from PKR 45,000. I can provide more specific pricing based on your requirements.';
  } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('assalam')) {
    return 'Wa Alaikum Assalam! Welcome to Madni Travel. I am your AI assistant. How can I help you today with your travel plans?';
  } else if (lower.includes('bus') || lower.includes('transport')) {
    return 'We offer bus booking services across major cities in Pakistan including Lahore, Karachi, Islamabad, Multan, and Peshawar. Operators include Daewoo, Faisal Movers, and Road Master.';
  } else if (lower.includes('book') || lower.includes('reserve')) {
    return 'You can book directly through our app! Navigate to the relevant section (Flights, Packages, Umrah, etc.), select your preferences, and proceed to checkout. Our team is also available on WhatsApp for assistance.';
  } else {
    return 'Thank you for your message! For detailed assistance, you can contact our support team via WhatsApp at +923216001973 or email support@madnitravel.com. Is there anything specific about travel packages, flights, or visa services I can help with?';
  }
};

const ChatbotScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Assalam-o-Alaikum! I'm Madni Travel's AI assistant. I can help you with Umrah packages, flights, visa services, hotel bookings, and more. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: getBotResponse(messageText),
      sender: 'bot',
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botResponse]);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageRow,
        item.sender === 'user' && styles.userMessageRow,
      ]}
    >
      {item.sender === 'bot' && (
        <View style={styles.botAvatar}>
          <Sparkles size={16} color={Colors.white} />
        </View>
      )}
      <View
        style={[
          styles.messageBubble,
          item.sender === 'user' ? styles.userBubble : styles.botBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.sender === 'user' ? styles.userText : styles.botText,
          ]}
        >
          {item.text}
        </Text>
      </View>
      {item.sender === 'user' && (
        <View style={styles.userAvatar}>
          <User size={16} color={Colors.white} />
        </View>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <Header title="AI Assistant" />

      {/* Quick Prompts */}
      {messages.length <= 1 && (
        <View style={styles.promptsContainer}>
          <Text style={styles.promptsTitle}>Quick Questions</Text>
          <View style={styles.promptsRow}>
            {QUICK_PROMPTS.map(prompt => (
              <TouchableOpacity
                key={prompt}
                style={styles.promptChip}
                onPress={() => handleSend(prompt)}
              >
                <Text style={styles.promptText}>{prompt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
      />

      {/* Typing Indicator */}
      {isTyping && (
        <View style={styles.typingRow}>
          <View style={styles.botAvatarSmall}>
            <Sparkles size={12} color={Colors.white} />
          </View>
          <View style={styles.typingBubble}>
            <Loader size={16} color={Colors.primary} />
            <Text style={styles.typingText}>Thinking...</Text>
          </View>
        </View>
      )}

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          placeholderTextColor={Colors.textMuted}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
          onSubmitEditing={() => handleSend()}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !inputText.trim() && styles.sendButtonDisabled,
          ]}
          onPress={() => handleSend()}
          disabled={!inputText.trim() || isTyping}
        >
          <Send size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  promptsContainer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.base,
  },
  promptsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.base,
  },
  promptsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  promptChip: {
    backgroundColor: `${Colors.primary}10`,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: `${Colors.primary}30`,
  },
  promptText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '500',
  },
  messagesList: {
    padding: Spacing.lg,
    paddingTop: Spacing.base,
    flexGrow: 1,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: Spacing.base,
    maxWidth: '85%',
  },
  userMessageRow: {
    alignSelf: 'flex-end',
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  botAvatarSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.sm,
  },
  messageBubble: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.base,
    borderRadius: BorderRadius.lg,
    maxWidth: '80%',
  },
  botBubble: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 4,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  userBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  botText: {
    color: Colors.text,
  },
  userText: {
    color: Colors.white,
  },
  typingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.base,
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.base,
    borderRadius: BorderRadius.lg,
    borderBottomLeftRadius: 4,
    gap: Spacing.sm,
  },
  typingText: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingBottom: Spacing.lg + 10,
  },
  textInput: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    backgroundColor: Colors.surfaceLight,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    fontSize: 15,
    color: Colors.text,
    marginRight: Spacing.sm,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

export default ChatbotScreen;
