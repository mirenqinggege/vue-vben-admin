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
  { title: '供应商编号', dataIndex: 'id', key: 'id', width: 120 },
  { title: '供应商名称', dataIndex: 'name', key: 'name' },
  { title: '供应商类型', dataIndex: 'type', key: 'type', width: 120 },
  { title: '分级', dataIndex: 'level', key: 'level', width: 80 },
  { title: '评分', dataIndex: 'score', key: 'score', width: 80 },
  { title: '联系人', dataIndex: 'contact', key: 'contact', width: 100 },
  { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime', width: 180 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
];

const loading = ref(false);
const dataSource = ref([]);
const pagination = ref({ current: 1, pageSize: 10, total: 0 });

const fetchData = async () => {
  loading.value = true;
  dataSource.value = Array.from({ length: 10 }, (_, i) => ({
    id: `SUP${String(i + 1).padStart(8, '0')}`,
    name: `供应商 ${String.fromCodePoint(65 + i)}有限公司`,
    type: ['原材料供应商', '设备供应商', '服务供应商'][i % 3],
    level: ['A级', 'B级', 'C级', 'D级'][i % 4],
    score: Math.floor(Math.random() * 40) + 60,
    contact: ['张经理', '李经理', '王经理'][i % 3],
    updateTime: '2024-12-30 10:00:00',
    key: i,
  }));
  pagination.value.total = 100;
  loading.value = false;
};

fetchData();
</script>

<template>
  <Page :title="$t('page.supplyChain.supplier.classification.title')">
    <Card>
      <Form layout="inline" class="mb-4">
        <Form.Item label="供应商名称">
          <Input placeholder="请输入" allow-clear />
        </Form.Item>
        <Form.Item label="分级">
          <Select placeholder="请选择" allow-clear style="width: 100px">
            <Select.Option value="A">A级</Select.Option>
            <Select.Option value="B">B级</Select.Option>
            <Select.Option value="C">C级</Select.Option>
            <Select.Option value="D">D级</Select.Option>
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
        :scroll="{ x: 1200 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'level'">
            <Tag
              :color="
                record.level === 'A级'
                  ? 'green'
                  : record.level === 'B级'
                    ? 'blue'
                    : record.level === 'C级'
                      ? 'orange'
                      : 'red'
              "
            >
              {{ record.level }}
            </Tag>
          </template>
          <template v-if="column.key === 'action'">
            <Space>
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">调整分级</Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>
  </Page>
</template>
