<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import {
  Badge,
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
  { title: '供应商编号', dataIndex: 'id', key: 'id', width: 120 },
  { title: '供应商名称', dataIndex: 'name', key: 'name' },
  {
    title: '待处理消息',
    dataIndex: 'pendingCount',
    key: 'pendingCount',
    width: 120,
  },
  { title: '协作状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '联系人', dataIndex: 'contact', key: 'contact', width: 100 },
  {
    title: '最后沟通',
    dataIndex: 'lastContact',
    key: 'lastContact',
    width: 180,
  },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `SUP${String(i + 1).padStart(8, '0')}`,
    name: `供应商 ${String.fromCodePoint(65 + i)}有限公司`,
    pendingCount: Math.floor(Math.random() * 10),
    status: ['正常协作', '暂停协作', '终止协作'][i % 3],
    contact: ['张经理', '李经理', '王经理'][i % 3],
    lastContact: '2024-12-30 10:00:00',
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyChain.supplier.collaboration.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="供应商">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item label="状态">
          <Select placeholder="请选择" allow-clear style="width: 120px">
            <Select.Option value="normal">正常协作</Select.Option>
            <Select.Option value="paused">暂停协作</Select.Option>
            <Select.Option value="terminated">终止协作</Select.Option>
          </Select>
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
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'pendingCount'">
            <Badge :count="record.pendingCount" />
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">发送消息</Button>
              <Button type="link" size="small">查看订单</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
