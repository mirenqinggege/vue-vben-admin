<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, Form, Input, Space, Table, Tag } from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '放款编号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '企业名称', dataIndex: 'enterprise', key: 'enterprise' },
  { title: '放款金额', dataIndex: 'amount', key: 'amount', width: 120 },
  { title: '融资类型', dataIndex: 'type', key: 'type', width: 120 },
  { title: '放款方式', dataIndex: 'method', key: 'method', width: 100 },
  {
    title: '放款时间',
    dataIndex: 'disburseTime',
    key: 'disburseTime',
    width: 180,
  },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `DP${String(i + 1).padStart(10, '0')}`,
    enterprise: `企业 ${String.fromCodePoint(65 + i)}有限公司`,
    amount: `¥${(Math.random() * 500 + 50).toFixed(2)}万`,
    type: ['应收账款', '订单融资', '质押融资'][i % 3],
    method: ['银行转账', '受托支付'][i % 2],
    disburseTime: '2024-12-28 10:00:00',
    status: ['待放款', '已放款', '失败'][i % 3],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyFinance.settlement.disbursement.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="企业">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
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
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <Tag :color="record.status === '已放款' ? 'green' : 'blue'">
              {{ record.status }}
            </Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">放款</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
