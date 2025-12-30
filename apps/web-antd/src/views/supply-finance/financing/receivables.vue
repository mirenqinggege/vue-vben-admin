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
  { title: '融资单号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '企业名称', dataIndex: 'enterprise', key: 'enterprise' },
  { title: '融资金额', dataIndex: 'amount', key: 'amount', width: 120 },
  { title: '融资期限', dataIndex: 'term', key: 'term', width: 100 },
  { title: '利率', dataIndex: 'rate', key: 'rate', width: 100 },
  { title: '申请时间', dataIndex: 'applyTime', key: 'applyTime', width: 180 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `FZ${String(i + 1).padStart(10, '0')}`,
    enterprise: `企业 ${String.fromCodePoint(65 + i)}有限公司`,
    amount: `¥${(Math.random() * 500 + 50).toFixed(2)}万`,
    term: `${Math.floor(Math.random() * 12) + 3}个月`,
    rate: `${(Math.random() * 5 + 3).toFixed(2)}%`,
    applyTime: '2024-12-28 10:00:00',
    status: ['待审批', '已通过', '已拒绝', '放款中', '还款中'][i % 5],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyFinance.financing.receivables.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="关键词">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item label="状态">
          <Select placeholder="请选择" allow-clear style="width: 120px">
            <Select.Option value="pending">待审批</Select.Option>
            <Select.Option value="approved">已通过</Select.Option>
            <Select.Option value="rejected">已拒绝</Select.Option>
            <Select.Option value="disbursing">放款中</Select.Option>
            <Select.Option value="repaying">还款中</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">申请融资</Button>
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
            <Tag :color="record.status === '已通过' ? 'green' : 'blue'">
              {{ record.status }}
            </Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">审批</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
