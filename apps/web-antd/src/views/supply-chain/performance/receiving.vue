<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, Form, Input, Space, Table, Tag } from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '收货单号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '发货单号', dataIndex: 'shipId', key: 'shipId', width: 150 },
  { title: '供应商', dataIndex: 'supplier', key: 'supplier', width: 150 },
  {
    title: '收货日期',
    dataIndex: 'receiveDate',
    key: 'receiveDate',
    width: 120,
  },
  { title: '合格数量', dataIndex: 'qualified', key: 'qualified', width: 100 },
  {
    title: '不合格数量',
    dataIndex: 'unqualified',
    key: 'unqualified',
    width: 120,
  },
  { title: '验收状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `RC${String(i + 1).padStart(10, '0')}`,
    shipId: `SH${String(i + 1).padStart(10, '0')}`,
    supplier: `供应商 ${String.fromCodePoint(65 + i)}有限公司`,
    receiveDate: '2024-12-29',
    qualified: Math.floor(Math.random() * 100) + 900,
    unqualified: Math.floor(Math.random() * 50),
    status: ['待验收', '验收合格', '部分不合格'][i % 3],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyChain.performance.receiving.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="关键词">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">新建收货</Button>
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
                record.status === '验收合格'
                  ? 'green'
                  : record.status === '待验收'
                    ? 'orange'
                    : 'red'
              "
            >
              {{ record.status }}
            </Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">验收</Button>
              <Button type="link" size="small">查看报告</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
