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
  { title: '供应商编号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '供应商名称', dataIndex: 'name', key: 'name' },
  { title: '供应商类型', dataIndex: 'type', key: 'type', width: 120 },
  { title: '联系人', dataIndex: 'contact', key: 'contact', width: 100 },
  { title: '联系电话', dataIndex: 'phone', key: 'phone', width: 130 },
  { title: '准入状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '申请时间', dataIndex: 'createTime', key: 'createTime', width: 180 },
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
    type: ['原材料供应商', '设备供应商', '服务供应商'][i % 3],
    contact: ['张经理', '李经理', '王经理'][i % 3],
    phone: `138${String(Math.floor(Math.random() * 100_000_000)).padStart(8, '0')}`,
    status: ['待审核', '已准入', '已驳回'][i % 3],
    createTime: '2024-12-30 10:00:00',
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyChain.supplier.entry.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="关键词">
          <Input placeholder="请输入供应商名称" allow-clear />
        </Form.Item>
        <Form.Item label="状态">
          <Select placeholder="请选择" allow-clear style="width: 120px">
            <Select.Option value="pending">待审核</Select.Option>
            <Select.Option value="approved">已准入</Select.Option>
            <Select.Option value="rejected">已驳回</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">新增供应商</Button>
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
                record.status === '待审核'
                  ? 'orange'
                  : record.status === '已准入'
                    ? 'green'
                    : 'red'
              "
            >
              {{ record.status }}
            </Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">审核</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
