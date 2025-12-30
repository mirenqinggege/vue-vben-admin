<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import {
  Button,
  Card,
  Form,
  Input,
  Select,
  Space,
  Table,
} from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '供应商', dataIndex: 'supplier', key: 'supplier', width: 180 },
  { title: '结算期间', dataIndex: 'period', key: 'period', width: 120 },
  { title: '订单数', dataIndex: 'orderCount', key: 'orderCount', width: 80 },
  {
    title: '采购金额',
    dataIndex: 'purchaseAmount',
    key: 'purchaseAmount',
    width: 120,
  },
  { title: '已付款', dataIndex: 'paidAmount', key: 'paidAmount', width: 120 },
  {
    title: '未付款',
    dataIndex: 'unpaidAmount',
    key: 'unpaidAmount',
    width: 120,
  },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    supplier: `供应商 ${String.fromCodePoint(65 + i)}有限公司`,
    period: '2024-12',
    orderCount: Math.floor(Math.random() * 50) + 10,
    purchaseAmount: `¥${(Math.random() * 100 + 10).toFixed(2)}万`,
    paidAmount: `¥${(Math.random() * 80 + 5).toFixed(2)}万`,
    unpaidAmount: `¥${(Math.random() * 20 + 1).toFixed(2)}万`,
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyChain.settlement.details.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="供应商">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item label="期间">
          <Select placeholder="请选择" allow-clear style="width: 120px">
            <Select.Option value="2024-12">2024-12</Select.Option>
            <Select.Option value="2024-11">2024-11</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button>导出报表</Button>
          </Space>
        </Form.Item>
      </Form>

      <Table
        :columns="columns"
        :data-source="dataSource"
        :loading="loading"
        :pagination="pagination"
        :scroll="{ x: 1200 }"
      >
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看明细</Button>
              <Button type="link" size="small">导出</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
