<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, Form, Input, Space, Table } from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '清算单号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '企业名称', dataIndex: 'enterprise', key: 'enterprise' },
  { title: '清算类型', dataIndex: 'type', key: 'type', width: 120 },
  { title: '清算金额', dataIndex: 'amount', key: 'amount', width: 120 },
  { title: '清算周期', dataIndex: 'period', key: 'period', width: 120 },
  { title: '清算时间', dataIndex: 'clearTime', key: 'clearTime', width: 180 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `CL${String(i + 1).padStart(10, '0')}`,
    enterprise: `企业 ${String.fromCodePoint(65 + i)}有限公司`,
    type: ['日清算', '周清算', '月清算'][i % 3],
    amount: `¥${(Math.random() * 500 + 100).toFixed(2)}万`,
    period: '2024-12',
    clearTime: '2024-12-30 10:00:00',
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyFinance.settlement.clearing.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="企业">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">生成账单</Button>
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
              <Button type="link" size="small">对账</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
