<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Badge, Card, Col, Row, Statistic, Table } from 'ant-design-vue';

// 统计数据
const statsData = ref([
  { title: '待审批', value: 32, suffix: '单' },
  { title: '进行中', value: 45, suffix: '单' },
  { title: '待收货', value: 18, suffix: '单' },
  { title: '已完成', value: 156, suffix: '单' },
  { title: '本月采购额', value: 2_850_000, prefix: '¥' },
  { title: '供应商数', value: 238, suffix: '家' },
]);

// 功能模块
const moduleData = ref([
  { title: '需求管理', icon: 'lucide:clipboard-list', count: 32 },
  { title: '供应商管理', icon: 'lucide:building-2', count: 45 },
  { title: '采购执行', icon: 'lucide:shopping-cart', count: 18 },
  { title: '履约协同', icon: 'lucide:handshake', count: 12 },
  { title: '结算对账', icon: 'lucide:calculator', count: 28 },
  { title: '数据分析', icon: 'lucide:bar-chart-3', count: null },
]);

// 待办事项
const todoColumns = [
  { title: '类型', dataIndex: 'type', key: 'type' },
  { title: '单号', dataIndex: 'no', key: 'no' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '日期', dataIndex: 'date', key: 'date' },
];

const todoData = ref([
  {
    type: '采购单',
    no: 'PO202412001',
    status: '待审批',
    date: '2024-12-28',
    key: '1',
  },
  {
    type: '合同',
    no: 'HT202412015',
    status: '待签署',
    date: '2024-12-27',
    key: '2',
  },
  {
    type: '收货单',
    no: 'SH202412042',
    status: '待确认',
    date: '2024-12-26',
    key: '3',
  },
  {
    type: '采购单',
    no: 'PO202412002',
    status: '待审批',
    date: '2024-12-28',
    key: '4',
  },
  {
    type: '发票',
    no: 'IN202412128',
    status: '待审核',
    date: '2024-12-25',
    key: '5',
  },
]);
</script>

<template>
  <Page :title="$t('page.supplyChain.platform')">
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
    <Card :title="$t('page.supplyChain.moduleList')" class="mt-4">
      <Row :gutter="16">
        <Col v-for="module in moduleData" :key="module.title" :span="8">
          <Card class="mb-4">
            <div class="flex items-center justify-between">
              <span class="text-lg">{{ module.title }}</span>
              <Badge v-if="module.count !== null" :count="module.count" />
            </div>
          </Card>
        </Col>
      </Row>
    </Card>

    <!-- 待办事项 -->
    <Card class="mt-4" :title="$t('page.supplyChain.todo.title')">
      <Table
        :columns="todoColumns"
        :data-source="todoData"
        :pagination="false"
      />
    </Card>
  </Page>
</template>
