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
  { title: '运单号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '订单号', dataIndex: 'orderId', key: 'orderId', width: 150 },
  { title: '发货方', dataIndex: 'sender', key: 'sender' },
  { title: '收货方', dataIndex: 'receiver', key: 'receiver' },
  { title: '物流状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '当前位置', dataIndex: 'location', key: 'location' },
  { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime', width: 180 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `WD${String(i + 1).padStart(10, '0')}`,
    orderId: `ORD${String(i + 1).padStart(10, '0')}`,
    sender: `企业 ${String.fromCodePoint(65 + i)}有限公司`,
    receiver: `企业 ${String.fromCodePoint(66 + i)}有限公司`,
    status: ['已发货', '运输中', '已签收'][i % 3],
    location: ['上海转运中心', '北京分拣中心', '广州配送站'][i % 3],
    updateTime: '2024-12-28 10:00:00',
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyFinance.ecosystem.logistics.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="运单号">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item label="状态">
          <Select placeholder="请选择" allow-clear style="width: 120px">
            <Select.Option value="shipped">已发货</Select.Option>
            <Select.Option value="transit">运输中</Select.Option>
            <Select.Option value="signed">已签收</Select.Option>
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
        :scroll="{ x: 1500 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <Tag
              :color="
                record.status === '已签收'
                  ? 'green'
                  : record.status === '运输中'
                    ? 'blue'
                    : 'orange'
              "
            >
              {{ record.status }}
            </Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">轨迹</Button>
              <Button type="link" size="small">详情</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
