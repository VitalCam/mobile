import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useMemo, useCallback } from 'react';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 100; // Approximate height of tab bar including safe area

const badgeInfo = {
  fda: {
    title: 'FDA Cleared',
    icon: 'certificate',
    color: '#8b5cf6',
    bgColor: '#e9d5ff',
    description: 'This application has received clearance from the U.S. Food and Drug Administration (FDA).',
    details: [
      {
        title: 'What does FDA Clearance mean?',
        content: 'FDA clearance through the 510(k) process means our device has been reviewed and cleared for marketing by demonstrating substantial equivalence to legally marketed devices.'
      },
      {
        title: 'Clinical Validation',
        content: 'Our technology has undergone rigorous clinical testing to ensure accuracy and reliability in measuring vital signs and health metrics.'
      },
      {
        title: 'Quality Standards',
        content: 'We maintain strict quality control processes and comply with FDA regulations for medical device software.'
      }
    ]
  },
  hipaa: {
    title: 'HIPAA Secure',
    icon: 'lock-closed',
    color: '#f97316',
    bgColor: '#fed7aa',
    description: 'Your health data is protected under the Health Insurance Portability and Accountability Act (HIPAA).',
    details: [
      {
        title: 'Data Encryption',
        content: 'All your health data is encrypted both in transit and at rest using industry-standard AES-256 encryption protocols.'
      },
      {
        title: 'Privacy Protection',
        content: 'We strictly adhere to HIPAA privacy rules. Your personal health information is never shared without your explicit consent.'
      },
      {
        title: 'Secure Storage',
        content: 'Your data is stored on HIPAA-compliant servers with regular security audits and penetration testing.'
      },
      {
        title: 'Access Controls',
        content: 'Only you and authorized healthcare providers (with your permission) can access your health records.'
      }
    ]
  },
  medical: {
    title: 'Medical Grade',
    icon: 'hospital-box',
    color: '#3b82f6',
    bgColor: '#bfdbfe',
    description: 'Our technology meets medical-grade accuracy standards for clinical use.',
    details: [
      {
        title: 'Clinical Accuracy',
        content: 'Our sensors and algorithms achieve 98%+ accuracy compared to traditional medical devices in controlled clinical studies.'
      },
      {
        title: 'Professional Standards',
        content: 'Developed in collaboration with healthcare professionals and validated through peer-reviewed research.'
      },
      {
        title: 'Continuous Monitoring',
        content: 'Medical-grade precision enables reliable tracking of vital signs for both wellness and clinical applications.'
      },
      {
        title: 'Regulatory Compliance',
        content: 'Meets ISO 13485 standards for medical device quality management systems.'
      }
    ]
  }
};

export default function BadgeBottomSheet({ visible, badgeType, onClose }) {
  const bottomSheetRef = useRef(null);

  // Snap points for the bottom sheet - with bottomInset handling tab bar space
  const snapPoints = useMemo(() => ['55%', '75%'], []);

  // Handle sheet changes
  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      onClose();
    }
  }, [onClose]);

  // Render backdrop with reduced opacity to show tab navigation underneath
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.4}
      />
    ),
    []
  );

  // Open/close the sheet when visible prop changes
  useEffect(() => {
    if (visible && badgeType) {
      console.log('Opening bottom sheet for:', badgeType);
      bottomSheetRef.current?.expand();
    } else if (!visible) {
      console.log('Closing bottom sheet');
      bottomSheetRef.current?.close();
    }
  }, [visible, badgeType]);

  // Get badge info or return empty component if not valid
  const info = badgeType && badgeInfo[badgeType] ? badgeInfo[badgeType] : null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      enableHandlePanningGesture={true}
      enableContentPanningGesture={true}
      animateOnMount={false}
      bottomInset={TAB_BAR_HEIGHT}
      detached={false}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {info && (
          <>
            {/* Header */}
            <View style={styles.header}>
              <View style={[styles.iconWrapper, { backgroundColor: info.bgColor }]}>
                {badgeType === 'hipaa' ? (
                  <Ionicons name={info.icon} size={32} color={info.color} />
                ) : (
                  <MaterialCommunityIcons name={info.icon} size={32} color={info.color} />
                )}
              </View>
              <Text style={styles.title}>{info.title}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            {/* Description */}
            <Text style={styles.description}>{info.description}</Text>

            {/* Details Sections */}
            <View style={styles.detailsContainer}>
              {info.details.map((detail, index) => (
                <View key={index} style={styles.detailSection}>
                  <View style={styles.detailHeader}>
                    <View style={[styles.bulletPoint, { backgroundColor: info.color }]} />
                    <Text style={styles.detailTitle}>{detail.title}</Text>
                  </View>
                  <Text style={styles.detailContent}>{detail.content}</Text>
                </View>
              ))}
            </View>

            {/* Footer Note */}
            <View style={[styles.footerNote, { backgroundColor: info.bgColor }]}>
              <MaterialCommunityIcons name="information" size={16} color={info.color} />
              <Text style={[styles.footerText, { color: info.color }]}>
                Your trust and safety are our top priorities
              </Text>
            </View>
          </>
        )}
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  handleIndicator: {
    backgroundColor: '#e2e8f0',
    width: 40,
    height: 4,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#475569',
    marginBottom: 24,
    fontWeight: '500',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailSection: {
    marginBottom: 20,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 10,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  detailContent: {
    fontSize: 14,
    lineHeight: 22,
    color: '#64748b',
    marginLeft: 16,
  },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  footerText: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
});
