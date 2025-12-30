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
  { title: '付款申请号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '供应商', dataIndex: 'supplier', key: 'supplier', width: 150 },
  { title: '付款金额', dataIndex: 'amount', key: 'amount', width: 120 },
  { title: '付款方式', dataIndex: 'method', key: 'method', width: 100 },
  { title: '申请人', dataIndex: 'applicant', key: 'applicant', width: 100 },
  { title: '申请日期', dataIndex: 'applyDate', key: 'applyDate', width: 120 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `PY${String(i + 1).padStart(10, '0')}`,
    supplier: `供应商 ${String.fromCodePoint(65 + i)}有限公司`,
    amount: `¥${(Math.random() * 50 + 5).toFixed(2)}万`,
    method: ['银行转账', '承兑汇票', '现金'][i % 3],
    applicant: ['张三', '李四', '王五'][i % 3],
    applyDate: '2024-12-28',
    status: ['待审批', '已批准', '已付款'][i % 3],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyChain.settlement.payment.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="供应商">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item label="状态">
          <Select placeholder="请选择" allow-clear style="width: 120px">
            <Select.Option value="pending">待审批</Select.Option>
            <Select.Option value="approved">已批准</Select.Option>
            <Select.Option value="paid">已付款</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">申请付款</Button>
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
                record.status === '已付款'
                  ? 'green'
                  : record.status === '已批准'
                    ? 'blue'
                    : 'orange'
              "
            >
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
