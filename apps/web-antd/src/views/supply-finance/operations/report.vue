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
  { title: '报表编号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '报表名称', dataIndex: 'name', key: 'name' },
  { title: '报表类型', dataIndex: 'type', key: 'type', width: 120 },
  { title: '创建人', dataIndex: 'creator', key: 'creator', width: 120 },
  { title: '生成时间', dataIndex: 'createTime', key: 'createTime', width: 180 },
  { title: '数据周期', dataIndex: 'period', key: 'period', width: 120 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `RPT${String(i + 1).padStart(6, '0')}`,
    name: `业务报表 ${i + 1}`,
    type: ['业务报表', '财务报表', '风控报表'][i % 3],
    creator: `用户${i + 1}`,
    createTime: '2024-12-28 10:00:00',
    period: ['日', '月', '季'][i % 3],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyFinance.operations.report.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="报表">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item label="类型">
          <Select placeholder="请选择" allow-clear style="width: 120px">
            <Select.Option value="business">业务报表</Select.Option>
            <Select.Option value="finance">财务报表</Select.Option>
            <Select.Option value="risk">风控报表</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">创建报表</Button>
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
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">下载</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
