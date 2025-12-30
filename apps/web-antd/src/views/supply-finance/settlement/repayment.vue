<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, Form, Input, Space, Table, Tag } from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '还款编号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '企业名称', dataIndex: 'enterprise', key: 'enterprise' },
  { title: '融资单号', dataIndex: 'loanId', key: 'loanId', width: 150 },
  { title: '还款金额', dataIndex: 'amount', key: 'amount', width: 120 },
  { title: '还款类型', dataIndex: 'type', key: 'type', width: 100 },
  { title: '还款时间', dataIndex: 'repayTime', key: 'repayTime', width: 180 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `RP${String(i + 1).padStart(10, '0')}`,
    enterprise: `企业 ${String.fromCodePoint(65 + i)}有限公司`,
    loanId: `FZ${String(i + 1).padStart(10, '0')}`,
    amount: `¥${(Math.random() * 100 + 20).toFixed(2)}万`,
    type: ['自动扣款', '主动还款', '对冲还款'][i % 3],
    repayTime: '2024-12-28 10:00:00',
    status: ['成功', '失败', '处理中'][i % 3],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyFinance.settlement.repayment.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="企业">
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
        :scroll="{ x: 1300 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <Tag
              :color="
                record.status === '成功'
                  ? 'green'
                  : record.status === '失败'
                    ? 'red'
                    : 'orange'
              "
            >
              {{ record.status }}
            </Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">重试</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
