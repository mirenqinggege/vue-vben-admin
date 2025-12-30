<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, Form, Input, Space, Table } from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '运单号', dataIndex: 'trackingNo', key: 'trackingNo', width: 150 },
  { title: '订单编号', dataIndex: 'orderId', key: 'orderId', width: 150 },
  { title: '发货地', dataIndex: 'from', key: 'from', width: 150 },
  { title: '目的地', dataIndex: 'to', key: 'to', width: 150 },
  { title: '物流公司', dataIndex: 'logistics', key: 'logistics', width: 100 },
  { title: '当前状态', dataIndex: 'status', key: 'status', width: 120 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    trackingNo: `SF${Math.floor(Math.random() * 1_000_000_000)}`,
    orderId: `PO${String(i + 1).padStart(10, '0')}`,
    from: '上海',
    to: '北京',
    logistics: ['顺丰', '德邦', '中通'][i % 3],
    status: '运输中',
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyChain.performance.logistics.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="运单号">
          <Input placeholder="请输入运单号" allow-clear />
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
        :scroll="{ x: 1200 }"
      >
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看轨迹</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
