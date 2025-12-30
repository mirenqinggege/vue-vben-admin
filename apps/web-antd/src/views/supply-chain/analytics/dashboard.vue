<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Card, Col, Row, Statistic } from 'ant-design-vue';

import { $t } from '#/locales';

const statsData = ref([
  { title: '本月采购额', value: 2_850_000, prefix: '¥' },
  { title: '订单数量', value: 156, suffix: '笔' },
  { title: '供应商数量', value: 238, suffix: '家' },
  { title: '准时交货率', value: 94.5, suffix: '%' },
]);
</script>

<template>
  <Page :title="$t('page.supplyChain.analytics.dashboard.title')">
    <Row :gutter="16">
      <Col v-for="stat in statsData" :key="stat.title" :span="6">
        <Card>
          <Statistic
            :title="stat.title"
            :value="stat.value"
            :suffix="stat.suffix"
            :prefix="stat.prefix"
          />
        </Card>
      </Col>
    </Row>

    <Card title="采购趋势" class="mt-4">
      <div class="flex h-64 items-center justify-center text-gray-400">
        采购数据图表区域（可使用 ECharts 或 AntV G2Plot 实现）
      </div>
    </Card>

    <Row :gutter="16" class="mt-4">
      <Col :span="12">
        <Card title="供应商排名">
          <div class="flex h-64 items-center justify-center text-gray-400">
            供应商排名图表
          </div>
        </Card>
      </Col>
      <Col :span="12">
        <Card title="物料分类统计">
          <div class="flex h-64 items-center justify-center text-gray-400">
            物料分类饼图
          </div>
        </Card>
      </Col>
    </Row>
  </Page>
</template>
