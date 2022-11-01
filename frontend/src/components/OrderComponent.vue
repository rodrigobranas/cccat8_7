<script setup lang="ts">
defineProps(["order", "total"]);
defineEmits(["validateCoupon", "checkout"]);
</script>

<template>
	<input type="text" v-model="order.cpf"/>
	<div v-for="orderItem in order.orderItems">
		{{ orderItem.idItem }} {{ orderItem.quantity }} 
		<button @click="order.removeOrderItem(orderItem)">-</button>
	</div>
	<input type="text" v-model="order.coupon" @blur="$emit('validateCoupon', order.coupon)"/>
	<div class="order-total">{{ total }}</div>
	<button @click="$emit('checkout', order)">Checkout</button>
</template>