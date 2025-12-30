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
  { title: '需求编号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '需求名称', dataIndex: 'name', key: 'name' },
  { title: '申请人', dataIndex: 'applicant', key: 'applicant', width: 100 },
  { title: '申请部门', dataIndex: 'department', key: 'department', width: 120 },
  { title: '申请时间', dataIndex: 'createTime', key: 'createTime', width: 180 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 200, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `DM${String(i + 1).padStart(10, '0')}`,
    name: `原材料采购需求 ${i + 1}`,
    applicant: ['张三', '李四', '王五'][i % 3],
    department: ['生产部', '采购部', '仓储部'][i % 3],
    createTime: '2024-12-30 10:00:00',
    status: ['待审核', '已通过', '已驳回'][i % 3],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyChain.demand.review.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="关键词">
          <Input placeholder="请输入需求编号或名称" allow-clear />
        </Form.Item>
        <Form.Item label="审核状态">
          <Select placeholder="请选择" allow-clear style="width: 120px">
            <Select.Option value="pending">待审核</Select.Option>
            <Select.Option value="approved">已通过</Select.Option>
            <Select.Option value="rejected">已驳回</Select.Option>
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
          <template v-if="column.key === 'status'">
            <Tag
              :color="
                record.status === '待审核'
                  ? 'orange'
                  : record.status === '已通过'
                    ? 'green'
                    : 'red'
              "
            >
              {{ record.status }}
            </Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看详情</Button>
              <Button
                type="link"
                size="small"
                v-if="record.status === '待审核'"
              >
                审核通过
              </Button>
              <Button
                type="link"
                size="small"
                danger
                v-if="record.status === '待审核'"
              >
                驳回
              </Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
