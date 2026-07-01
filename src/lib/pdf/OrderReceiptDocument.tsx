import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { AdminOrder } from "@/types/admin";
import { formatPriceShort } from "@/lib/price";
import { PICKUP_LABELS, PAYMENT_LABELS } from "@/lib/order-labels";
import { RESTAURANT_CONFIG } from "@/config/restaurant";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", color: "#2F2F2F" },
  header: { marginBottom: 24, borderBottom: "2pt solid #B54E32", paddingBottom: 16 },
  restaurantName: { fontSize: 18, fontWeight: 700, color: "#B54E32", marginBottom: 4 },
  meta: { fontSize: 9, color: "#6B6355" },
  title: { fontSize: 14, fontWeight: 700, marginBottom: 4 },
  orderRef: { fontSize: 11, color: "#B54E32", fontFamily: "Courier", marginBottom: 16 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 9, color: "#6B6355", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
  label: { color: "#6B6355" },
  value: { fontWeight: 500 },
  table: { marginTop: 8, marginBottom: 8 },
  tableHeader: { flexDirection: "row", borderBottom: "1pt solid #E5DDD0", paddingBottom: 6, marginBottom: 6 },
  tableHeaderCell: { fontSize: 8, color: "#6B6355", textTransform: "uppercase" },
  itemRow: { flexDirection: "row", borderBottom: "0.5pt solid #F2ECE3", paddingVertical: 6 },
  itemName: { flex: 1, fontWeight: 500 },
  itemQty: { width: 30, textAlign: "center" },
  itemPrice: { width: 60, textAlign: "right" },
  totalsBox: { marginTop: 8, alignItems: "flex-end" },
  totalRow: { flexDirection: "row", width: 200, justifyContent: "space-between", marginBottom: 3 },
  grandTotal: { flexDirection: "row", width: 200, justifyContent: "space-between", marginTop: 6, paddingTop: 6, borderTop: "1pt solid #2F2F2F" },
  grandTotalLabel: { fontSize: 12, fontWeight: 700 },
  grandTotalValue: { fontSize: 12, fontWeight: 700, color: "#B54E32" },
  footer: { position: "absolute", bottom: 30, left: 40, right: 40, textAlign: "center", fontSize: 8, color: "#A39C8E", borderTop: "0.5pt solid #E5DDD0", paddingTop: 10 },
});

export function OrderReceiptDocument({ order }: { order: AdminOrder }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.restaurantName}>{RESTAURANT_CONFIG.name}</Text>
          <Text style={styles.meta}>{RESTAURANT_CONFIG.address}</Text>
          <Text style={styles.meta}>{RESTAURANT_CONFIG.phone} · {RESTAURANT_CONFIG.email}</Text>
        </View>

        <Text style={styles.title}>Order Receipt</Text>
        <Text style={styles.orderRef}>{order.orderRef}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer</Text>
          <View style={styles.row}><Text style={styles.label}>Name</Text><Text style={styles.value}>{order.customer.name}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Phone</Text><Text style={styles.value}>{order.customer.phone}</Text></View>
          {order.customer.email && <View style={styles.row}><Text style={styles.label}>Email</Text><Text style={styles.value}>{order.customer.email}</Text></View>}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{order.orderType === "PICKUP" ? "Pickup" : "Delivery"}</Text>
          {order.orderType === "PICKUP" ? (
            <View style={styles.row}><Text style={styles.label}>Time</Text><Text style={styles.value}>{PICKUP_LABELS[order.pickupTime ?? ""] ?? order.pickupTime ?? "—"}</Text></View>
          ) : (
            <View style={styles.row}>
              <Text style={styles.label}>Address</Text>
              <Text style={styles.value}>{order.deliveryAddress?.street}, {order.deliveryAddress?.suburb} {order.deliveryAddress?.postcode}</Text>
            </View>
          )}
          <View style={styles.row}><Text style={styles.label}>Payment</Text><Text style={styles.value}>{PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Date</Text><Text style={styles.value}>{new Date(order.createdAt).toLocaleString("en-AU")}</Text></View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Item</Text>
            <Text style={[styles.tableHeaderCell, styles.itemQty]}>Qty</Text>
            <Text style={[styles.tableHeaderCell, styles.itemPrice]}>Total</Text>
          </View>
          {order.items.map((item) => {
            const extrasTotal = item.extras.reduce((s, e) => s + e.price * e.quantity, 0);
            return (
              <View key={item.id} style={styles.itemRow}>
                <Text style={styles.itemName}>{item.name}{item.notes ? ` — ${item.notes}` : ""}</Text>
                <Text style={styles.itemQty}>{item.quantity}</Text>
                <Text style={styles.itemPrice}>{formatPriceShort((item.basePrice + extrasTotal) * item.quantity)}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.totalsBox}>
          <View style={styles.totalRow}><Text style={styles.label}>Subtotal</Text><Text style={styles.value}>{formatPriceShort(order.subtotal)}</Text></View>
          {order.deliveryFee > 0 && <View style={styles.totalRow}><Text style={styles.label}>Delivery Fee</Text><Text style={styles.value}>{formatPriceShort(order.deliveryFee)}</Text></View>}
          {order.discount > 0 && <View style={styles.totalRow}><Text style={styles.label}>Discount</Text><Text style={styles.value}>−{formatPriceShort(order.discount)}</Text></View>}
          <View style={styles.grandTotal}><Text style={styles.grandTotalLabel}>Total</Text><Text style={styles.grandTotalValue}>{formatPriceShort(order.total)}</Text></View>
        </View>

        <Text style={styles.footer}>Thank you for your order — {RESTAURANT_CONFIG.name}. This receipt was generated automatically.</Text>
      </Page>
    </Document>
  );
}
