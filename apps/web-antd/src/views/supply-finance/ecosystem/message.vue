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
  { title: '消息ID', dataIndex: 'id', key: 'id', width: 150 },
  { title: '消息标题', dataIndex: 'title', key: 'title' },
  { title: '消息类型', dataIndex: 'type', key: 'type', width: 120 },
  { title: '发送方', dataIndex: 'sender', key: 'sender' },
  { title: '接收方', dataIndex: 'receiver', key: 'receiver' },
  { title: '发送时间', dataIndex: 'sendTime', key: 'sendTime', width: 180 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `MSG${String(i + 1).padStart(6, '0')}`,
    title: ['融资申请通知', '还款提醒', '审核结果通知', '风控预警', '系统通知'][
      i % 5
    ],
    type: ['系统通知', '业务消息', '预警消息'][i % 3],
    sender: `企业 ${String.fromCodePoint(65 + i)}有限公司`,
    receiver: `企业 ${String.fromCodePoint(66 + i)}有限公司`,
    sendTime: '2024-12-28 10:00:00',
    status: ['已读', '未读'][i % 2],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyFinance.ecosystem.message.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="消息">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item label="类型">
          <Select placeholder="请选择" allow-clear style="width: 120px">
            <Select.Option value="system">系统通知</Select.Option>
            <Select.Option value="business">业务消息</Select.Option>
            <Select.Option value="alert">预警消息</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">发送消息</Button>
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
          <template v-if="column.key === 'title'">
            <Badge :dot="record.status === '未读'">
              {{ record.title }}
            </Badge>
          </template>
          <template v-if="column.key === 'status'">
            <Tag :color="record.status === '已读' ? 'default' : 'blue'">
              {{ record.status }}
            </Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">回复</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
