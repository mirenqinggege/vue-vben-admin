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
  Tag,
} from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '工单编号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '工单标题', dataIndex: 'title', key: 'title' },
  { title: '工单类型', dataIndex: 'type', key: 'type', width: 120 },
  { title: '提交人', dataIndex: 'submitter', key: 'submitter', width: 120 },
  { title: '优先级', dataIndex: 'priority', key: 'priority', width: 100 },
  { title: '提交时间', dataIndex: 'submitTime', key: 'submitTime', width: 180 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `TKT${String(i + 1).padStart(6, '0')}`,
    title: `客户问题 ${i + 1}`,
    type: ['咨询', '故障', '投诉', '建议'][i % 4],
    submitter: `客户${i + 1}`,
    priority: ['高', '中', '低'][i % 3],
    submitTime: '2024-12-28 10:00:00',
    status: ['待处理', '处理中', '已解决', '已关闭'][i % 4],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyFinance.operations.support.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="工单">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item label="状态">
          <Select placeholder="请选择" allow-clear style="width: 120px">
            <Select.Option value="pending">待处理</Select.Option>
            <Select.Option value="processing">处理中</Select.Option>
            <Select.Option value="resolved">已解决</Select.Option>
            <Select.Option value="closed">已关闭</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">新建工单</Button>
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
          <template v-if="column.key === 'priority'">
            <Tag
              :color="
                record.priority === '高'
                  ? 'red'
                  : record.priority === '中'
                    ? 'orange'
                    : 'blue'
              "
            >
              {{ record.priority }}
            </Tag>
          </template>
          <template v-if="column.key === 'status'">
            <Badge
              :status="
                record.status === '待处理'
                  ? 'default'
                  : record.status === '处理中'
                    ? 'processing'
                    : record.status === '已解决'
                      ? 'success'
                      : 'default'
              "
              :text="record.status"
            />
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">处理</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
