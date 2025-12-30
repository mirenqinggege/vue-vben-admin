<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, Form, Input, Space, Table } from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '票据号', dataIndex: 'id', key: 'id', width: 180 },
  { title: '企业名称', dataIndex: 'enterprise', key: 'enterprise' },
  { title: '票据类型', dataIndex: 'billType', key: 'billType', width: 100 },
  { title: '票面金额', dataIndex: 'amount', key: 'amount', width: 120 },
  { title: '到期日', dataIndex: 'dueDate', key: 'dueDate', width: 120 },
  {
    title: '贴现金额',
    dataIndex: 'discountAmount',
    key: 'discountAmount',
    width: 120,
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
    id: `BL${String(i + 1).padStart(12, '0')}`,
    enterprise: `企业 ${String.fromCodePoint(65 + i)}有限公司`,
    billType: ['银行承兑', '商业承兑'][i % 2],
    amount: `¥${(Math.random() * 200 + 50).toFixed(2)}万`,
    dueDate: '2025-06-30',
    discountAmount: `¥${(Math.random() * 195 + 45).toFixed(2)}万`,
    status: ['待审核', '已贴现', '已拒付'][i % 3],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyFinance.financing.bill.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="票据号">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">票据贴现</Button>
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
              <Button type="link" size="small">贴现</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
