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
  { title: '流程编号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '流程名称', dataIndex: 'name', key: 'name' },
  { title: '流程类型', dataIndex: 'type', key: 'type', width: 150 },
  { title: '节点数', dataIndex: 'nodes', key: 'nodes', width: 100 },
  { title: '版本', dataIndex: 'version', key: 'version', width: 100 },
  { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime', width: 180 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `WF${String(i + 1).padStart(6, '0')}`,
    name: `业务流程 ${i + 1}`,
    type: ['融资审批流程', '还款审批流程', '风控审核流程'][i % 3],
    nodes: [3, 5, 7][i % 3],
    version: `v${Math.floor(Math.random() * 5 + 1)}.0`,
    updateTime: '2024-12-28 10:00:00',
    status: ['启用', '草稿'][i % 2],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyFinance.operations.workflow.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="流程">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item label="类型">
          <Select placeholder="请选择" allow-clear style="width: 140px">
            <Select.Option value="financing">融资审批流程</Select.Option>
            <Select.Option value="repayment">还款审批流程</Select.Option>
            <Select.Option value="risk">风控审核流程</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">新增流程</Button>
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
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">编辑</Button>
              <Button type="link" size="small">设计</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
