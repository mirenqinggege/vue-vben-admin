<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, Form, Space, Table } from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '方式编号', dataIndex: 'id', key: 'id', width: 120 },
  { title: '采购方式', dataIndex: 'name', key: 'name' },
  { title: '适用金额', dataIndex: 'amount', key: 'amount', width: 150 },
  { title: '适用范围', dataIndex: 'scope', key: 'scope' },
  { title: '使用次数', dataIndex: 'count', key: 'count', width: 100 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = [
    {
      id: 'PM001',
      name: '招标采购',
      amount: '50万以上',
      scope: '大型设备、大宗物料',
      count: 25,
      status: '启用',
      key: 0,
    },
    {
      id: 'PM002',
      name: '比价采购',
      amount: '10-50万',
      scope: '常规物资',
      count: 48,
      status: '启用',
      key: 1,
    },
    {
      id: 'PM003',
      name: '询价采购',
      amount: '5-10万',
      scope: '小额采购',
      count: 86,
      status: '启用',
      key: 2,
    },
    {
      id: 'PM004',
      name: '定点采购',
      amount: '5万以下',
      scope: '办公用品',
      count: 156,
      status: '启用',
      key: 3,
    },
    {
      id: 'PM005',
      name: '协议采购',
      amount: '不限',
      scope: '框架协议供应商',
      count: 42,
      status: '启用',
      key: 4,
    },
  ];
  pagination.value.total = 5;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyChain.procurement.method.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item>
          <Space>
            <Button type="primary">新增方式</Button>
          </Space>
        </Form.Item>
      </Form>

      <Table
        :columns="columns"
        :data-source="dataSource"
        :loading="loading"
        :pagination="false"
        :scroll="{ x: 1200 }"
      >
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">编辑</Button>
              <Button type="link" size="small">禁用</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
