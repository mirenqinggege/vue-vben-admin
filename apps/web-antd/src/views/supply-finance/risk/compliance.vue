<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, Form, Space, Table } from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '检查日期', dataIndex: 'date', key: 'date', width: 120 },
  { title: '检查项', dataIndex: 'item', key: 'item' },
  { title: '检查结果', dataIndex: 'result', key: 'result', width: 100 },
  { title: '负责人', dataIndex: 'owner', key: 'owner', width: 100 },
  { title: '备注', dataIndex: 'remark', key: 'remark' },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([
  {
    date: '2024-12-30',
    item: '反洗钱检查',
    result: '通过',
    owner: '张经理',
    remark: '无异常',
    key: 0,
  },
  {
    date: '2024-12-28',
    item: '税务合规检查',
    result: '通过',
    owner: '李经理',
    remark: '无异常',
    key: 1,
  },
  {
    date: '2024-12-25',
    item: 'KYC信息更新',
    result: '通过',
    owner: '王经理',
    remark: '信息完整',
    key: 2,
  },
  {
    date: '2024-12-20',
    item: '信用报告查询',
    result: '通过',
    owner: '赵经理',
    remark: '信用良好',
    key: 3,
  },
]);
</script>

<template>
  <Page :title="$t('page.supplyFinance.risk.compliance.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item>
          <Space>
            <Button type="primary">新增检查</Button>
            <Button>导出报告</Button>
          </Space>
        </Form.Item>
      </Form>

      <Table
        :columns="columns"
        :data-source="dataSource"
        :loading="loading"
        :pagination="false"
        :scroll="{ x: 1200 }"
      >
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">编辑</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
