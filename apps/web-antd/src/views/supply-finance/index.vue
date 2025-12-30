<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Badge, Card, Col, Row, Statistic, Table } from 'ant-design-vue';

// 统计数据
const statsData = ref([
  { title: '待审批', value: 15, suffix: '笔' },
  { title: '融资中', value: 42, suffix: '笔' },
  { title: '待还款', value: 18, suffix: '笔' },
  { title: '已结清', value: 156, suffix: '笔' },
  { title: '授信总额', value: 50_000_000, prefix: '¥' },
  { title: '在融余额', value: 12_800_000, prefix: '¥' },
]);

// 功能模块
const moduleData = ref([
  { title: '融资服务', icon: 'lucide:banknote', count: 15 },
  { title: '贸易核验', icon: 'lucide:shield-check', count: 8 },
  { title: '风控管理', icon: 'lucide:shield-alert', count: 3 },
  { title: '资金结算', icon: 'lucide:arrow-left-right', count: 22 },
  { title: '生态协同', icon: 'lucide:network', count: 11 },
  { title: '运营管理', icon: 'lucide:settings', count: 19 },
]);

// 融资申请
const appColumns = [
  { title: '融资单号', dataIndex: 'no', key: 'no' },
  { title: '融资金额', dataIndex: 'amount', key: 'amount' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '申请日期', dataIndex: 'date', key: 'date' },
];

const appData = ref([
  {
    no: 'FZ202412008',
    amount: '¥500,000',
    status: '待审批',
    date: '2024-12-28',
    key: '1',
  },
  {
    no: 'FZ202412007',
    amount: '¥300,000',
    status: '审核中',
    date: '2024-12-27',
    key: '2',
  },
  {
    no: 'FZ202412006',
    amount: '¥800,000',
    status: '已放款',
    date: '2024-12-26',
    key: '3',
  },
  {
    no: 'FZ202412005',
    amount: '¥450,000',
    status: '待审批',
    date: '2024-12-28',
    key: '4',
  },
  {
    no: 'FZ202412004',
    amount: '¥600,000',
    status: '还款中',
    date: '2024-12-24',
    key: '5',
  },
]);
</script>

<template>
  <Page :title="$t('page.supplyFinance.platform')">
    <!-- 统计卡片区 -->
    <Row :gutter="16">
      <Col v-for="stat in statsData" :key="stat.title" :span="4">
        <Card>
          <Statistic
            :title="stat.title"
            :value="stat.value"
            :suffix="stat.suffix"
            :prefix="stat.prefix"
          />
        </Card>
      </Col>
    </Row>

    <!-- 功能模块区 -->
    <Card :title="$t('page.supplyFinance.moduleList')" class="mt-4">
      <Row :gutter="16">
        <Col v-for="module in moduleData" :key="module.title" :span="8">
          <Card class="mb-4">
            <div class="flex items-center justify-between">
              <span class="text-lg">{{ module.title }}</span>
              <Badge :count="module.count" />
            </div>
          </Card>
        </Col>
      </Row>
    </Card>

    <!-- 融资申请 -->
    <Card class="mt-4" :title="$t('page.supplyFinance.applications.title')">
      <Table :columns="appColumns" :data-source="appData" :pagination="false" />
    </Card>
  </Page>
</template>
