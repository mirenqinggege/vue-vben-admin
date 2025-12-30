<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Statistic,
  Table,
} from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '账户编号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '账户名称', dataIndex: 'name', key: 'name' },
  { title: '账户类型', dataIndex: 'type', key: 'type', width: 120 },
  { title: '开户行', dataIndex: 'bank', key: 'bank', width: 150 },
  { title: '账户余额', dataIndex: 'balance', key: 'balance', width: 120 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `ACC${String(i + 1).padStart(10, '0')}`,
    name: `结算账户 ${i + 1}`,
    type: ['基本户', '一般户', '专用户'][i % 3],
    bank: ['工商银行', '建设银行', '农业银行'][i % 3],
    balance: `¥${(Math.random() * 1000 + 100).toFixed(2)}万`,
    status: ['正常', '冻结', '销户'][i % 3],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyFinance.settlement.account.title')">
    <Row :gutter="16" class="mb-4">
      <Col :span="6">
        <Card>
          <Statistic title="账户总数" :value="10" suffix="个" />
        </Card>
      </Col>
      <Col :span="6">
        <Card>
          <Statistic title="总余额" :value="5680" prefix="¥" suffix="万" />
        </Card>
      </Col>
      <Col :span="6">
        <Card>
          <Statistic title="今日流水" :value="125" suffix="笔" />
        </Card>
      </Col>
      <Col :span="6">
        <Card>
          <Statistic title="今日金额" :value="2800" prefix="¥" suffix="万" />
        </Card>
      </Col>
    </Row>

    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="账户">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">新增账户</Button>
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
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">流水</Button>
              <Button type="link" size="small">冻结</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
