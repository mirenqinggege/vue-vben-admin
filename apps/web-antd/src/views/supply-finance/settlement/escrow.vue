<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, Form, Input, Space, Table } from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '代收代付单号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '企业名称', dataIndex: 'enterprise', key: 'enterprise' },
  { title: '款项类型', dataIndex: 'type', key: 'type', width: 100 },
  { title: '金额', dataIndex: 'amount', key: 'amount', width: 120 },
  { title: '付款方', dataIndex: 'payer', key: 'payer', width: 150 },
  { title: '收款方', dataIndex: 'payee', key: 'payee', width: 150 },
  {
    title: '处理时间',
    dataIndex: 'processTime',
    key: 'processTime',
    width: 180,
  },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `ES${String(i + 1).padStart(10, '0')}`,
    enterprise: `企业 ${String.fromCodePoint(65 + i)}有限公司`,
    type: ['货款代收', '货款代付'][i % 2],
    amount: `¥${(Math.random() * 100 + 20).toFixed(2)}万`,
    payer: `客户 ${String.fromCodePoint(65 + i)}有限公司`,
    payee: `供应商 ${String.fromCodePoint(65 + i)}有限公司`,
    processTime: '2024-12-28 10:00:00',
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyFinance.settlement.escrow.title')">
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
        :scroll="{ x: 1400 }"
      >
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">流水</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
