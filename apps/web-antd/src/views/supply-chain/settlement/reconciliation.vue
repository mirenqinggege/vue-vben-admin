<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, Form, Input, Space, Table, Tag } from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '对账单号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '供应商', dataIndex: 'supplier', key: 'supplier', width: 150 },
  { title: '对账期间', dataIndex: 'period', key: 'period', width: 120 },
  { title: '订单数量', dataIndex: 'orderCount', key: 'orderCount', width: 100 },
  { title: '对账金额', dataIndex: 'amount', key: 'amount', width: 120 },
  { title: '差异金额', dataIndex: 'diffAmount', key: 'diffAmount', width: 120 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `ST${String(i + 1).padStart(10, '0')}`,
    supplier: `供应商 ${String.fromCodePoint(65 + i)}有限公司`,
    period: '2024-12',
    orderCount: Math.floor(Math.random() * 50) + 10,
    amount: `¥${(Math.random() * 100 + 10).toFixed(2)}万`,
    diffAmount: `¥${(Math.random() * 5).toFixed(2)}万`,
    status: ['待确认', '已确认', '有差异'][i % 3],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyChain.settlement.reconciliation.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="供应商">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">生成对账单</Button>
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
            <Tag
              :color="
                record.status === '已确认'
                  ? 'green'
                  : record.status === '有差异'
                    ? 'red'
                    : 'orange'
              "
            >
              {{ record.status }}
            </Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">确认</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
