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
  { title: '汇总编号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '汇总名称', dataIndex: 'name', key: 'name' },
  { title: '需求数量', dataIndex: 'count', key: 'count', width: 100 },
  {
    title: '物料类型',
    dataIndex: 'materialType',
    key: 'materialType',
    width: 120,
  },
  { title: '汇总人', dataIndex: 'creator', key: 'creator', width: 100 },
  { title: '汇总时间', dataIndex: 'createTime', key: 'createTime', width: 180 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `SM${String(i + 1).padStart(10, '0')}`,
    name: `12月需求汇总 ${i + 1}`,
    count: Math.floor(Math.random() * 50) + 10,
    materialType: ['原材料', '辅料', '设备', '工具'][i % 4],
    creator: ['张三', '李四', '王五'][i % 3],
    createTime: '2024-12-30 10:00:00',
    status: ['待拆分', '已拆分'][i % 2],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyChain.demand.summary.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="关键词">
          <Input placeholder="请输入汇总编号或名称" allow-clear />
        </Form.Item>
        <Form.Item label="物料类型">
          <Select placeholder="请选择" allow-clear style="width: 120px">
            <Select.Option value="raw">原材料</Select.Option>
            <Select.Option value="auxiliary">辅料</Select.Option>
            <Select.Option value="equipment">设备</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">新建汇总</Button>
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
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">拆分</Button>
              <Button type="link" size="small" danger>删除</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
