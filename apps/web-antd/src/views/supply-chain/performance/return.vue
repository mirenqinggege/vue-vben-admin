<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, Form, Input, Space, Table, Tag } from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '退换单号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '原订单号', dataIndex: 'orderId', key: 'orderId', width: 150 },
  { title: '供应商', dataIndex: 'supplier', key: 'supplier', width: 150 },
  { title: '类型', dataIndex: 'type', key: 'type', width: 80 },
  { title: '申请日期', dataIndex: 'applyDate', key: 'applyDate', width: 120 },
  { title: '退货数量', dataIndex: 'quantity', key: 'quantity', width: 100 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `RT${String(i + 1).padStart(10, '0')}`,
    orderId: `PO${String(i + 1).padStart(10, '0')}`,
    supplier: `供应商 ${String.fromCodePoint(65 + i)}有限公司`,
    type: ['退货', '换货'][i % 2],
    applyDate: '2024-12-28',
    quantity: Math.floor(Math.random() * 100) + 10,
    status: ['待审核', '已批准', '已拒绝', '处理中'][i % 4],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyChain.performance.return.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="关键词">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">申请退货</Button>
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
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'type'">
            <Tag :color="record.type === '退货' ? 'orange' : 'blue'">
              {{ record.type }}
            </Tag>
          </template>
          <template v-if="column.key === 'status'">
            <Tag color="green">{{ record.status }}</Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">处理</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
