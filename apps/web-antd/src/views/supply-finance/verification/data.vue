<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Card, Col, Progress, Row, Statistic } from 'ant-design-vue';

import { $t } from '#/locales';

const systems = ref([
  { name: '集采系统', status: '已连接', lastSync: '2024-12-30 10:00' },
  { name: '物流系统', status: '已连接', lastSync: '2024-12-30 10:05' },
  { name: '税务系统', status: '已连接', lastSync: '2024-12-30 09:55' },
  { name: '银行系统', status: '未连接', lastSync: '-' },
]);
</script>

<template>
  <Page :title="$t('page.supplyFinance.verification.data.title')">
    <Row :gutter="16">
      <Col :span="6">
        <Card>
          <Statistic title="今日核验" :value="1258" suffix="次" />
        </Card>
      </Col>
      <Col :span="6">
        <Card>
          <Statistic title="核验通过" :value="1180" suffix="次" />
        </Card>
      </Col>
      <Col :span="6">
        <Card>
          <Statistic title="异常数据" :value="78" suffix="次" />
        </Card>
      </Col>
      <Col :span="6">
        <Card>
          <Statistic title="通过率" :value="93.8" suffix="%" />
        </Card>
      </Col>
    </Row>

    <Card title="系统对接状态" class="mt-4">
      <div v-for="sys in systems" :key="sys.name" class="mb-4">
        <div class="mb-2 flex justify-between">
          <span>{{ sys.name }}</span>
          <span>{{ sys.status }}</span>
        </div>
        <Progress
          :percent="sys.status === '已连接' ? 100 : 0"
          :show-info="false"
        />
        <div class="text-sm text-gray-400">最后同步: {{ sys.lastSync }}</div>
      </div>
    </Card>
  </Page>
</template>
