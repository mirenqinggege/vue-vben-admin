<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, Form, Input, Space, Table } from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '融资单号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '企业名称', dataIndex: 'enterprise', key: 'enterprise' },
  {
    title: '订单金额',
    dataIndex: 'orderAmount',
    key: 'orderAmount',
    width: 120,
  },
  { title: '融资金额', dataIndex: 'amount', key: 'amount', width: 120 },
  { title: '融资比例', dataIndex: 'ratio', key: 'ratio', width: 100 },
  { title: '申请时间', dataIndex: 'applyTime', key: 'applyTime', width: 180 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `FO${String(i + 1).padStart(10, '0')}`,
    enterprise: `企业 ${String.fromCodePoint(65 + i)}有限公司`,
    orderAmount: `¥${(Math.random() * 200 + 50).toFixed(2)}万`,
    amount: `¥${(Math.random() * 100 + 20).toFixed(2)}万`,
    ratio: `${Math.floor(Math.random() * 30) + 50}%`,
    applyTime: '2024-12-28 10:00:00',
    status: ['待审批', '已通过', '已拒绝', '已放款'][i % 4],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyFinance.financing.order.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="关键词">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">申请融资</Button>
          </Space>
        </Form.Item>
      </Form>

      <Table
        :columns="columns"
        :data-source="dataSource"
        :loading="loading"
        :pagination="pagination"
        :scroll="{ x: 1300 }"
      >
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">审批</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
