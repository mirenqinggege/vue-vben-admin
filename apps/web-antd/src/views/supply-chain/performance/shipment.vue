<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, Form, Input, Space, Table, Tag } from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '发货单号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '订单编号', dataIndex: 'orderId', key: 'orderId', width: 150 },
  { title: '供应商', dataIndex: 'supplier', key: 'supplier', width: 150 },
  { title: '发货日期', dataIndex: 'shipDate', key: 'shipDate', width: 120 },
  { title: '预计到货', dataIndex: 'eta', key: 'eta', width: 120 },
  { title: '物流公司', dataIndex: 'logistics', key: 'logistics', width: 120 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `SH${String(i + 1).padStart(10, '0')}`,
    orderId: `PO${String(i + 1).padStart(10, '0')}`,
    supplier: `供应商 ${String.fromCodePoint(65 + i)}有限公司`,
    shipDate: '2024-12-28',
    eta: '2025-01-05',
    logistics: ['顺丰', '德邦', '中通'][i % 3],
    status: ['运输中', '已送达', '待发货'][i % 3],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyChain.performance.shipment.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="关键词">
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
            <Tag
              :color="
                record.status === '已送达'
                  ? 'green'
                  : record.status === '运输中'
                    ? 'blue'
                    : 'orange'
              "
            >
              {{ record.status }}
            </Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看详情</Button>
              <Button type="link" size="small">物流跟踪</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
