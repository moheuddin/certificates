<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-5">
      <StatsCard
        name="Total Certificates (Works)"
        record="100"
        :dup="true"
        :dpercent="56"
      />

      <StatsCard
        name="Total Certificates (Goods)"
        record="200"
        :dup="false"
        :dpercent="96"
      />

      <StatsCard
        name="Total Certificates (Service)"
        record="100"
        :dup="true"
        :dpercent="203"
      />
      <StatsCard
        name="Total Hits Portal"
        record="100"
        :dup="true"
        :dpercent="203"
      />
      <StatsCard
        name="Maximum Hits for Certificate "
        record="100"
        :dup="true"
        :dpercent="203"
      />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin'
};
</script>
