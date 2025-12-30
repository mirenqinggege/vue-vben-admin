import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:landmark',
      order: 101,
      title: $t('page.supplyFinance.title'),
    },
    name: 'SupplyFinance',
    path: '/supply-finance',
    redirect: '/supply-finance/financing/receivables',
    children: [
      // 融资服务 (5个子页面)
      {
        name: 'SupplyFinanceFinancingReceivables',
        path: '/supply-finance/financing/receivables',
        component: () =>
          import('#/views/supply-finance/financing/receivables.vue'),
        meta: { title: $t('page.supplyFinance.financing.receivables.title') },
      },
      {
        name: 'SupplyFinanceFinancingOrder',
        path: '/supply-finance/financing/order',
        component: () => import('#/views/supply-finance/financing/order.vue'),
        meta: { title: $t('page.supplyFinance.financing.order.title') },
      },
      {
        name: 'SupplyFinanceFinancingPledge',
        path: '/supply-finance/financing/pledge',
        component: () => import('#/views/supply-finance/financing/pledge.vue'),
        meta: { title: $t('page.supplyFinance.financing.pledge.title') },
      },
      {
        name: 'SupplyFinanceFinancingBill',
        path: '/supply-finance/financing/bill',
        component: () => import('#/views/supply-finance/financing/bill.vue'),
        meta: { title: $t('page.supplyFinance.financing.bill.title') },
      },
      {
        name: 'SupplyFinanceFinancingPrepayment',
        path: '/supply-finance/financing/prepayment',
        component: () =>
          import('#/views/supply-finance/financing/prepayment.vue'),
        meta: { title: $t('page.supplyFinance.financing.prepayment.title') },
      },
      // 贸易背景核验 (4个子页面)
      {
        name: 'SupplyFinanceVerificationData',
        path: '/supply-finance/verification/data',
        component: () => import('#/views/supply-finance/verification/data.vue'),
        meta: { title: $t('page.supplyFinance.verification.data.title') },
      },
      {
        name: 'SupplyFinanceVerificationDocument',
        path: '/supply-finance/verification/document',
        component: () =>
          import('#/views/supply-finance/verification/document.vue'),
        meta: { title: $t('page.supplyFinance.verification.document.title') },
      },
      {
        name: 'SupplyFinanceVerificationTransaction',
        path: '/supply-finance/verification/transaction',
        component: () =>
          import('#/views/supply-finance/verification/transaction.vue'),
        meta: {
          title: $t('page.supplyFinance.verification.transaction.title'),
        },
      },
      {
        name: 'SupplyFinanceVerificationBlockchain',
        path: '/supply-finance/verification/blockchain',
        component: () =>
          import('#/views/supply-finance/verification/blockchain.vue'),
        meta: { title: $t('page.supplyFinance.verification.blockchain.title') },
      },
      // 风控管理 (5个子页面)
      {
        name: 'SupplyFinanceRiskCredit',
        path: '/supply-finance/risk/credit',
        component: () => import('#/views/supply-finance/risk/credit.vue'),
        meta: { title: $t('page.supplyFinance.risk.credit.title') },
      },
      {
        name: 'SupplyFinanceRiskMonitor',
        path: '/supply-finance/risk/monitor',
        component: () => import('#/views/supply-finance/risk/monitor.vue'),
        meta: { title: $t('page.supplyFinance.risk.monitor.title') },
      },
      {
        name: 'SupplyFinanceRiskAlert',
        path: '/supply-finance/risk/alert',
        component: () => import('#/views/supply-finance/risk/alert.vue'),
        meta: { title: $t('page.supplyFinance.risk.alert.title') },
      },
      {
        name: 'SupplyFinanceRiskDisposal',
        path: '/supply-finance/risk/disposal',
        component: () => import('#/views/supply-finance/risk/disposal.vue'),
        meta: { title: $t('page.supplyFinance.risk.disposal.title') },
      },
      {
        name: 'SupplyFinanceRiskCompliance',
        path: '/supply-finance/risk/compliance',
        component: () => import('#/views/supply-finance/risk/compliance.vue'),
        meta: { title: $t('page.supplyFinance.risk.compliance.title') },
      },
      // 资金结算 (5个子页面)
      {
        name: 'SupplyFinanceSettlementDisbursement',
        path: '/supply-finance/settlement/disbursement',
        component: () =>
          import('#/views/supply-finance/settlement/disbursement.vue'),
        meta: { title: $t('page.supplyFinance.settlement.disbursement.title') },
      },
      {
        name: 'SupplyFinanceSettlementRepayment',
        path: '/supply-finance/settlement/repayment',
        component: () =>
          import('#/views/supply-finance/settlement/repayment.vue'),
        meta: { title: $t('page.supplyFinance.settlement.repayment.title') },
      },
      {
        name: 'SupplyFinanceSettlementEscrow',
        path: '/supply-finance/settlement/escrow',
        component: () => import('#/views/supply-finance/settlement/escrow.vue'),
        meta: { title: $t('page.supplyFinance.settlement.escrow.title') },
      },
      {
        name: 'SupplyFinanceSettlementClearing',
        path: '/supply-finance/settlement/clearing',
        component: () =>
          import('#/views/supply-finance/settlement/clearing.vue'),
        meta: { title: $t('page.supplyFinance.settlement.clearing.title') },
      },
      {
        name: 'SupplyFinanceSettlementAccount',
        path: '/supply-finance/settlement/account',
        component: () =>
          import('#/views/supply-finance/settlement/account.vue'),
        meta: { title: $t('page.supplyFinance.settlement.account.title') },
      },
      // 生态协同 (4个子页面)
      {
        name: 'SupplyFinanceEcosystemRole',
        path: '/supply-finance/ecosystem/role',
        component: () => import('#/views/supply-finance/ecosystem/role.vue'),
        meta: { title: $t('page.supplyFinance.ecosystem.role.title') },
      },
      {
        name: 'SupplyFinanceEcosystemSharing',
        path: '/supply-finance/ecosystem/sharing',
        component: () => import('#/views/supply-finance/ecosystem/sharing.vue'),
        meta: { title: $t('page.supplyFinance.ecosystem.sharing.title') },
      },
      {
        name: 'SupplyFinanceEcosystemMessage',
        path: '/supply-finance/ecosystem/message',
        component: () => import('#/views/supply-finance/ecosystem/message.vue'),
        meta: { title: $t('page.supplyFinance.ecosystem.message.title') },
      },
      {
        name: 'SupplyFinanceEcosystemLogistics',
        path: '/supply-finance/ecosystem/logistics',
        component: () =>
          import('#/views/supply-finance/ecosystem/logistics.vue'),
        meta: { title: $t('page.supplyFinance.ecosystem.logistics.title') },
      },
      // 运营管理 (5个子页面)
      {
        name: 'SupplyFinanceOperationsUser',
        path: '/supply-finance/operations/user',
        component: () => import('#/views/supply-finance/operations/user.vue'),
        meta: { title: $t('page.supplyFinance.operations.user.title') },
      },
      {
        name: 'SupplyFinanceOperationsProduct',
        path: '/supply-finance/operations/product',
        component: () =>
          import('#/views/supply-finance/operations/product.vue'),
        meta: { title: $t('page.supplyFinance.operations.product.title') },
      },
      {
        name: 'SupplyFinanceOperationsWorkflow',
        path: '/supply-finance/operations/workflow',
        component: () =>
          import('#/views/supply-finance/operations/workflow.vue'),
        meta: { title: $t('page.supplyFinance.operations.workflow.title') },
      },
      {
        name: 'SupplyFinanceOperationsReport',
        path: '/supply-finance/operations/report',
        component: () => import('#/views/supply-finance/operations/report.vue'),
        meta: { title: $t('page.supplyFinance.operations.report.title') },
      },
      {
        name: 'SupplyFinanceOperationsSupport',
        path: '/supply-finance/operations/support',
        component: () =>
          import('#/views/supply-finance/operations/support.vue'),
        meta: { title: $t('page.supplyFinance.operations.support.title') },
      },
    ],
  },
];

export default routes;
