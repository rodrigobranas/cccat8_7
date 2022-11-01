<script setup lang="ts">
defineProps(["item"]);
defineEmits(["add"]);
</script>

<template>
	<div class="item-description">{{ item.description }}</div>
	<div class="item-price">{{ item.price }}</div>
	<button class="item-add" @click="$emit('add', item)">Add</button>
</template>