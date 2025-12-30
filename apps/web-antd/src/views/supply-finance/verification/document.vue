<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card, Form, Input, Space, Table, Tag } from 'ant-design-vue';

import { $t } from '#/locales';

const columns = [
  { title: '凭证编号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '企业名称', dataIndex: 'enterprise', key: 'enterprise' },
  { title: '凭证类型', dataIndex: 'type', key: 'type', width: 100 },
  { title: '上传时间', dataIndex: 'uploadTime', key: 'uploadTime', width: 180 },
  { title: '识别结果', dataIndex: 'result', key: 'result', width: 100 },
  { title: '审核状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `DC${String(i + 1).padStart(10, '0')}`,
    enterprise: `企业 ${String.fromCodePoint(65 + i)}有限公司`,
    type: ['发票', '合同', '运单', '质检报告'][i % 4],
    uploadTime: '2024-12-28 10:00:00',
    result: ['通过', '异常', '待审核'][i % 3],
    status: ['待审核', '已通过', '已拒绝'][i % 3],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyFinance.verification.document.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="企业">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">上传凭证</Button>
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
          <template v-if="column.key === 'result'">
            <Tag
              :color="
                record.result === '通过'
                  ? 'green'
                  : record.result === '异常'
                    ? 'red'
                    : 'orange'
              "
            >
              {{ record.result }}
            </Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">审核</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
