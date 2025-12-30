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
  { title: '招标编号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '招标名称', dataIndex: 'name', key: 'name' },
  { title: '招标方式', dataIndex: 'type', key: 'type', width: 100 },
  { title: '预算金额', dataIndex: 'budget', key: 'budget', width: 120 },
  { title: '报名数', dataIndex: 'bidderCount', key: 'bidderCount', width: 80 },
  { title: '开标时间', dataIndex: 'openTime', key: 'openTime', width: 180 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `BD${String(i + 1).padStart(10, '0')}`,
    name: `${2024}年第${i + 1}批物资采购`,
    type: ['公开招标', '邀请招标'][i % 2],
    budget: `¥${(Math.random() * 100 + 10).toFixed(2)}万`,
    bidderCount: Math.floor(Math.random() * 10) + 3,
    openTime: '2024-12-30 10:00:00',
    status: ['公告中', '报名中', '开标中', '评标中', '已定标'][i % 5],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyChain.procurement.bidding.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="关键词">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item label="状态">
          <Select placeholder="请选择" allow-clear style="width: 120px">
            <Select.Option value="notice">公告中</Select.Option>
            <Select.Option value="bid">报名中</Select.Option>
            <Select.Option value="open">开标中</Select.Option>
            <Select.Option value="eval">评标中</Select.Option>
            <Select.Option value="done">已定标</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">发起新招标</Button>
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
            <Tag color="blue">{{ record.status }}</Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看详情</Button>
              <Button type="link" size="small">比价报告</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
