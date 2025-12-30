<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, Form, Input, Space, Table, Tag } from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '质押单号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '企业名称', dataIndex: 'enterprise', key: 'enterprise' },
  { title: '质押物', dataIndex: 'collateral', key: 'collateral', width: 150 },
  { title: '质押价值', dataIndex: 'value', key: 'value', width: 120 },
  { title: '融资金额', dataIndex: 'amount', key: 'amount', width: 120 },
  { title: '质押率', dataIndex: 'ratio', key: 'ratio', width: 100 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `PL${String(i + 1).padStart(10, '0')}`,
    enterprise: `企业 ${String.fromCodePoint(65 + i)}有限公司`,
    collateral: ['原材料', '半成品', '成品'][i % 3],
    value: `¥${(Math.random() * 500 + 100).toFixed(2)}万`,
    amount: `¥${(Math.random() * 300 + 50).toFixed(2)}万`,
    ratio: `${Math.floor(Math.random() * 20) + 60}%`,
    status: ['质押中', '已释放', '预警'][i % 3],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyFinance.financing.pledge.title')">
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
        :scroll="{ x: 1300 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <Tag
              :color="
                record.status === '质押中'
                  ? 'green'
                  : record.status === '预警'
                    ? 'red'
                    : 'blue'
              "
            >
              {{ record.status }}
            </Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">监管</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
