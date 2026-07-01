import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { RESTAURANT_CONFIG } from "@/config/restaurant";

export interface CateringSummaryData {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  guestCount: string;
  date: string;
  time: string;
  collectionType: string;
  venueAddress?: string | null;
  budget?: string | null;
  specialRequests?: string | null;
}

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", color: "#2F2F2F" },
  header: { marginBottom: 24, borderBottom: "2pt solid #B54E32", paddingBottom: 16 },
  restaurantName: { fontSize: 18, fontWeight: 700, color: "#B54E32", marginBottom: 4 },
  meta: { fontSize: 9, color: "#6B6355" },
  title: { fontSize: 14, fontWeight: 700, marginBottom: 16 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 9, color: "#6B6355", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  label: { color: "#6B6355" },
  value: { fontWeight: 500, maxWidth: 320, textAlign: "right" },
  notesBox: { backgroundColor: "#F2ECE3", borderRadius: 6, padding: 12, marginTop: 4 },
  notesText: { lineHeight: 1.5 },
  footer: { position: "absolute", bottom: 30, left: 40, right: 40, textAlign: "center", fontSize: 8, color: "#A39C8E", borderTop: "0.5pt solid #E5DDD0", paddingTop: 10 },
});

export function CateringSummaryDocument({ enquiry }: { enquiry: CateringSummaryData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.restaurantName}>{RESTAURANT_CONFIG.name}</Text>
          <Text style={styles.meta}>{RESTAURANT_CONFIG.address}</Text>
          <Text style={styles.meta}>{RESTAURANT_CONFIG.phone} · {RESTAURANT_CONFIG.email}</Text>
        </View>

        <Text style={styles.title}>Catering Enquiry Summary</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer</Text>
          <View style={styles.row}><Text style={styles.label}>Name</Text><Text style={styles.value}>{enquiry.name}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Phone</Text><Text style={styles.value}>{enquiry.phone}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Email</Text><Text style={styles.value}>{enquiry.email}</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Details</Text>
          <View style={styles.row}><Text style={styles.label}>Event Type</Text><Text style={styles.value}>{enquiry.eventType}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Guest Count</Text><Text style={styles.value}>{enquiry.guestCount}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Date</Text><Text style={styles.value}>{enquiry.date}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Time</Text><Text style={styles.value}>{enquiry.time}</Text></View>
          <View style={styles.row}>
            <Text style={styles.label}>Collection</Text>
            <Text style={styles.value}>{enquiry.collectionType === "pickup" ? "Pickup" : `Delivery — ${enquiry.venueAddress ?? ""}`}</Text>
          </View>
          {enquiry.budget && <View style={styles.row}><Text style={styles.label}>Budget</Text><Text style={styles.value}>{enquiry.budget}</Text></View>}
        </View>

        {enquiry.specialRequests && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Special Requests</Text>
            <View style={styles.notesBox}>
              <Text style={styles.notesText}>{enquiry.specialRequests}</Text>
            </View>
          </View>
        )}

        <Text style={styles.footer}>Generated automatically by {RESTAURANT_CONFIG.name} — please respond to the customer within 24 hours.</Text>
      </Page>
    </Document>
  );
}
