<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, Form, Input, Space, Table } from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '流水号', dataIndex: 'id', key: 'id', width: 180 },
  { title: '企业名称', dataIndex: 'enterprise', key: 'enterprise' },
  { title: '交易类型', dataIndex: 'type', key: 'type', width: 120 },
  { title: '交易金额', dataIndex: 'amount', key: 'amount', width: 120 },
  { title: '交易时间', dataIndex: 'transTime', key: 'transTime', width: 180 },
  {
    title: '交易对手',
    dataIndex: 'counterparty',
    key: 'counterparty',
    width: 150,
  },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `TXN${Date.now()}${i}`,
    enterprise: `企业 ${String.fromCodePoint(65 + i)}有限公司`,
    type: ['采购', '融资', '还款'][i % 3],
    amount: `¥${(Math.random() * 100 + 10).toFixed(2)}万`,
    transTime: '2024-12-28 10:00:00',
    counterparty: `供应商 ${String.fromCodePoint(65 + i)}有限公司`,
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyFinance.verification.transaction.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="企业">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button>导出</Button>
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
              <Button type="link" size="small">查看详情</Button>
              <Button type="link" size="small">追溯</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
