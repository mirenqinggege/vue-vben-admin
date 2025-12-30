<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, Form, Input, Space, Table, Tag } from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '预警编号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '企业名称', dataIndex: 'enterprise', key: 'enterprise' },
  { title: '预警类型', dataIndex: 'type', key: 'type', width: 120 },
  { title: '预警内容', dataIndex: 'content', key: 'content' },
  { title: '风险等级', dataIndex: 'level', key: 'level', width: 100 },
  { title: '预警时间', dataIndex: 'alertTime', key: 'alertTime', width: 180 },
  { title: '处理状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `AL${String(i + 1).padStart(10, '0')}`,
    enterprise: `企业 ${String.fromCodePoint(65 + i)}有限公司`,
    type: ['价格波动', '质押物异常', '舆情风险', '违约风险'][i % 4],
    content: '质押物价值下降超过预警阈值',
    level: ['高', '中', '低'][i % 3],
    alertTime: '2024-12-28 10:00:00',
    status: ['待处理', '处理中', '已处理'][i % 3],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyFinance.risk.alert.title')">
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
          <template v-if="column.key === 'level'">
            <Tag
              :color="
                record.level === '高'
                  ? 'red'
                  : record.level === '中'
                    ? 'orange'
                    : 'green'
              "
            >
              {{ record.level }}
            </Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">处理</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
