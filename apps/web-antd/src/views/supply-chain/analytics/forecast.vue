<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Card, Table } from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '物料名称', dataIndex: 'material', key: 'material' },
  { title: '当前库存', dataIndex: 'stock', key: 'stock', width: 100 },
  { title: '月均消耗', dataIndex: 'avgConsume', key: 'avgConsume', width: 100 },
  { title: '预测需求', dataIndex: 'forecast', key: 'forecast', width: 100 },
  { title: '建议采购', dataIndex: 'suggestion', key: 'suggestion', width: 100 },
];

const dataSource = ref([
  {
    material: '钢材 A型',
    stock: 120,
    avgConsume: 80,
    forecast: 85,
    suggestion: '80',
    key: 0,
  },
  {
    material: '水泥 42.5号',
    stock: 200,
    avgConsume: 150,
    forecast: 160,
    suggestion: '150',
    key: 1,
  },
  {
    material: '铜线 Φ2.5',
    stock: 50,
    avgConsume: 30,
    forecast: 35,
    suggestion: '35',
    key: 2,
  },
]);
</script>

<template>
  <Page :title="$t('page.supplyChain.analytics.forecast.title')">
    <Card title="需求预测">
      <Table :columns="columns" :data-source="dataSource" :pagination="false" />
    </Card>

    <Card title="预测趋势" class="mt-4">
      <div class="flex h-64 items-center justify-center text-gray-400">
        需求预测曲线图
      </div>
    </Card>
  </Page>
</template>
