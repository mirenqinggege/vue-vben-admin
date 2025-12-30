<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import {
  Button,
  Card,
  Form,
  Input,
  Select,
  Space,
  Table,
} from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '评估编号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '供应商名称', dataIndex: 'name', key: 'name' },
  { title: '评估季度', dataIndex: 'quarter', key: 'quarter', width: 120 },
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
  { title: '评估时间', dataIndex: 'createTime', key: 'createTime', width: 180 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `EV${String(i + 1).padStart(10, '0')}`,
    name: `供应商 ${String.fromCodePoint(65 + i)}有限公司`,
    quarter: '2024-Q4',
    score: Math.floor(Math.random() * 20) + 80,
    deliveryScore: Math.floor(Math.random() * 20) + 80,
    qualityScore: Math.floor(Math.random() * 20) + 80,
    serviceScore: Math.floor(Math.random() * 20) + 80,
    createTime: '2024-12-30 10:00:00',
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyChain.supplier.performance.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="供应商">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item label="季度">
          <Select placeholder="请选择" allow-clear style="width: 120px">
            <Select.Option value="2024-Q4">2024-Q4</Select.Option>
            <Select.Option value="2024-Q3">2024-Q3</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">生成评估</Button>
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
              <Button type="link" size="small">查看详情</Button>
              <Button type="link" size="small">导出报告</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
