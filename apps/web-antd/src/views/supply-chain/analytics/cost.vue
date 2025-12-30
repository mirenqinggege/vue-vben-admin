<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Card, Table } from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '物料类别', dataIndex: 'category', key: 'category' },
  { title: '采购金额', dataIndex: 'amount', key: 'amount', width: 120 },
  { title: '占比', dataIndex: 'ratio', key: 'ratio', width: 100 },
  { title: '环比增长', dataIndex: 'growth', key: 'growth', width: 100 },
  { title: '同比', dataIndex: 'yoy', key: 'yoy', width: 100 },
];

const dataSource = ref([
  {
    category: '原材料',
    amount: '¥1,250万',
    ratio: '45%',
    growth: '+5.2%',
    yoy: '+12.3%',
    key: 0,
  },
  {
    category: '辅料',
    amount: '¥680万',
    ratio: '24%',
    growth: '+2.1%',
    yoy: '+8.7%',
    key: 1,
  },
  {
    category: '设备',
    amount: '¥560万',
    ratio: '20%',
    growth: '-3.5%',
    yoy: '+5.6%',
    key: 2,
  },
  {
    category: '工具',
    amount: '¥290万',
    ratio: '11%',
    growth: '+1.8%',
    yoy: '+3.2%',
    key: 3,
  },
]);
</script>

<template>
  <Page :title="$t('page.supplyChain.analytics.cost.title')">
    <Card title="成本分析">
      <Table :columns="columns" :data-source="dataSource" :pagination="false" />
    </Card>

    <Card title="成本趋势" class="mt-4">
      <div class="flex h-64 items-center justify-center text-gray-400">
        成本趋势折线图
      </div>
    </Card>
  </Page>
</template>
