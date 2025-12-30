<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, Form, Input, Space, Table, Tag } from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '监控编号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '企业名称', dataIndex: 'enterprise', key: 'enterprise' },
  { title: '风险等级', dataIndex: 'level', key: 'level', width: 100 },
  {
    title: '质押物价值',
    dataIndex: 'collateralValue',
    key: 'collateralValue',
    width: 120,
  },
  { title: '融资金额', dataIndex: 'loanAmount', key: 'loanAmount', width: 120 },
  {
    title: '最新预警',
    dataIndex: 'latestAlert',
    key: 'latestAlert',
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
    id: `MN${String(i + 1).padStart(10, '0')}`,
    enterprise: `企业 ${String.fromCodePoint(65 + i)}有限公司`,
    level: ['低风险', '中风险', '高风险'][i % 3],
    collateralValue: `¥${(Math.random() * 500 + 100).toFixed(2)}万`,
    loanAmount: `¥${(Math.random() * 300 + 50).toFixed(2)}万`,
    latestAlert: ['价格预警', '无', '舆情预警'][i % 3],
    status: ['正常', '关注', '预警'][i % 3],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyFinance.risk.monitor.title')">
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
        :scroll="{ x: 1400 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'level'">
            <Tag
              :color="
                record.level === '低风险'
                  ? 'green'
                  : record.level === '中风险'
                    ? 'orange'
                    : 'red'
              "
            >
              {{ record.level }}
            </Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">详情</Button>
              <Button type="link" size="small">处置</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
