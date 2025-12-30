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
  { title: '产品编号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '产品名称', dataIndex: 'name', key: 'name' },
  { title: '产品类型', dataIndex: 'type', key: 'type', width: 120 },
  { title: '利率区间', dataIndex: 'rate', key: 'rate', width: 120 },
  { title: '期限范围', dataIndex: 'term', key: 'term', width: 120 },
  { title: '授信额度', dataIndex: 'limit', key: 'limit', width: 120 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `PRD${String(i + 1).padStart(6, '0')}`,
    name: `融资产品 ${i + 1}`,
    type: ['应收账款融资', '订单融资', '质押融资', '票据融资'][i % 4],
    rate: `${(Math.random() * 5 + 3).toFixed(2)}% - ${(Math.random() * 5 + 8).toFixed(2)}%`,
    term: `${[30, 60, 90, 180][i % 4]}天`,
    limit: `¥${(Math.random() * 500 + 100).toFixed(0)}万`,
    status: ['上架', '下架'][i % 2],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyFinance.operations.product.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="产品">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item label="类型">
          <Select placeholder="请选择" allow-clear style="width: 140px">
            <Select.Option value="receivables">应收账款融资</Select.Option>
            <Select.Option value="order">订单融资</Select.Option>
            <Select.Option value="pledge">质押融资</Select.Option>
            <Select.Option value="bill">票据融资</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">新增产品</Button>
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
            <Tag :color="record.status === '上架' ? 'green' : 'red'">
              {{ record.status }}
            </Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">编辑</Button>
              <Button type="link" size="small">配置</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
