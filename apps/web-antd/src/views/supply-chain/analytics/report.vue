<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, Form, Select, Space, Table } from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '供应商', dataIndex: 'supplier', key: 'supplier' },
  { title: '综合评分', dataIndex: 'score', key: 'score', width: 100 },
  {
    title: '交期评分',
    dataIndex: 'deliveryScore',
    key: 'deliveryScore',
    width: 100,
  },
  {
    title: '质量评分',
    dataIndex: 'qualityScore',
    key: 'qualityScore',
    width: 100,
  },
  {
    title: '服务评分',
    dataIndex: 'serviceScore',
    key: 'serviceScore',
    width: 100,
  },
  { title: '排名', dataIndex: 'rank', key: 'rank', width: 80 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const dataSource = ref([
  {
    supplier: '供应商 A有限公司',
    score: 95,
    deliveryScore: 96,
    qualityScore: 94,
    serviceScore: 95,
    rank: 1,
    key: 0,
  },
  {
    supplier: '供应商 B有限公司',
    score: 92,
    deliveryScore: 90,
    qualityScore: 94,
    serviceScore: 92,
    rank: 2,
    key: 1,
  },
  {
    supplier: '供应商 C有限公司',
    score: 88,
    deliveryScore: 85,
    qualityScore: 91,
    serviceScore: 88,
    rank: 3,
    key: 2,
  },
]);
</script>

<template>
  <Page :title="$t('page.supplyChain.analytics.report.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="季度">
          <Select placeholder="请选择" style="width: 120px">
            <Select.Option value="2024-Q4">2024-Q4</Select.Option>
            <Select.Option value="2024-Q3">2024-Q3</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">生成报表</Button>
            <Button>导出</Button>
          </Space>
        </Form.Item>
      </Form>

      <Table
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        :scroll="{ x: 1000 }"
      >
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">详情</Button>
              <Button type="link" size="small">趋势</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
