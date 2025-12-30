<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, Form, Input, Space, Table, Tag } from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '发票号码', dataIndex: 'invoiceNo', key: 'invoiceNo', width: 150 },
  { title: '订单编号', dataIndex: 'orderId', key: 'orderId', width: 150 },
  { title: '供应商', dataIndex: 'supplier', key: 'supplier', width: 150 },
  { title: '发票金额', dataIndex: 'amount', key: 'amount', width: 120 },
  {
    title: '开票日期',
    dataIndex: 'invoiceDate',
    key: 'invoiceDate',
    width: 120,
  },
  {
    title: '校验状态',
    dataIndex: 'verifyStatus',
    key: 'verifyStatus',
    width: 100,
  },
  {
    title: '三单匹配',
    dataIndex: 'matchStatus',
    key: 'matchStatus',
    width: 100,
  },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    invoiceNo: `INV${String(i + 1).padStart(12, '0')}`,
    orderId: `PO${String(i + 1).padStart(10, '0')}`,
    supplier: `供应商 ${String.fromCodePoint(65 + i)}有限公司`,
    amount: `¥${(Math.random() * 50 + 5).toFixed(2)}万`,
    invoiceDate: '2024-12-28',
    verifyStatus: ['已校验', '未校验'][i % 2],
    matchStatus: ['已匹配', '未匹配'][i % 2],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyChain.settlement.invoice.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="关键词">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">录入发票</Button>
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
          <template v-if="column.key === 'verifyStatus'">
            <Tag :color="record.verifyStatus === '已校验' ? 'green' : 'orange'">
              {{ record.verifyStatus }}
            </Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">校验</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
