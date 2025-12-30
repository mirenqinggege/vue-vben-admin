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
  { title: '合同编号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '合同名称', dataIndex: 'name', key: 'name' },
  { title: '供应商', dataIndex: 'supplier', key: 'supplier', width: 150 },
  { title: '合同金额', dataIndex: 'amount', key: 'amount', width: 120 },
  { title: '签订日期', dataIndex: 'signDate', key: 'signDate', width: 120 },
  { title: '到期日期', dataIndex: 'endDate', key: 'endDate', width: 120 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 200, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `CT${String(i + 1).padStart(10, '0')}`,
    name: `年度采购合同 ${String.fromCodePoint(65 + i)}`,
    supplier: `供应商 ${String.fromCodePoint(65 + i)}有限公司`,
    amount: `¥${(Math.random() * 100 + 10).toFixed(2)}万`,
    signDate: '2024-01-01',
    endDate: '2024-12-31',
    status: ['履约中', '已完成', '已终止'][i % 3],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyChain.procurement.contract.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="关键词">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item label="状态">
          <Select placeholder="请选择" allow-clear style="width: 120px">
            <Select.Option value="active">履约中</Select.Option>
            <Select.Option value="completed">已完成</Select.Option>
            <Select.Option value="terminated">已终止</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">新建合同</Button>
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
            <Tag
              :color="
                record.status === '履约中'
                  ? 'green'
                  : record.status === '已完成'
                    ? 'blue'
                    : 'red'
              "
            >
              {{ record.status }}
            </Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">变更</Button>
              <Button type="link" size="small">归档</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
