import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:package-search',
      order: 100,
      title: $t('page.supplyChain.title'),
    },
    name: 'SupplyChain',
    path: '/supply-chain',
    redirect: '/supply-chain/demand/submit',
    children: [
      // 需求管理 (4个子页面)
      {
        name: 'SupplyChainDemandSubmit',
        path: '/supply-chain/demand/submit',
        component: () => import('#/views/supply-chain/demand/submit.vue'),
        meta: { title: $t('page.supplyChain.demand.submit.title') },
      },
      {
        name: 'SupplyChainDemandReview',
        path: '/supply-chain/demand/review',
        component: () => import('#/views/supply-chain/demand/review.vue'),
        meta: { title: $t('page.supplyChain.demand.review.title') },
      },
      {
        name: 'SupplyChainDemandSummary',
        path: '/supply-chain/demand/summary',
        component: () => import('#/views/supply-chain/demand/summary.vue'),
        meta: { title: $t('page.supplyChain.demand.summary.title') },
      },
      {
        name: 'SupplyChainDemandChange',
        path: '/supply-chain/demand/change',
        component: () => import('#/views/supply-chain/demand/change.vue'),
        meta: { title: $t('page.supplyChain.demand.change.title') },
      },
      // 供应商管理 (4个子页面)
      {
        name: 'SupplyChainSupplierEntry',
        path: '/supply-chain/supplier/entry',
        component: () => import('#/views/supply-chain/supplier/entry.vue'),
        meta: { title: $t('page.supplyChain.supplier.entry.title') },
      },
      {
        name: 'SupplyChainSupplierClassification',
        path: '/supply-chain/supplier/classification',
        component: () =>
          import('#/views/supply-chain/supplier/classification.vue'),
        meta: { title: $t('page.supplyChain.supplier.classification.title') },
      },
      {
        name: 'SupplyChainSupplierPerformance',
        path: '/supply-chain/supplier/performance',
        component: () =>
          import('#/views/supply-chain/supplier/performance.vue'),
        meta: { title: $t('page.supplyChain.supplier.performance.title') },
      },
      {
        name: 'SupplyChainSupplierCollaboration',
        path: '/supply-chain/supplier/collaboration',
        component: () =>
          import('#/views/supply-chain/supplier/collaboration.vue'),
        meta: { title: $t('page.supplyChain.supplier.collaboration.title') },
      },
      // 采购执行 (4个子页面)
      {
        name: 'SupplyChainProcurementMethod',
        path: '/supply-chain/procurement/method',
        component: () => import('#/views/supply-chain/procurement/method.vue'),
        meta: { title: $t('page.supplyChain.procurement.method.title') },
      },
      {
        name: 'SupplyChainProcurementBidding',
        path: '/supply-chain/procurement/bidding',
        component: () => import('#/views/supply-chain/procurement/bidding.vue'),
        meta: { title: $t('page.supplyChain.procurement.bidding.title') },
      },
      {
        name: 'SupplyChainProcurementContract',
        path: '/supply-chain/procurement/contract',
        component: () =>
          import('#/views/supply-chain/procurement/contract.vue'),
        meta: { title: $t('page.supplyChain.procurement.contract.title') },
      },
      {
        name: 'SupplyChainProcurementOrder',
        path: '/supply-chain/procurement/order',
        component: () => import('#/views/supply-chain/procurement/order.vue'),
        meta: { title: $t('page.supplyChain.procurement.order.title') },
      },
      // 履约协同 (4个子页面)
      {
        name: 'SupplyChainPerformanceShipment',
        path: '/supply-chain/performance/shipment',
        component: () =>
          import('#/views/supply-chain/performance/shipment.vue'),
        meta: { title: $t('page.supplyChain.performance.shipment.title') },
      },
      {
        name: 'SupplyChainPerformanceReceiving',
        path: '/supply-chain/performance/receiving',
        component: () =>
          import('#/views/supply-chain/performance/receiving.vue'),
        meta: { title: $t('page.supplyChain.performance.receiving.title') },
      },
      {
        name: 'SupplyChainPerformanceReturn',
        path: '/supply-chain/performance/return',
        component: () => import('#/views/supply-chain/performance/return.vue'),
        meta: { title: $t('page.supplyChain.performance.return.title') },
      },
      {
        name: 'SupplyChainPerformanceLogistics',
        path: '/supply-chain/performance/logistics',
        component: () =>
          import('#/views/supply-chain/performance/logistics.vue'),
        meta: { title: $t('page.supplyChain.performance.logistics.title') },
      },
      // 结算与对账 (4个子页面)
      {
        name: 'SupplyChainSettlementInvoice',
        path: '/supply-chain/settlement/invoice',
        component: () => import('#/views/supply-chain/settlement/invoice.vue'),
        meta: { title: $t('page.supplyChain.settlement.invoice.title') },
      },
      {
        name: 'SupplyChainSettlementReconciliation',
        path: '/supply-chain/settlement/reconciliation',
        component: () =>
          import('#/views/supply-chain/settlement/reconciliation.vue'),
        meta: { title: $t('page.supplyChain.settlement.reconciliation.title') },
      },
      {
        name: 'SupplyChainSettlementPayment',
        path: '/supply-chain/settlement/payment',
        component: () => import('#/views/supply-chain/settlement/payment.vue'),
        meta: { title: $t('page.supplyChain.settlement.payment.title') },
      },
      {
        name: 'SupplyChainSettlementDetails',
        path: '/supply-chain/settlement/details',
        component: () => import('#/views/supply-chain/settlement/details.vue'),
        meta: { title: $t('page.supplyChain.settlement.details.title') },
      },
      // 数据分析与决策 (4个子页面)
      {
        name: 'SupplyChainAnalyticsDashboard',
        path: '/supply-chain/analytics/dashboard',
        component: () => import('#/views/supply-chain/analytics/dashboard.vue'),
        meta: { title: $t('page.supplyChain.analytics.dashboard.title') },
      },
      {
        name: 'SupplyChainAnalyticsCost',
        path: '/supply-chain/analytics/cost',
        component: () => import('#/views/supply-chain/analytics/cost.vue'),
        meta: { title: $t('page.supplyChain.analytics.cost.title') },
      },
      {
        name: 'SupplyChainAnalyticsReport',
        path: '/supply-chain/analytics/report',
        component: () => import('#/views/supply-chain/analytics/report.vue'),
        meta: { title: $t('page.supplyChain.analytics.report.title') },
      },
      {
        name: 'SupplyChainAnalyticsForecast',
        path: '/supply-chain/analytics/forecast',
        component: () => import('#/views/supply-chain/analytics/forecast.vue'),
        meta: { title: $t('page.supplyChain.analytics.forecast.title') },
      },
    ],
  },
];

export default routes;
