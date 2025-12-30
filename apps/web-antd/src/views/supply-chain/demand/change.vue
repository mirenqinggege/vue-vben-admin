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
  { title: '变更编号', dataIndex: 'id', key: 'id', width: 150 },
  { title: '原需求编号', dataIndex: 'demandId', key: 'demandId', width: 150 },
  { title: '变更类型', dataIndex: 'changeType', key: 'changeType', width: 120 },
  { title: '变更原因', dataIndex: 'reason', key: 'reason' },
  { title: '申请人', dataIndex: 'applicant', key: 'applicant', width: 100 },
  { title: '申请时间', dataIndex: 'createTime', key: 'createTime', width: 180 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `CH${String(i + 1).padStart(10, '0')}`,
    demandId: `DM${String(i + 1).padStart(10, '0')}`,
    changeType: ['数量变更', '规格变更', '交期变更', '取消需求'][i % 4],
    reason: '生产计划调整',
    applicant: ['张三', '李四', '王五'][i % 3],
    createTime: '2024-12-30 10:00:00',
    status: ['待审核', '已批准', '已拒绝'][i % 3],
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyChain.demand.change.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="关键词">
          <Input placeholder="请输入变更编号或需求编号" allow-clear />
        </Form.Item>
        <Form.Item label="变更类型">
          <Select placeholder="请选择" allow-clear style="width: 120px">
            <Select.Option value="quantity">数量变更</Select.Option>
            <Select.Option value="spec">规格变更</Select.Option>
            <Select.Option value="delivery">交期变更</Select.Option>
            <Select.Option value="cancel">取消需求</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
            <Button type="primary">申请变更</Button>
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
                record.status === '待审核'
                  ? 'orange'
                  : record.status === '已批准'
                    ? 'green'
                    : 'red'
              "
            >
              {{ record.status }}
            </Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">审批</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
