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
  Tag,
} from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '订单编号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '供应商', dataIndex: 'supplier', key: 'supplier', width: 150 },
  { title: '订单金额', dataIndex: 'amount', key: 'amount', width: 120 },
  { title: '订购日期', dataIndex: 'orderDate', key: 'orderDate', width: 120 },
  {
    title: '交货日期',
    dataIndex: 'deliveryDate',
    key: 'deliveryDate',
    width: 120,
  },
  { title: '订单状态', dataIndex: 'status', key: 'status', width: 100 },
  {
    title: '付款状态',
    dataIndex: 'paymentStatus',
    key: 'paymentStatus',
    width: 100,
  },
  { title: '操作', key: 'action', width: 200, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `PO${String(i + 1).padStart(10, '0')}`,
    supplier: `供应商 ${String.fromCodePoint(65 + i)}有限公司`,
    amount: `¥${(Math.random() * 50 + 5).toFixed(2)}万`,
    orderDate: '2024-12-25',
    deliveryDate: '2025-01-15',
    status: ['待确认', '已确认', '部分发货', '已完成'][i % 4],
    paymentStatus: ['未付款', '部分付款', '已付款'][i % 3],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyChain.procurement.order.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="关键词">
          <Input placeholder="请输入订单号或供应商" allow-clear />
        </Form.Item>
        <Form.Item label="订单状态">
          <Select placeholder="请选择" allow-clear style="width: 120px">
            <Select.Option value="pending">待确认</Select.Option>
            <Select.Option value="confirmed">已确认</Select.Option>
            <Select.Option value="partial">部分发货</Select.Option>
            <Select.Option value="completed">已完成</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">新建订单</Button>
          </Space>
        </Form.Item>
      </Form>

      <Table
        :columns="columns"
        :data-source="dataSource"
        :loading="loading"
        :pagination="pagination"
        :scroll="{ x: 1400 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <Tag :color="record.status === '已完成' ? 'green' : 'blue'">
              {{ record.status }}
            </Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">发货</Button>
              <Button type="link" size="small">收货</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
