<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, Form, Input, Space, Table, Tag } from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '区块高度', dataIndex: 'height', key: 'height', width: 120 },
  { title: '交易哈希', dataIndex: 'hash', key: 'hash', width: 200 },
  { title: '业务类型', dataIndex: 'type', key: 'type', width: 120 },
  { title: '存档时间', dataIndex: 'time', key: 'time', width: 180 },
  { title: '验证状态', dataIndex: 'verified', key: 'verified', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    height: `${1_000_000 + i}`,
    hash: `0x${Math.random().toString(16).slice(2, 66)}`,
    type: ['融资存证', '合同存证', '票据存证'][i % 3],
    time: '2024-12-28 10:00:00',
    verified: '已验证',
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyFinance.verification.blockchain.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="业务类型">
          <Input placeholder="请输入" allow-clear />
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
          <template v-if="column.key === 'hash'">
            <span class="text-xs">{{ record.hash.substring(0, 20) }}...</span>
          </template>
          <template v-if="column.key === 'verified'">
            <Tag color="green">{{ record.verified }}</Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">验证</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
