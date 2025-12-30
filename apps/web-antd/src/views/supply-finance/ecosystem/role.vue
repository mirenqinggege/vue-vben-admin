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
  { title: '角色ID', dataIndex: 'id', key: 'id', width: 150 },
  { title: '角色名称', dataIndex: 'name', key: 'name' },
  { title: '角色类型', dataIndex: 'type', key: 'type', width: 120 },
  { title: '所属企业', dataIndex: 'enterprise', key: 'enterprise' },
  {
    title: '权限数量',
    dataIndex: 'permissions',
    key: 'permissions',
    width: 100,
  },
  { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 180 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `ROLE${String(i + 1).padStart(6, '0')}`,
    name: ['超级管理员', '财务人员', '业务员', '审核员', '供应商'][i % 5],
    type: ['平台角色', '企业角色', '供应商角色'][i % 3],
    enterprise: `企业 ${String.fromCodePoint(65 + i)}有限公司`,
    permissions: Math.floor(Math.random() * 50 + 10),
    createTime: '2024-12-28 10:00:00',
    status: ['启用', '禁用'][i % 2],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyFinance.ecosystem.role.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="角色">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item label="类型">
          <Select placeholder="请选择" allow-clear style="width: 120px">
            <Select.Option value="platform">平台角色</Select.Option>
            <Select.Option value="enterprise">企业角色</Select.Option>
            <Select.Option value="supplier">供应商角色</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">新增角色</Button>
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
            <Tag :color="record.status === '启用' ? 'green' : 'red'">
              {{ record.status }}
            </Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">编辑</Button>
              <Button type="link" size="small">权限</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
