<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import {
  Button,
  Card,
  Form,
  Input,
  Progress,
  Space,
  Table,
  Tag,
} from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '评估编号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '企业名称', dataIndex: 'enterprise', key: 'enterprise' },
  { title: '信用评分', dataIndex: 'score', key: 'score', width: 100 },
  { title: '信用等级', dataIndex: 'grade', key: 'grade', width: 100 },
  { title: '授信额度', dataIndex: 'limit', key: 'limit', width: 120 },
  { title: '评估时间', dataIndex: 'evalTime', key: 'evalTime', width: 180 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `CR${String(i + 1).padStart(10, '0')}`,
    enterprise: `企业 ${String.fromCodePoint(65 + i)}有限公司`,
    score: Math.floor(Math.random() * 30) + 70,
    grade: ['AAA', 'AA', 'A', 'BBB', 'BB'][i % 5],
    limit: `¥${(Math.random() * 500 + 100).toFixed(2)}万`,
    evalTime: '2024-12-28 10:00:00',
    status: ['有效', '待更新'][i % 2],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyFinance.risk.credit.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="企业">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">生成评估</Button>
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
          <template v-if="column.key === 'score'">
            <div class="w-24">
              <Progress :percent="record.score" size="small" />
            </div>
          </template>
          <template v-if="column.key === 'grade'">
            <Tag
              :color="
                ['green', 'blue', 'orange', 'purple', 'red'][
                  ['AAA', 'AA', 'A', 'BBB', 'BB'].indexOf(record.grade)
                ]
              "
            >
              {{ record.grade }}
            </Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">详情</Button>
              <Button type="link" size="small">重新评估</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
