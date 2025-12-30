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
  Tag,
} from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '用户ID', dataIndex: 'id', key: 'id', width: 150 },
  { title: '用户名', dataIndex: 'name', key: 'name' },
  { title: '手机号', dataIndex: 'phone', key: 'phone', width: 130 },
  { title: '企业', dataIndex: 'enterprise', key: 'enterprise' },
  { title: '角色', dataIndex: 'role', key: 'role', width: 120 },
  {
    title: '注册时间',
    dataIndex: 'registerTime',
    key: 'registerTime',
    width: 180,
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
    id: `USR${String(i + 1).padStart(6, '0')}`,
    name: `用户${i + 1}`,
    phone: `138****${String(i).padStart(4, '0')}`,
    enterprise: `企业 ${String.fromCodePoint(65 + i)}有限公司`,
    role: ['管理员', '操作员', '审核员'][i % 3],
    registerTime: '2024-12-28 10:00:00',
    status: ['正常', '禁用'][i % 2],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyFinance.operations.user.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="用户">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item label="角色">
          <Select placeholder="请选择" allow-clear style="width: 120px">
            <Select.Option value="admin">管理员</Select.Option>
            <Select.Option value="operator">操作员</Select.Option>
            <Select.Option value="auditor">审核员</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">新增用户</Button>
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
          <template v-if="column.key === 'status'">
            <Tag :color="record.status === '正常' ? 'green' : 'red'">
              {{ record.status }}
            </Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">编辑</Button>
              <Button type="link" size="small">重置密码</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
