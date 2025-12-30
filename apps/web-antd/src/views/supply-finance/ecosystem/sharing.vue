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
  { title: '共享ID', dataIndex: 'id', key: 'id', width: 150 },
  { title: '数据名称', dataIndex: 'name', key: 'name' },
  { title: '数据类型', dataIndex: 'type', key: 'type', width: 120 },
  { title: '提供方', dataIndex: 'provider', key: 'provider' },
  { title: '接收方', dataIndex: 'receiver', key: 'receiver' },
  { title: '共享次数', dataIndex: 'count', key: 'count', width: 100 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `DS${String(i + 1).padStart(6, '0')}`,
    name: `共享数据集 ${i + 1}`,
    type: ['交易数据', '信用数据', '物流数据'][i % 3],
    provider: `企业 ${String.fromCodePoint(65 + i)}有限公司`,
    receiver: `企业 ${String.fromCodePoint(66 + i)}有限公司`,
    count: Math.floor(Math.random() * 1000 + 100),
    status: ['共享中', '已暂停', '已终止'][i % 3],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyFinance.ecosystem.sharing.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="数据">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item label="类型">
          <Select placeholder="请选择" allow-clear style="width: 120px">
            <Select.Option value="transaction">交易数据</Select.Option>
            <Select.Option value="credit">信用数据</Select.Option>
            <Select.Option value="logistics">物流数据</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">发起共享</Button>
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
                record.status === '共享中'
                  ? 'green'
                  : record.status === '已暂停'
                    ? 'orange'
                    : 'red'
              "
            >
              {{ record.status }}
            </Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">管理</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
