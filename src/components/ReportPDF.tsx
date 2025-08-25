import React, { FC } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Config, AnalyticsData } from '../types/types';

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: 'Helvetica', fontSize: 10, color: '#334155' },
  header: { marginBottom: 20, textAlign: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0f172a' },
  subtitle: { fontSize: 10, color: '#64748b', marginTop: 4 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 10, paddingBottom: 3, borderBottomWidth: 1, borderBottomColor: '#e2e8f0', color: '#1e293b' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { width: '48%', backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 6, padding: 10, marginBottom: 10 },
  itemLabel: { fontSize: 9, color: '#64748b' },
  itemValue: { fontSize: 16, fontWeight: 'bold', marginTop: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  rowLabel: { fontWeight: 'bold' },
  pageNumber: { position: 'absolute', fontSize: 9, bottom: 15, left: 0, right: 0, textAlign: 'center', color: 'grey' },
});

interface ReportPDFProps {
  config: Config;
  analytics: AnalyticsData | null;
}

export const ReportPDF: FC<ReportPDFProps> = ({ config, analytics }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>MCD-RCD Analytics Report</Text>
        <Text style={styles.subtitle}>Generated on: {new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Metrics Summary</Text>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.itemLabel}>MCD Multiplier</Text>
            <Text style={styles.itemValue}>{analytics?.currentMCDMultiplier?.toFixed(3) || "N/A"}x</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.itemLabel}>Average Customer Discount</Text>
            <Text style={styles.itemValue}>{analytics?.customers?.averageDiscount?.toFixed(1) || "N/A"}%</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.itemLabel}>Total Revenue (30d)</Text>
            <Text style={styles.itemValue}>${analytics?.revenue?.total?.toLocaleString() || "N/A"}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.itemLabel}>Equilibrium Score</Text>
            <Text style={styles.itemValue}>{analytics?.equilibriumScore || "N/A"}%</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuration Used</Text>
         <View style={styles.row}>
            <Text style={styles.rowLabel}>MCD Status:</Text>
            <Text>{config.mcd.enabled ? 'Enabled' : 'Disabled'}</Text>
        </View>
         <View style={styles.row}>
            <Text style={styles.rowLabel}>RCD Status:</Text>
            <Text>{config.rcd.enabled ? 'Enabled' : 'Disabled'}</Text>
        </View>
         <View style={styles.row}>
            <Text style={styles.rowLabel}>RCD Max Discount:</Text>
            <Text>{config.rcd.maxDiscount}%</Text>
        </View>
      </View>

      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
  </Document>
);